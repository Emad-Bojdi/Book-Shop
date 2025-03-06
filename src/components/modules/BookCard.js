import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { getCookie } from "@/utils/cookie";

const BookCard = ({ book }) => {
  // Add null check for book
  

  const { title, author, price, image, id, quantity = 10, userId } = book; 
  console.log(userId)// Provide default value for quantity
  const [counter, setCounter] = useState(1);
  const [showCounter, setShowCounter] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isOwnBook, setIsOwnBook] = useState(false);
  const { addToCart } = useCart();
  const accessToken = getCookie("accessToken");

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!accessToken) return;

      try {
        const res = await fetch("http://localhost:3001/auth/check-login", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
        });

        if (!res.ok) {
          console.log("Failed to fetch user profile");
          return;
        }

        const data = await res.json();
        console.log(data)
        setUserProfile(data.user.id);
        console.log(userProfile);
        // Check if this is the user's own book
        if (userProfile === userId) {
          setIsOwnBook(true);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [accessToken, userProfile]);

  // Handle increment counter
  const incrementCounter = (e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Prevent event bubbling
    const maxQuantity = quantity || 10; // Default max of 10 if quantity not provided
    if (counter < maxQuantity) {
      setCounter(prev => prev + 1);
    }
  };

  // Handle decrement counter
  const decrementCounter = (e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Prevent event bubbling
    if (counter > 1) {
      setCounter(prev => prev - 1);
    }
    if(counter === 1) {
      setShowCounter(false);
      return
    }
  };

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Prevent event bubbling

    // Check if this is the user's own book
    if (isOwnBook) {
      toast.error('شما نمی‌توانید کتاب خود را خریداری کنید');
      return;
    }

    if (!showCounter) {
      setShowCounter(true);
      return;
    }

    console.log(`Adding ${counter} copies of book ${id} to cart`);
    // Add to cart using context
    addToCart(book, counter);
    // Show confirmation
    toast.success(`${counter} عدد از کتاب "${title}" به سبد خرید اضافه شد`);
    // Reset state
    setShowCounter(false);
    setCounter(1);
  };

  // Safely handle image URL
  const imageUrl = image || "/images/default-book.jpg"; // Provide a default image path

  return (
    <div className="bg-[#FFFFFF] w-[231px] h-[240px] rounded-[12px] shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] ml-[10px] relative">
      {isOwnBook && (
        <div className="absolute bottom-[0] right-[85px]  text-xs  px-2 py-1 z-10 ">
          <span className="w-full font-vazir-medium text-[15px] text-[#4d4d4d]"> کتاب شما </span>
        </div>
      )}
      <div className="flex flex-col justify-center p-[8px]">
        <div className="w-full h-[70px] relative mb-[15px]">
          <Image
            src={imageUrl}
            alt={title || "Book cover"}
            width={70}
            height={70}
            unoptimized
            className="object-contain"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "/images/default-book.jpg"; // Fallback image
            }}
          />
        </div>
        <Link className="font-vazir-normal text-[18px] leading-[25px] text-[#282828] no-underline hover:text-[#F21055] truncate" href={`/books/${id}`}>
          {title || "Unknown Title"}
        </Link>
        <p className="font-vazir-normal text-[14px] text-[#282828] truncate">{author || "Unknown Author"}</p>
        <div className="w-full flex flex-row justify-between items-center mt-2">
          <p className="font-vazir-normal text-[14px] leading-[21.88px] text-[#282828]" dir="rtl">{price || 0} هزار تومان </p>

          {showCounter ? (
            <div className="flex items-center space-x-[10px] rounded-lg p-1">
              <button
                onClick={decrementCounter}
                className={`w-[25px] h-[25px] flex items-center border-none outline-none justify-center rounded-[10px] ${counter <= 1 ? 'bg-gray-200 text-gray-400' : 'bg-[#F21055] text-[#FCFCFC] hover:bg-[#d80d48]'} transition-colors`}
              >
                <span className="text-[15px]">-</span>
              </button>

              <span className="font-vazir-normal text-[14px] mx-1">{counter}</span>

              <button
                onClick={incrementCounter}
                disabled={counter >= (quantity || 10)}
                className={`w-[25px] h-[25px] flex items-center justify-center border-none outline-none rounded-[10px] ${counter >= (quantity || 10) ? 'bg-gray-200 text-gray-400' : 'bg-[#F21055] text-[#fff] hover:bg-[#d80d48]'} transition-colors`}
              >
                <span className="text-[15px]">+</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="border-none outline-none bg-inherit ml-[10px] hover:scale-110 transition-transform"
            >
              <Image src="/icons/shopping-cart.svg" alt="add to cart" width={22} height={22} />
            </button>
          )}
        </div>

        {/* Confirm button that appears when counter is shown */}
        {showCounter && !isOwnBook && (
          <button
            onClick={handleAddToCart}
            className="w-[80px] h-[25px] absolute bottom-[10px] right-[75px] bg-[#F21055] border-none outline-none text-[#fff] font-vazir-medium text-xs py-1 px-2 rounded-[10px] hover:bg-[#d80d48] transition-colors"
          >
            تایید
          </button>
        )}
      </div>
    </div>
  )
}

export default BookCard;
