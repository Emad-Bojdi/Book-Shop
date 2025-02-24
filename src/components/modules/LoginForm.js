"use client"

import React from 'react'
import Link from 'next/link'
import toast, {Toaster} from 'react-hot-toast';
import { setCookie, getCookie } from '@/utils/cookie';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';


const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const input = useRef(null);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const validateForm = () => {
        if (!formData.userName || !formData.password ) {
            toast.error("نمام فیلد ها را پر کنید.");
            return false;
        }
        
        if (formData.password.length < 8) {
            toast.error("رمز نباید کم تر از 8 کاراکتر باشد!");
            return false;
        }
        return true;
    }

    const handleLogin = async (e)=> {
        e.preventDefault();
        setIsSubmitting(true);
        if(!validateForm()){
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: formData.userName, password: formData.password}),
            });

            const data =await response.json();
            if(response.ok === true){
                console.log("Received token:", data.token);
                setCookie({accessToken: data.token});
                const storedToken = getCookie("accessToken");
                console.log("Stored token:", storedToken);
                toast.success("وارد شدید!");
                router.push("/")
            }
            else if(response.ok === false){
                toast.error("ابتدا حساب کاربری ایجاد کنید!");
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error("ارسال اطلاعات با خطا مواجه شد. لطفا دوباره تلاش کنید")
        } finally{
            setIsSubmitting(false);
        }

    }

  return (
    <>
    <div className="flex flex-col w-full h-screen bg-white items-center justify-center bg-[#FFFFFF]">
        <div className=" flex items-center justify-center">
            <form onSubmit={handleLogin} className="w-[460px] h-[596px] border border-[#E4E4E4] rounded-[40px]  flex flex-col  items-center justify-around">
                <p className="font-vazir-medium text-[24px] leading-[37.5px] text-[#282828] "> ورود </p>
                <div className="flex flex-col gap-y-[15px]  items-center w-full justify-between">
                    <input type="text" id='input' ref={input} name="userName" value={formData.userName} onChange={handleChange} placeholder="نام کاربری" className=" font-vazir-medium pr-[15px] w-9/10 h-[53px] rounded-[15px] bg-[#F2F2F2] border-none text-[#282828] text-[16px] outline-none" />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="رمز عبور" className="font-vazir-medium pr-[15px] w-9/10 h-[53px] rounded-[15px] bg-[#F2F2F2] border-none text-[#282828] text-[16px] outline-none" />
                </div>
                <button className="font-vazir-medium  w-9/10 h-[53px] rounded-[15px] bg-[#F21055] text-[#FFFFFF] border-none text-[16px]" type="submit" disabled={isSubmitting} >
                    {isSubmitting ? "در حال ارسال..." : "ورود "}
                </button>
                <div className="w-full">
                    <Link href="/auth/signup" className="text-right no-underline font-vazir-normal text-[16px] text-[#F21055] pr-[15px]">
                        ایجاد حساب کاربری
                    </Link>
                </div>
            </form>
        </div>

    </div>
    <Toaster toastOptions={{className: "font-vazir-medium"}}/>
</>
  )
}

export default LoginForm
