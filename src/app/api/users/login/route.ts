import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse,NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
await connect();

export async function POST(req: NextRequest) {
    console.log("🔥 Login API called");
    try {
        const reqBody = await req.json();
        console.log("📥 Received body:", reqBody);

        const { email, password } = reqBody;

        if (!email || !password) {
            console.log("❌ Missing fields");
            return NextResponse.json(
                { error: "Please enter all the fields" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found");
            return NextResponse.json(
                { error: "User not found" },
                { status: 400 }
            );
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log("❌ Incorrect password");
            return NextResponse.json(
                { error: "Incorrect password" },
                { status: 400 }
            );
        }
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
          expiresIn: "1d",
        });
        const response= NextResponse.json({
            message: "User logged in successfully",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    } catch (error:any) {
        console.error("❌ Error in login:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}