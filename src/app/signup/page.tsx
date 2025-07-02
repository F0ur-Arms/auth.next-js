"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import  axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
export default function SignupPage() {
    const router= useRouter();
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:"",
    })
    const [buttonDisabled,setButtonDisabled]=useState(false);
    const [loading,setLoading]=useState(false);
    const onSignup = async (e: React.FormEvent) => {
      e.preventDefault(); // ✅ prevent default form submission
      try {
        setLoading(true);
        await axios.post("/api/users/signup", user);
        console.log("Signup successful");
        toast.success("Signup successful");
        router.push("/login");
      } catch (error: any) {
        console.log("Signup failed", error);
        toast.error(error.response?.data?.error || "Signup failed");
      } finally {
        setLoading(false);
      }
    };
    
    
    useEffect(()=>{
      if(user.email.length>0&&user.password.length>0){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
    },[user])
    return (
      <>
        <section className="bg-gray-50 dark:bg-black">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Image
              className="w-50 h-auto mx-auto mb-5"
              src="/images/087f6edbc2216b4916ad51cd22217260-removebg-preview.png"
              alt="logo"
            />
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-yellow-300">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                  {loading ? "Signing up..." : "SIGN UP"}
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={onSignup}
                  action="#"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-300 dark:border-gray-600 dark:placeholder-grey-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={user.username}
                      onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                      }
                      placeholder="Enter your Username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-300 dark:border-gray-600 dark:placeholder-grey-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-300 dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex items-start">

                  </div>
                  <button
                    type="submit"
                    className="w-full text-black bg-yellow-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {buttonDisabled
                      ? "Please fill all the fields"
                      : "Create an account"}
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}