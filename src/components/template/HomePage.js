"use client"

import Image from "next/image"
import BookCard from "../modules/BookCard"
import { useState, useEffect } from "react";
import "../../css/Loader.css"
import Modal from "../modules/Modal";
import Link from "next/link";
import { getCookie } from "@/utils/cookie";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";


const HomePage = () => {
  const accessToken = getCookie("accessToken")
  let text = "مرتب سازی"

  const [buttonText, setButtonText] = useState("داشبورد");
  const [href, setHref] = useState("/dashboard");
  

  const [books, setBooks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [queryParams, setQueryParams] = useState({});

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
  useEffect(() => {
    const checkLogin = async () => {
      console.log(accessToken)
      const {loggedIn, user} = await getProfile();
      console.log(loggedIn);
      console.log(user)
      if (loggedIn === false) {
        setButtonText("ورود");
        setHref("/auth/signin");
      }
    };
    checkLogin();
  }, []);


  const getBooks = async () => {
    setIsLoading(true);
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const res = await fetch(`http://localhost:3001/book?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      
      // Process the images before setting the books
      const processedBooks = data.data.map(book => ({
        ...book,
        image: book.image ? (
          book.image.startsWith('http') 
            ? book.image 
            : `http://localhost:3001/${book.image.replace(/^\//, '')}`
        ) : null
      }));

      // Filter books based on query parameters
      const filteredBooks = filterBooks(processedBooks, queryParams);
      setBooks(filteredBooks);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      toast.error("خطا در دریافت اطلاعات کتاب‌ها");
    } finally {
      setIsLoading(false);
    }
  }

  const filterBooks = (books, filters) => {
    return books.filter(book => {
      let matches = true;
      if (filters.title) {
        matches = matches && book.title?.includes(filters.title);
      }
      if (filters.author) {
        matches = matches && book.author?.includes(filters.author);
      }
      if (filters.minPrice) {
        matches = matches && book.price >= parseFloat(filters.minPrice);
      }
      if (filters.maxPrice) {
        matches = matches && book.price <= parseFloat(filters.maxPrice);
      }
      return matches;
    });
  }

  const handleSort = (sortCriteria) => {
    setQueryParams(sortCriteria);
    setModal(false); // Close the modal after sorting
  }

  useEffect(() => {
    getProfile();
    getBooks(); // Fetch books whenever queryParams change
  }, [queryParams]);


  return (
    <div className="w-full bg-[#FCFCFC]">
      <div className=" flex flex-col p-[15px]">
        <div className="flex flex-row justify-between mx-[15px]-">
          <div className="flex flex-row justify-baseline items-center gap-x-[10px]">
            <Image src="/icons/book.svg" alt="book" width={28} height={28} />
            <span className=" font-vazir-normal text-[28px] leading-[50px] text-[#000000] "> همه کتاب ها </span>
          </div>
          <div className="flex flex-row justify-between gap-x-[10px] ml-[30px]">
            <Link href={`${href}`} className="bg-[#F21055] flex items-center justify-center w-[154px] h-[62px] rounded-[10px] no-underline text-center  cursor-pointer font-vazir-bold text-[20px] leading-[37.5px] text-[#FFFFFF] hover:bg-[#ec849c]" >
              {buttonText}
            </Link>
            <button className="bg-[#F21055] w-[154px] h-[62px] rounded-[10px] border-none outline-none cursor-pointer font-vazir-bold text-[20px] leading-[37.5px] text-[#FFFFFF] hover:bg-[#ec849c]" onClick={() => setModal(true)}>
              مرتب سازی
            </button>
          </div>
          {
            modal && (<Modal setModal={setModal} onSort={handleSort} text={text}/>)
          }
        </div>
        {isLoading ? (<div className=" flex justify-center">
          <span class="loader"></span>
        </div>) : (<div className="flex flex-wrap flex-row justify-center mt-[15px] gap-x-[50px] gap-y-[50px]">
          {
            books.map((book, index) => (
              <BookCard key={index} book={book} />
            ))
          }
        </div>)}
        <div>
        </div>
      </div>
      <Toaster
      position="top-center"
      toastOptions={{
        className: "font-vazir-medium",

        duration: 1000,
      }}/>
    </div>
  )
}

export default HomePage;


