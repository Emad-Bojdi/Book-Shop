"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookie";
import { useCart } from "@/context/CartContext";

import toast, { Toaster } from "react-hot-toast";

const DetailsPage = ({ bookId }) => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [counter, setCounter] = useState(1); // Initialize counter to 1
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
                setUserProfile(data.user || null);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [accessToken]);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3001/book/${bookId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!res.ok) {
                    throw new Error('کتاب مورد نظر یافت نشد');
                }

                const data = await res.json();
                console.log(data);

                // Validate book data
                if (!data || typeof data !== 'object') {
                    throw new Error('دریافت اطلاعات کتاب با خطا مواجه شد');
                }

                // Process the image URL
                const processedBook = {
                    ...data,
                    quantity: data.quantity || 10, // Default quantity if not provided
                    price: data.price || 0, // Default price if not provided
                    image: data.image ? (
                        data.image.startsWith('http')
                            ? data.image
                            : `http://localhost:3001/${data.image.replace(/^\//, '')}`
                    ) : null
                };
                setBook(processedBook);
                
                // Check if this is the user's own book
                if (userProfile !== processedBook.userId) {
                    setIsOwnBook(true);
                    console.log(isOwnBook)
                }
            } catch (error) {
                console.error("Error fetching book:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (bookId) {
            fetchBookDetails();
        } else {
            setError('شناسه کتاب نامعتبر است');
            setLoading(false);
        }
    }, [bookId, userProfile]);

    // Handle increment counter
    const incrementCounter = () => {
        if (book && counter < (book.quantity || 10)) {
            setCounter(prev => prev + 1);
        }
    };

    // Handle decrement counter
    const decrementCounter = () => {
        if (counter > 1) {
            setCounter(prev => prev - 1);
        }
    };

    // Handle add to cart
    const handleAddToCart = () => {
        if (!book) {
            toast.error('اطلاعات کتاب در دسترس نیست');
            return;
        }
        
        // Check if this is the user's own book
        if (isOwnBook) {
            toast.error('شما نمی‌توانید کتاب خود را خریداری کنید');
            return;
        }

        console.log(`Adding ${counter} copies of book ${book.id} to cart`);
        // Add to cart using context
        addToCart(book, counter);
        // Show confirmation
        toast.success(`${counter} عدد از کتاب "${book.title}" به سبد خرید اضافه شد`);
    };

    if (loading) {
        return (
            <>

                <div className="bg-[#FCFCFC] w-full h-screen flex justify-center items-center">
                    <div className="text-xl font-vazir-normal">در حال بارگذاری...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>

                <div className="bg-[#FCFCFC] w-full h-screen flex justify-center items-center">
                    <div className="text-xl font-vazir-normal text-red-500">{error}</div>
                </div>
            </>
        );
    }

    if (!book) {
        return (
            <>

                <div className="bg-[#FCFCFC] w-full h-screen flex justify-center items-center">
                    <div className="text-xl font-vazir-normal">کتاب مورد نظر یافت نشد</div>
                </div>
            </>
        );
    }

    // Safely access book properties with fallbacks
    const {
        title = 'عنوان نامشخص',
        author = 'نویسنده نامشخص',
        price = 0,
        quantity = 10,
        summary = '',
        image = null,
        sellerId = null
    } = book;

    return (
        <>

            <div className="bg-[#FCFCFC] w-full min-h-screen flex justify-center items-center py-10">
                <div className="w-[800px] h-[500px] rounded-[20px]  bg-[#fff] p-[20px] flex flex-row justify-between shadow-lg border border-[#F21055]/[0.1]">
                    {/* Image Section */}
                    <div className="w-1/2 p-4 flex items-center justify-center">
                        <div className="relative w-[300px] h-[400px]">
                            {image ? (
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    className="object-cover rounded-lg"
                                    unoptimized
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevent infinite loop
                                        e.target.src = "/images/default-book.jpg"; // Fallback image
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500">تصویر موجود نیست</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="w-1/2 p-4 flex flex-col justify-between ">
                        <div className="space-y-4">
                            <h1 className="font-vazir-bold text-2xl text-[#282828]">{title}</h1>
                            <div className="flex flex-col space-y-[20px] justify-around">
                                <div className="flex justify-between items-center">
                                    <span className="font-vazir-normal text-gray-600 text-[20px]">نویسنده:</span>
                                    <span className="font-vazir-normal text-[20px]">{author}</span>
                                </div>
                                {summary && (
                                    <div className="flex justify-between items-center">
                                        <span className="font-vazir-normal text-gray-600 text-[20px]"> خلاصه ای از کتاب :</span>
                                        <span className="font-vazir-normal text-[20px]">{summary}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="font-vazir-normal text-gray-600 text-[20px]">قیمت:</span>
                                    <span className="font-vazir-normal text-[20px]">{price} هزار تومان</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-vazir-normal text-gray-600 text-[20px]">موجودی:</span>
                                    <span className="font-vazir-normal text-[20px]">{quantity} عدد</span>
                                </div>
                                
                                {/* Counter UI */}
                                <div className="flex justify-between items-center">
                                    <span className="font-vazir-normal text-gray-600 text-[20px]">تعداد:</span>
                                    <div className="flex items-center space-x-[10px] p-1">
                                        <button
                                            onClick={decrementCounter}
                                            disabled={counter <= 1}
                                            className={`w-[35px] h-[35px] flex items-center border-none outline-none justify-center rounded-[10px] ${counter <= 1 ? 'bg-gray-200 text-gray-400' : 'bg-[#F21055] text-[#FCFCFC] hover:bg-[#d80d48]'} transition-colors`}
                                        >
                                            <span className="text-[20px]">-</span>
                                        </button>

                                        <span className="font-vazir-normal text-[20px] mx-1">{counter}</span>

                                        <button
                                            onClick={incrementCounter}
                                            disabled={counter >= (quantity || 10)}
                                            className={`w-[35px] h-[35px] flex items-center justify-center border-none outline-none rounded-[10px] ${counter >= (quantity || 10) ? 'bg-gray-200 text-gray-400' : 'bg-[#F21055] text-[#fff] hover:bg-[#d80d48]'} transition-colors`}
                                        >
                                            <span className="text-[20px]">+</span>
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Total Price */}
                                <div className="flex justify-between items-center">
                                    <span className="font-vazir-normal text-gray-600 text-[20px]">قیمت کل:</span>
                                    <span className="font-vazir-normal text-[20px] font-bold">{price * counter} هزار تومان</span>
                                </div>
                                
                                {/* Own Book Warning */}
                                {isOwnBook && (
                                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded-md">
                                        <p className="font-vazir-normal text-center">این کتاب متعلق به شماست و امکان خرید آن وجود ندارد</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-end ">
                        <button 
                            onClick={handleAddToCart}
                            disabled={isOwnBook}
                            className={`w-[200px] h-[50px] rounded-[12px] text-white py-3 px-6 flex items-center justify-center gap-2 transition-colors border-none outline-none ${isOwnBook ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F21055] hover:bg-[#d80d48]'}`}
                        >
                            <span className="font-vazir-normal text-[23px] text-center text-[#fff] ">
                                {isOwnBook ? 'کتاب شما' : 'افزودن به سبد'}
                            </span>
                            <Image src="/icons/shopping-cart.svg" alt="shopping cart" width={24} height={24} />
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-center"
                toastOptions={{
                    className: "font-vazir-medium",
                    duration: 1000,
                }} />
            <div className="h-10"></div> {/* Extra space at bottom */}
        </>
    );
};

export default DetailsPage;


