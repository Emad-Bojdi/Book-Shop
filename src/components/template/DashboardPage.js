"use client"

import React, { useEffect, useState } from 'react'
import SearchBar from '../modules/SearchBar'
import Image from 'next/image'
import TableList from './TableList'
import { getCookie } from "@/utils/cookie";
import { useRouter } from 'next/navigation'

const DashboardPage = () => {
  const accessToken = getCookie("accessToken")
  const [userName, setUserName] = useState("");
  const router = useRouter()

  useEffect(() => {
    const checkLogin = async () => {
      if(loggedIn === false) {
        router.push("/auth/signin")
      }
      const { user } = await getProfile();
      setUserName(user.username);
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
    <div className='bg-[#F7F8F8] w-full h-screen'>
      <SearchBar username={userName}/>
      <div className='flex justify-center pt-[30px]'>
        <div className='w-4/5 flex justify-between items-center'>
          <div className='flex items-center flex-row space-x-[5px]'>
            <Image src={"icons/setting-3.svg"} alt='manage' width={30} height={30} />
            <span className='font-vazir-normal text-[24px] leading-[37.5px] text-[#282828] '>مدیریت کتاب ها</span>
          </div>
          <div>
            <button className='w-[132px] h-[45px] flex justify-center border-none  items-center rounded-[10px] bg-[#F21055] text-[#FFFFFF] font-vazir-normal leading-[25px]  '>
              افزودن کتاب
            </button>
          </div>
        </div>
      </div>
      <TableList/>
    </div>
  )
}

export default DashboardPage
