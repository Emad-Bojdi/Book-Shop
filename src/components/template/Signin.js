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
        // Log the token to verify it exists
        console.log("Access Token:", accessToken);

        const res = await fetch("http://localhost:3001/auth/check-login", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}` // Note: 'Bearer' with capital B and space
            },
        });

        if (!res.ok) {
            if (res.status === 401) {
                console.log("Unauthorized - Token might be invalid or expired");
                return { loggedIn: false, user: null };
            }
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return {
            loggedIn: data.loggedIn || false,
            user: data.user || null
        };
    } catch (error) {
        console.error("Error fetching profile:", error);
        return { loggedIn: false, user: null };
    }
}

  return (
    <div className="w-full bg-[#F7F8F8]">
      <LoginForm />
    </div>
  )

}

export default Signin;
