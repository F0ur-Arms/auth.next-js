"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
export default function Example() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/login", user);
      console.log("Login successful");
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error);
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="/images/087f6edbc2216b4916ad51cd22217260-removebg-preview.png"
            className="mx-auto h-52 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-200">
            {loading ? "Logging in..." : "Sign in to your account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
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
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-blackfocus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-200"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/resetPassword"
                    className="font-semibold text-yellow-400 hover:text-yellow-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                {buttonDisabled ? "Please fill all the fields" : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
