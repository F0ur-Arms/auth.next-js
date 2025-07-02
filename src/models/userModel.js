import { verify } from "crypto";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please enter a username"],
        unique:true,
        minlength:3,
        maxlength:20
    },
    email:{
        type:String,
        required:[true,"Please enter an email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:{
        type:String,
    },
    forgotPasswordTokenExpiry:{
        type:Date,
    },
    verifyToken:{
        type:String,
    },
    verifyTokenExpiry:{
        type:Date,
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
