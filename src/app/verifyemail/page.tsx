"use client"
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);


    const verifyEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyEmail", {
                token,
            });
            console.log("✅ Email verified", response.data);
            toast.success("Email verified successfully");
            setVerified(true);
        } catch (error: any) {
            console.log("❌ Error in verifyEmail", error.response?.data || error.message);
            toast.error(error.response?.data?.error || "Error verifying email");
            setError(true);
        }
    };
    useEffect(() => {
        const urlToken= window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[])
    useEffect(() => {
        if(token.length>0){
            verifyEmail();
        }
    },[token])
    return (
      <div className="flex flex-col items-center justify-center py-2 min-h-screen">
        <h1 className="text-4xl"> Verify Email</h1>
        <h2 className="p-2 bg-yellow-300 text-black">{token?`${token}`:"No token found"}</h2>
        {verified&&(
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl">Email verified successfully</h2>
                <Link href={"/login"} className="text-white">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </Link>
            </div>
        )}
        {error&&(
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl bg-red-600">ERROR</h2>
            </div>
        )}
      </div>
    );
}