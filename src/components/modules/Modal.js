import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast'
import { getCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Modal = ({ onSort, setModal, text, onBookAdded, bookToEdit }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const accessToken = getCookie("accessToken");
    const [formData, setFormData] = useState({
        title: bookToEdit?.title || '',
        author: bookToEdit?.author || "",
        summary: bookToEdit?.summary || "",
        price: bookToEdit?.price || '',
        quantity: bookToEdit?.quantity || '',
        image: null,
        existingImage: bookToEdit?.image || null
    });

    const [previewImage, setPreviewImage] = useState(
        bookToEdit?.image ? bookToEdit.image.replace(/\\/g, '/') : null
    );

    const [sort, setSort] = useState({
        title: "",
        author: "",
        minPrice: "",
        maxPrice: "",
    });

    const addHandleChange = (e) => {
        const name = e.target.name;
        if (name === "image") {
            const file = e.target.files[0];
            if (file) {
                console.log("New image selected:", file.name);
                // When selecting a new image, update the form data
                setFormData({ 
                    ...formData, 
                    image: file
                });
                // Create a preview URL for the selected image
                const previewURL = URL.createObjectURL(file);
                setPreviewImage(previewURL);
                console.log("Preview image updated:", previewURL);
            }
        } else {
            setFormData({ ...formData, [name]: e.target.value });
        }
    };

    const sortHandleChange = (e) => {
        const { value, name } = e.target;
        setSort(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSort = () => {
        const queryParams = {};
        if (sort.title) queryParams.title = sort.title;
        if (sort.author) queryParams.author = sort.author;
        if (sort.minPrice) queryParams.minPrice = sort.minPrice;
        if (sort.maxPrice) queryParams.maxPrice = sort.maxPrice;

        onSort(queryParams);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Check if we're editing or adding a new book
            const isEditing = !!bookToEdit;
            
            // Use the correct API endpoint based on the operation
            const url = isEditing
                ? `http://localhost:3001/book/${bookToEdit.id}`
                : "http://localhost:3001/book";

            const method = isEditing ? "PUT" : "POST";

            // For debugging
            console.log("Book being edited:", bookToEdit);
            console.log("Sending request to:", url);
            console.log("Method:", method);
            
            // Always use FormData for both new books and edits
            const requestBody = new FormData();
            requestBody.append('title', formData.title);
            requestBody.append('author', formData.author);
            requestBody.append('summary', formData.summary);
            requestBody.append('price', formData.price);
            requestBody.append('quantity', formData.quantity);
            
            // If we have a new image file, append it
            if (formData.image instanceof File) {
                requestBody.append('image', formData.image);
                console.log("Including new image in request");
            }

            // Log the FormData contents for debugging
            console.log("Form data entries:");
            for (let pair of requestBody.entries()) {
                console.log(pair[0] + ': ' + (pair[1] instanceof File ? 'File object' : pair[1]));
            }

            const res = await fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                body: requestBody
            });

            // Log the response for debugging
            console.log("Response status:", res.status);
            
            let responseData;
            try {
                const responseText = await res.text();
                console.log("Response text:", responseText);
                if (responseText) {
                    responseData = JSON.parse(responseText);
                }
            } catch (e) {
                console.error("Error parsing response:", e);
            }
            
            if (res.ok) {
                toast.success(isEditing ? "کتاب با موفقیت ویرایش شد" : "کتاب با موفقیت اضافه شد");
                // Force a refresh of the books list
                onBookAdded();
                setModal(false);
            } else {
                const errorMessage = responseData?.message || 'Failed to save book';
                throw new Error(errorMessage);
            }
        } catch (error) {
            toast.error(error.message || "خطا در عملیات");
            console.error("Error saving book:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='fixed z-50 right-[0] bottom-[0] top-0 left-0 w-full h-full bg-[#333333]/40 backdrop-blur-[15px] flex justify-center items-center'>
            <div className={`w-[460px] ${text === "مرتب سازی" ? 'h-[480px]' : 'h-[720px]'} rounded-[30px] bg-[#fff] flex flex-col items-center gap-y-[15px] p-4 overflow-y-auto`}>
                <h2 className='font-vazir-medium text-[20px] leading-[31.25px] text-[#282828]'>
                    {text === "مرتب سازی" ? "مرتب سازی بر اساس" : bookToEdit ? "ویرایش کتاب" : "افزودن کتاب"}
                </h2>
                <div className='flex flex-col gap-y-[10px]'>
                    {/* Title input */}
                    <div className="flex flex-col items-start gap-y-[3px]">
                        <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>نام کتاب</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={text === "مرتب سازی" ? sort.title : formData.title}
                            onChange={text === "مرتب سازی" ? sortHandleChange : addHandleChange}
                            placeholder="نام کتاب"
                            className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                        />
                    </div>

                    {/* Author input */}
                    <div className="flex flex-col items-start gap-y-[3px]">
                        <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>نام نویسنده</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={text === "مرتب سازی" ? sort.author : formData.author}
                            onChange={text === "مرتب سازی" ? sortHandleChange : addHandleChange}
                            placeholder="نام نویسنده"
                            className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                        />
                    </div>

                    {text !== "مرتب سازی" && (
                        <>
                            {/* Summary input */}
                            <div className="flex flex-col items-start gap-y-[3px]">
                                <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>خلاصه کتاب</label>
                                <input
                                    type="text"
                                    name="summary"
                                    value={formData.summary}
                                    onChange={addHandleChange}
                                    placeholder="خلاصه کتاب"
                                    className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                                />
                            </div>

                            {/* Price input */}
                            <div className="flex flex-col items-start gap-y-[3px]">
                                <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>قیمت</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={addHandleChange}
                                    placeholder="قیمت"
                                    className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                                />
                            </div>

                            {/* Quantity input */}
                            <div className="flex flex-col items-start gap-y-[3px]">
                                <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>تعداد</label>
                                <input
                                    type="text"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={addHandleChange}
                                    placeholder="تعداد"
                                    className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                                />
                            </div>

                            {/* Image input */}
                            <div className="flex flex-col items-start gap-y-[3px] w-full">
                                <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>عکس</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={addHandleChange}
                                    className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                                />
                                {previewImage && (
                                    <div className="mt-2">
                                        {typeof previewImage === 'string' && previewImage.startsWith('http') ? (
                                            // For images from server
                                            <Image
                                                src={previewImage}
                                                alt="Preview"
                                                width={200}
                                                height={200}
                                                className="object-cover rounded-md"
                                                unoptimized
                                            />
                                        ) : (
                                            // For locally selected images
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                width={200}
                                                height={200}
                                                className="object-cover rounded-md"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <div className="w-full flex flex-row justify-center gap-x-[20px] mt-4">
                    <button
                        className={`w-[185px] h-[42px] bg-[#F21055] rounded-[10px] outline-none border-none font-vazir-medium text-[#fff] text-[14px] leading-[21.88px] cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
                        disabled={isLoading}
                        onClick={text === "مرتب سازی" ? handleSort : handleSubmit}
                    >
                        {isLoading ? "در حال پردازش..." : text === "مرتب سازی" ? "جست و جو" : bookToEdit ? "ویرایش کتاب" : "افزودن کتاب"}
                    </button>
                    <button
                        className='w-[185px] h-[42px] bg-[#DFDFDF] rounded-[10px] outline-none border-none font-vazir-medium text-[#282828] text-[14px] leading-[21.88px] cursor-pointer'
                        onClick={() => setModal(false)}
                        disabled={isLoading}
                    >
                        انصراف
                    </button>
                </div>
            </div>
            <Toaster toastOptions={{ className: "font-vazir-medium" }} />
        </div>
    );
}

export default Modal;
