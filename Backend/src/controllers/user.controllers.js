import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async(req, res) =>{
    const { fullname, email, password } = req.body;

    if([fullname, email, password].some((field) => field?.trim() === "")){
        throw new ApiError("All fields Required", 400);
    }

    const existedUser = await User.findOne({email});
    
    if(existedUser){
        throw new ApiError("Email already exists", 400);
    }

    const user = await User.create({
        fullname,
        email,
        password
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