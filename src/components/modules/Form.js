"use client"

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';


const Form = () => {
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        rePassword: ""
    });
    const router = useRouter();
    const input = useRef(null);

    useEffect(() => {
        input.current?.focus()
      })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const validateForm = () => {
        if (!formData.userName || !formData.password || !formData.rePassword) {
            toast.error("نمام فیلد ها را پر کنید.");
            return false;
        }
        if (formData.password !== formData.rePassword) {
            toast.error("رمز با تکرار آن برابر نیست!");
            return false;
        }
        if (formData.password.length < 8) {
            toast.error("رمز نباید کم تر از 8 کاراکتر باشد!");
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!validateForm()) {
            setIsSubmitting(false);
            return
        }
        try {
            const response = await fetch(`http://localhost:3001/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: formData.userName, password: formData.password }),
            });
            console.log(response)
            const data = await response.json();

            console.log(data);
            if (response.status === 201) {
                toast.success("ارسال با موفقیت انجام شد.")
                setFormData({
                    userName: "",
                    password: "",
                    rePassword: "",
                })
                router.push("/signin");
            }
            else if (response.status === 400) {
                toast.error("اطلاعات این کاربر وجود دارد!")
            }
        } catch (err) {
            console.log(err)
            toast.error("خطا در ارسال اطلاعات. لطفا دوباره تلاش کنید")
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <div className="flex flex-col w-full h-screen bg-white items-center justify-center">
                <div className=" flex items-center justify-center">
                    <form onSubmit={handleSubmit} className="w-[460px] h-[596px] border border-[#E4E4E4] rounded-[40px]  flex flex-col  items-center justify-around">
                        <p className="font-vazir-medium text-[24px] leading-[37.5px] text-[#282828] "> فرم ثبت نام </p>
                        <div className="flex flex-col gap-y-[15px]  items-center w-full justify-between">
                            <input type="text" id="input" name="userName" value={formData?.userName} onChange={handleChange} placeholder="نام کاربری" className=" font-vazir-medium pr-[15px] w-9/10 h-[53px] rounded-[15px] bg-[#F2F2F2] border-none text-[#282828] text-[16px] outline-none" ref={input} />
                            <input type="password" name="password" value={formData?.password} onChange={handleChange} placeholder="رمز عبور" className="font-vazir-medium pr-[15px] w-9/10 h-[53px] rounded-[15px] bg-[#F2F2F2] border-none text-[#282828] text-[16px] outline-none" />
                            <input type="password" name="rePassword" value={formData?.rePassword} onChange={handleChange} placeholder="تکرار رمز عبور" className="font-vazir-medium pr-[15px] w-9/10 h-[53px] rounded-[15px] bg-[#F2F2F2] border-none text-[#282828] text-[16px] outline-none" />
                        </div>
                        <button className="font-vazir-medium  w-9/10 h-[53px] rounded-[15px] bg-[#F21055] text-[#FFFFFF] border-none text-[16px]" type="submit" disabled={isSubmitting} >
                            {isSubmitting ? "در حال ارسال..." : " ثبت نام "}
                        </button>
                        <div className="w-full">
                            <Link href="/auth/signin" className="text-right no-underline font-vazir-normal text-[16px] text-[#F21055] pr-[15px]">
                                حساب کاربری دارید؟
                            </Link>
                        </div>
                    </form>
                </div>

            </div>
            <Toaster toastOptions={{className: "font-vazir-medium"}}/>
        </>
    )
}

export default Form
