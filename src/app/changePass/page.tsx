"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ChangePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false); // <- track mounting

  useEffect(() => {
    setMounted(true);
    const tokenFromParams = searchParams.get("token");
    setToken(tokenFromParams);
  }, [searchParams]);

  const onChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Missing token");
      return;
    }
    try {
      await axios.post("/api/users/changePassword", {
        token,
        newPassword: password,
      });
      toast.success("Change password successful");
      router.push("/login");
    } catch (error: unknown) {
      let message = "Change password failed";
      if (error instanceof Error) message = error.message;
      toast.error(message);
    }
  };

  if (!mounted) return null; // <- avoid rendering until client mounts

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1 className="text-4xl mb-3">Change Password</h1>
      <form onSubmit={onChangePassword} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            New Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-yellow-400 px-3 py-1.5 font-semibold text-black hover:bg-yellow-500"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
