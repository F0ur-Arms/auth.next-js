import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse,NextRequest } from "next/server";
import dotenv from "dotenv";
dotenv.config();
await connect();

export async function POST(req: NextRequest) {
    console.log("🔥 Forgot Password API called");
    try {
        const reqBody = await req.json();
        console.log("📥 Received body:", reqBody);

        const { token,newPassword } = reqBody;

        if (!token) {
            console.log("❌ Missing fields");
            return NextResponse.json(
                { error: "Please enter all the fields" },
                { status: 400 }
            );
        }
        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: new Date() } });
        if (!user) {
            console.log("❌ User not found");
            return NextResponse.json(
                { error: "User not found" },
                { status: 400 }
            );
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.forgotPasswordToken=undefined;
        user.forgotPasswordTokenExpiry=undefined;
        await user.save();
        return NextResponse.json({
            message: "User password changed successfully",
            success: true,
        });
        

    } catch (error: unknown) {
        let message = "Something went wrong";
    
        if (error instanceof Error) {
            message = error.message;
        }
    
        console.error("❌ Error in forgotPassword:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}