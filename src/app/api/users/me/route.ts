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
  } catch (error: any) {
    console.error("❌ Error in /api/users/me:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
  
  