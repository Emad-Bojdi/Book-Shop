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
  const [books, setBooks] = useState([])
  const router = useRouter()


  useEffect(() => {
    const checkLogin = async () => {

      const { user, loggedIn } = await getProfile();
      if (loggedIn === false) {
        router.push("/auth/signin")
      }
      console.log(user)
      setUserName(user.username);
    };
    checkLogin();
    getBooks();
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

  const getBooks = async () => {
    try {
      const res = await fetch("http://localhost:3001/my-books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        }
      });
      console.log(res)
      const data = await res.json();
      console.log(data.data.books);
      if(res.ok === true) {
        setBooks(data.data.books);
        
      }
    } catch (error) {
      
    }
  }

  return (
    <div className='bg-[#F7F8F8] w-full h-screen'>
      <SearchBar username={userName} />
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
      <TableList books={books}/>
    </div>
  )
}

export default DashboardPage
