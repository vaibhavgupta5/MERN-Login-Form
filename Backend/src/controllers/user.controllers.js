import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs"


export const registerUser = asyncHandler(async(req, res) =>{
    const { fullname, email, password } = req.body;

    if([fullname, email, password].some((field) => field?.trim() === "")){
        throw new ApiError("All fields Required", 400);
    }

    const existedUser = await User.findOne({email});
    
    if(existedUser){
        throw new ApiError("Email already exists", 400);
    }

    const encPassword = await bcrypt.hash(password, 10)
    console.log(encPassword)


    const user = await User.create({
        fullname,
        email,
        password: encPassword
    })

    const createdUser = await User.findById(user._id).select("-password")


    if(!createdUser){
        throw new ApiError("Failed to create user", 500);
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )


})

export const loginUser = asyncHandler(async(req, res) =>{
    const { email, password } = req.body;

    if([email, password].some((field) => field?.trim() === "")){
        throw new ApiError("All fields Required", 400);
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError("Not Account Found , Register First", 401);
    }


    const token = await user.generateAccessToken()
    console.log(token)

    if(!(await user.validatePassword(password, user.password))){
        throw new ApiError("Password is incorrect", 401);
    }

    const options ={
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("token", token, options)
    .json(
        new ApiResponse(200,  "User Logged In Successfully")
    )
})