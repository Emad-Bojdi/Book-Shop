"use client"

import Image from "next/image"
import BookCard from "../modules/BookCard"
import { useState, useEffect } from "react";
import "./Loader.css"
const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const getBooks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3001/book", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log(res)
      if (!res.ok) {
        // If the response status code is not in the 200-299 range,
        // it indicates an error.
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      setBooks(data.data); // Assuming you want to store the fetched books in the state
    } catch (error) {
      console.error("Failed to fetch books:", error);
      // setIsLoading(false);
    } finally {
      // setIsLoading(false);
    }
  }
  useEffect(() => {
    getBooks();
  }, []);

  const handleSort = () => {
    console.log("clicked")
  }

  return (
    <div className="w-full bg-[#FCFCFC]">
      <div className=" flex flex-col p-[15px]">
        <div className="flex flex-row justify-between ">
          <div className="flex flex-row justify-baseline items-center gap-x-[5px]">
            <Image src="/icons/book.svg" alt="book" width={28} height={28} />
            <span className=" font-vazir-normal text-[28px] leading-[50px] text-[#000000] "> همه کتاب ها </span>
          </div>
          <button className="bg-[#F21055] w-[154px] h-[62px] rounded-[10px] border-none font-vazir-bold text-[20px] leading-[37.5px] text-[#FFFFFF] " onClick={handleSort}>
            مرتب سازی
          </button>
        </div>
        {isLoading ? (<div className=" flex justify-center">
          <span class="loader"></span>
        </div>) : (<div>
          {
            books.map((book, index) => (
              <BookCard key={index} book={book} />
            ))
          }
        </div>)}
        <div>

        </div>
      </div>
    </div>
  )
}

export default HomePage;


