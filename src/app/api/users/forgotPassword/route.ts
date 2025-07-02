import { sendEmail } from "../../../../helpers/mailer";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";

await connect();
export async function POST(req: NextRequest) {
    console.log("🔥 Forgot Password API called");
    try {
        const { email } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found");
            return NextResponse.json(
                { error: "User not found" },
                { status: 400 }
            );
        }

        await sendEmail({
            email,
            emailType: "RESET",
            userId: user._id,
        });

        return NextResponse.json({
            message: "Reset password email sent successfully",
            success: true,
        });

    } catch (error: any) {
        console.error("❌ Error in forgotPassword:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
