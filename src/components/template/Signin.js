"use client"

import { useEffect } from "react";
import LoginForm from "../modules/LoginForm";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/cookie";

const accessToken = getCookie("accessToken")
const Signin = () => {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const { loggedIn, user } = await getProfile() || undefined;
      console.log(loggedIn);
      console.log(user)
      if (loggedIn) {
        router.push("/")
      }
    };
    checkLogin();
  }, []);
  const getProfile = async () => {
    try {
        const res = await fetch("http://localhost:3001/auth/check-login", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${accessToken}`
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        // Ensure the response has the expected structure
        return {
            loggedIn: data.loggedIn || false, // Default to false if not present
            user: data.user || null // Default to null if not present
        };
    } catch (error) {
        console.error("Error fetching profile:", error);
        return { loggedIn: false, user: null }; // Return default values on error
    }
}

  return (
    <div className="w-full bg-[#F7F8F8]">
      <LoginForm />
    </div>
  )

}

export default Signin;
