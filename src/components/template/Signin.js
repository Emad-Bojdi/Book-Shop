"use client"

import { useEffect } from "react";
import LoginForm from "../modules/LoginForm";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/cookie";

const accessToken = getCookie("accessToken")
const Signin = () => {
  const router = useRouter();
  const getProfile = async () => {
    const res = await fetch("http://localhost:3001/auth/check-login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${accessToken}`
      },
    });
    const data = await res.json();
    console.log(data.loggedIn)
    return data.loggedIn
  }
  
  

}

export default Signin;
