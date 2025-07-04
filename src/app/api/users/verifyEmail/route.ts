import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextResponse,NextRequest } from "next/server";
import dotenv from "dotenv";
dotenv.config();
await connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        console.log("📥 Received body:", reqBody);

        const { token } = reqBody;

        if (!token) {
            console.log("❌ Missing fields");
            return NextResponse.json(
                { error: "Please enter all the fields" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: new Date() } });
        if (!user) {
            console.log("❌ User not found");
            return NextResponse.json(
                { error: "User not found" },
                { status: 400 }
            );
        }

        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();
        return NextResponse.json({
            message: "User verified successfully",
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