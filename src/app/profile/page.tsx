"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");

  const logout = async () => {
    console.log("🔄 Calling /api/users/logout");

    try {
      const response = await axios.post("/api/users/logout");
      console.log("✅ Logged out", response.data);

      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("❌ Logout failed", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Logout failed");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me", {
        withCredentials: true, // ✅ this is crucial for cookies to be sent
      });
      
      setData(res.data.data._id);
      console.log("🔄 getUserDetails", res.data);
      toast.success("User details fetched");
    } catch (error: any) {
      console.log(
        "❌ Error in getUserDetails",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.error || "Error fetching user details");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1>Profile</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "No ID fetched yet"
        ) : (
          <Link href={`/profile/${data}`} className="text-white">{data}</Link>
        )}
      </h2>
      <hr />
      <button
        type="button"
        onClick={logout}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
      >
        Log Out
      </button>
      <button
        type="button"
        onClick={getUserDetails}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded mt-2"
      >
        Get Details
      </button>
    </div>
  );
}
