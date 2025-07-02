import { sendEmail } from "@/helpers/mailer";
import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse,NextRequest } from "next/server";

await connect();

export async function POST(req: NextRequest) {
  console.log("🔥 Signup API called");
  try {
    await connect();
    console.log("✅ Connected to DB");

    const reqBody = await req.json();
    console.log("📥 Received body:", reqBody);

    const { email, username, password } = reqBody;

    if (!email || !username || !password) {
      console.log("❌ Missing fields");
      return NextResponse.json(
        { error: "Please enter all the fields" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (user) {
      console.log("⚠️ User already exists");
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("✅ Saved user:", savedUser);

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
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
  