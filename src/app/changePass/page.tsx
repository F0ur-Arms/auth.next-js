"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function ChangePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevents full page reload
    try {
        await axios.post("/api/users/changePassword", {
        token,
        newPassword: password,
      });
      toast.success("Change password successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Change password failed", error);
      toast.error(error.response?.data?.error || "Change password failed");
    }
  };
  
  return (
    <>
      <div className="flex flex-col items-center justify-center py-2 min-h-screen">
        <h1 className="text-4xl mb-3">Change Password</h1>
        <hr />
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={onChangePassword}
        >
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm/6 font-medium text-gray-200"
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
