import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import {connect} from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";

await connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log("✅ User ID from token:", userId);

    const user = await User.findById(userId).select("-password");

    return NextResponse.json({
      message: "User fetched successfully",
      success: true,
      data: user,
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
  
  