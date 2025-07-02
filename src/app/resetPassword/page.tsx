"use client";
import React, { useEffect,useState } from "react";
import  axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [email,setEmail]=useState("")
    const handleSubmit= async()=>{
        try {
            await axios.post("/api/users/forgotPassword",{
                email,
            })
            toast.success("Email sent successfully");
        } catch (error: any) {
            console.log("❌ Error in handleSubmit", error.response?.data || error.message);
            toast.error(error.response?.data?.error || "Error sending email");
        }
    }
        return (
          <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-200">
                  Forgot Password?
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  onSubmit={(e)=>{e.preventDefault();handleSubmit()}}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-200"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-blackfocus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 mt-5"
                    >{" "}
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        );
}