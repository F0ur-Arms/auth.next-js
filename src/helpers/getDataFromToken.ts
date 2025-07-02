import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function getDataFromToken(request: NextRequest) {
    try {
        const token=request.cookies.get("token")?.value||'';
        const decodedToken:any=jwt.verify(token, process.env.TOKEN_SECRET!) as any;
        return decodedToken.id;
    } catch (error:any) {
        throw new Error("❌ Error in getDataFromToken: " + error.message);
    }
}