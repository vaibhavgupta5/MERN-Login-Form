import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        fullname:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            lowercase: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            unique: true
        },
        password:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)



userSchema.methods.validatePassword = async function(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword)
}

userSchema.methods.generateAccessToken = async function(){
    const token = jwt.sign(
        { 
            id: this._id,
            email: this.email
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_SECRET_EXPIRY });
    return token;
}

export const User =  mongoose.model("User", userSchema);