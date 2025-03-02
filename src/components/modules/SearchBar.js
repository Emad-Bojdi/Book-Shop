"use client"

import Image from "next/image"
import { useState } from "react";


const SearchBar = ({ username, role, onSearch }) => {
    const [searchField, setSearchField] = useState('title');
    const handleSearchInput = (e) => {
        onSearch(e.target.value, searchField)
    }

    const handleFieldChange = (e) => {
        setSearchField(e.target.value)
        // Clear previous search when changing fields
        onSearch('', e.target.value)
    }
    return (
        <div className="flex flex-row justify-center">
            <div className="w-4/5 border border-[#E4E4E4] rounded-[16px] h-[60px] bg-[#FFFFFF] flex items-center">
                <button className="border-none outline-none bg-inherit cursor-pointer px-4">
                    <Image src={"/icons/search-normal.svg"} alt="Search" width={24} height={24} />
                </button>
                
                <select 
                    className="border-none bg-inherit text-[14px] font-vazir-normal mx-2"
                    value={searchField}
                    onChange={handleFieldChange}
                >
                    <option value="title">عنوان</option>
                    <option value="price">قیمت</option>
                    <option value="quantity">موجودی</option>
                </select>

                <input 
                    className="flex-grow outline-none border-none text-[16px] font-vazir-normal leading-[25px] placeholder:text-[#E4E4E4]" 
                    placeholder={`جستجو بر اساس ${
                        searchField === 'title' ? 'عنوان' : 
                        searchField === 'price' ? 'قیمت' : 
                        'موجودی'
                    }`}
                    onChange={handleSearchInput}
                    type={searchField === 'title' ? 'text' : 'number'}
                />

                <div className="basis-1/6 h-[68px] flex items-center">
                    <div className="w-full p-[5px] h-[52px] border-r border-[#E4E4E4] flex flex-row space-x-[10px]">
                        <div className="">
                            <div className="border w-[46px] h-[46px] rounded-full flex justify-center items-center text-[25px]">
                                {role === "user" ? "U" : "A"}
                            </div>
                        </div>
                        <div className="h-[22px] flex flex-col">
                            <span className="h-[10px] text-[16px] font-vazir-normal text-[#282828]">
                                {username}
                            </span>
                            <p className="h-auto text-[14px] font-vazir-thin text-[#282828]">
                                {role === "user" ? "کاربر" : "ادمین"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
