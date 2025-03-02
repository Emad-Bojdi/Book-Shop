"use client"

import React, { useEffect, useState } from 'react'
import SearchBar from '../modules/SearchBar'
import Image from 'next/image'
import TableList from './TableList'
import { deleteCookies, getCookie } from "@/utils/cookie";
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Modal from '../modules/Modal'

const DashboardPage = ({ editBookId }) => {
  const accessToken = getCookie("accessToken")
  let text = "افزودن کتاب "
  const [modal, setModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([])
  const [searchQuery, setSearchQuery] = useState({
    text: '',
    field: 'title' // default search field
  })
  const router = useRouter()


  useEffect(() => {
    const checkLogin = async () => {
      const { user, loggedIn } = await getProfile();
      if (loggedIn === false) {
        router.push("/auth/signin")
      }
      console.log(user)
      setUserName(user.username);
      setRole(user.role);
    };
    checkLogin();
    getBooks();
  }, []);

  useEffect(() => {
    if (editBookId && books.length > 0) {
      const bookToEdit = books.find(book => book.id === editBookId);
      if (bookToEdit) {
        setSelectedBook(bookToEdit);
        setModal(true);
      }
    }
  }, [editBookId, books]);

  const handleSearch = (searchText, searchField) => {
    setSearchQuery({
      text: searchText,
      field: searchField
    })
  }

  const handleBookAdded = async () => {
    console.log("Refreshing books list...");
    // Clear the current books list to ensure we see the changes
    setBooks([]);
    setFilteredBooks([]);
    
    // Add a small delay to ensure the server has processed the update
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Fetch the updated books list
    await getBooks();
  }

  useEffect(() => {
    if (!searchQuery.text) {
      setFilteredBooks(books)
      return
    }

    const filtered = books.filter(book => {
      const searchText = searchQuery.text.toLowerCase()

      switch (searchQuery.field) {
        case 'title':
          return book.title.toLowerCase().includes(searchText)
        case 'price':
          return book.price.toString().includes(searchText)
        case 'quantity':
          return book.quantity.toString().includes(searchText)
        default:
          return true
      }
    })

    setFilteredBooks(filtered)
  }, [searchQuery, books])

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
      console.log("Fetching books from API...");
      const res = await fetch("http://localhost:3001/my-books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        }
      });
      
      console.log("Books API response status:", res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error fetching books. Status:", res.status, "Response:", errorText);
        toast.error("خطا در دریافت اطلاعات کتاب‌ها");
        return;
      }
      
      const data = await res.json();
      console.log("Books data received:", data);
      
      if (data && data.data && data.data.books) {
        // Transform the books data to include the full image URL if it exists
        const booksWithImages = data.data.books.map(book => {
          // Normalize image path by replacing backslashes with forward slashes
          let imagePath = book.image ? book.image.replace(/\\/g, '/') : null;
          
          // Make sure the path is properly formatted
          if (imagePath && !imagePath.startsWith('http')) {
            // If the path already includes 'uploads', don't add it again
            if (!imagePath.includes('uploads/')) {
              imagePath = `http://localhost:3001/uploads/${imagePath}`;
            } else {
              imagePath = `http://localhost:3001/${imagePath}`;
            }
          }
          
          return {
            ...book,
            image: imagePath
          };
        });
        
        console.log("Books with processed images:", booksWithImages);
        setBooks(booksWithImages);
        setFilteredBooks(booksWithImages);
      } else {
        console.error("Invalid books data format:", data);
        toast.error("فرمت داده‌های دریافتی نامعتبر است");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("خطا در دریافت اطلاعات: " + error.message);
    }
  }

  const exitHandler = () => {
    deleteCookies();
    router.push("/auth/signin");
    toast.success("با موفقیت خارج شدید");
  }

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setModal(true);
  }

  return (
    <div className='bg-[#F7F8F8] w-full h-screen'>
      <SearchBar username={userName} role={role} onSearch={handleSearch}/>
      <div className='flex justify-center pt-[30px]'>
        <div className='w-4/5 flex justify-between items-center'>
          <div className='flex items-center flex-row space-x-[5px]'>
            <Image src={"icons/setting-3.svg"} alt='manage' width={30} height={30} />
            <span className='font-vazir-normal text-[24px] leading-[37.5px] text-[#282828] '>مدیریت کتاب ها</span>
          </div>
          <div className='flex flex-row space-x-[10px]'>
            <button className='w-[132px] h-[45px] flex justify-center border-none  items-center rounded-[10px] bg-[#F21055] text-[#FFFFFF] font-vazir-normal leading-[25px]  cursor-pointer' onClick={exitHandler}>
              خروج
            </button>
            <button className='w-[132px] h-[45px] flex justify-center border-none  items-center rounded-[10px] bg-[#F21055] text-[#FFFFFF] font-vazir-normal leading-[25px]  cursor-pointer' onClick={() => {
              setSelectedBook(null);
              setModal(true);
            }}>
              {text}
            </button>
          </div>

          {modal && (
            <Modal 
              setModal={setModal} 
              text={selectedBook ? "ویرایش کتاب" : text} 
              onBookAdded={handleBookAdded} 
              bookToEdit={selectedBook} 
            />
          )}
        </div>
      </div>
      <TableList books={filteredBooks} onEditBook={handleEditBook} />
    </div>
  )
}

export default DashboardPage
