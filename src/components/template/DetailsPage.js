"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookie";

const DetailsPage = ({ bookId }) => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                // Process the image URL
                const processedBook = {
                    ...data,
                    image: data.image ? (
                        data.image.startsWith('http')
                            ? data.image
                            : `http://localhost:3001/${data.image.replace(/^\//, '')}`
                    ) : null
                };
                setBook(processedBook);
            } catch (error) {
                console.error("Error fetching book:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (bookId) {
            fetchBookDetails();
        }
    }, [bookId]);

    if (loading) {
        return (
            <div className="bg-[#FCFCFC] w-full h-screen flex justify-center items-center">
                <div className="text-xl font-vazir-normal">در حال بارگذاری...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#FCFCFC] w-full h-screen flex justify-center items-center">
                <div className="text-xl font-vazir-normal text-red-500">{error}</div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="bg-[#FCFCFC] w-full h-screen flex justify-center items-center">
                <div className="text-xl font-vazir-normal">کتاب مورد نظر یافت نشد</div>
            </div>
        );
    }

    return (
        <div className="bg-[#FCFCFC] w-full h-screen flex justify-center items-center">
            <div className="w-[800px] h-[500px] rounded-[20px] bg-[#fff] p-[10px] flex flex-row justify-between shadow-lg">
                {/* Image Section */}
                <div className="w-1/2 p-4 flex items-center justify-center">
                    <div className="relative w-[300px] h-[400px]">
                        {book.image ? (
                            <Image
                                src={book.image}
                                alt={book.title}
                                fill
                                className="object-cover rounded-lg"
                                unoptimized
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
                        <h1 className="font-vazir-bold text-2xl text-[#282828]">{book.title}</h1>
                        <div className="flex flex-col space-y-[20px] justify-around">
                            <div className="flex justify-between items-center">
                                <span className="font-vazir-normal text-gray-600 text-[20px]">نویسنده:</span>
                                <span className="font-vazir-normal text-[20px]">{book.author}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-vazir-normal text-gray-600 text-[20px]"> خلاصه ای از کتاب :</span>
                                <span className="font-vazir-normal text-[20px]">{book.summary}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-vazir-normal text-gray-600 text-[20px]">قیمت:</span>
                                <span className="font-vazir-normal text-[20px]">{book.price} هزار تومان</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-vazir-normal text-gray-600 text-[20px]">موجودی:</span>
                                <span className="font-vazir-normal text-[20px]">{book.quantity} عدد</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-around ">
                    <button className="w-[200px] h-[50px] bg-[#F21055] rounded-[12px] text-white py-3 px-6 flex items-center justify-center gap-2 hover:bg-[#d80d48] transition-colors border-none outline-none">
                        <span className="font-vazir-normal text-lg text-center text-[#fff] ">خرید</span>
                        <Image src="/icons/shopping-cart.svg" alt="shopping cart" width={24} height={24} />
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;


