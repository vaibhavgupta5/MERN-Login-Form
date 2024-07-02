import mongoose, { Schema } from "mongoose";

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

export const User =  mongoose.model("User", userSchema);