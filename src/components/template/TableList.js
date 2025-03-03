import { getCookie } from "@/utils/cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DeleteModal from "../modules/DeleteModal";

const TableList = ({ books, onEditBook,onBookAdded }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

    // Log the books received by this component
    console.log("TableList received books:", books.map(book => book.id));
    const editHandler = (book) => {
        // Call the edit handler first
        onEditBook(book);
        console.log("Editing book:", book);
    }

    const deleteHandler = async (book) => {
        // Show confirmation dialog instead of deleting immediately
        setBookToDelete(book);
        setShowDeleteConfirm(true);
    }


    return (
        <>
            <div className="w-full flex justify-center pt-[25px]">
                <table className="w-4/5 ">
                    <thead className="flex h-[60px] w-full bg-[#E4E4E4] rounded-t-[20px]">
                        <tr className="w-9/10 h-full flex flex-row items-center  ">
                            <th className="basis-1/5 font-vazir-medium text-[20px] leading-[31.25px] text-[#282828] ">تصویر</th>
                            <th className="basis-1/5 font-vazir-medium text-[20px] leading-[31.25px] text-[#282828] ">نام کتاب</th>
                            <th className="basis-1/5 font-vazir-medium text-[20px] leading-[31.25px] text-[#282828] ">موجودی</th>
                            <th className="basis-1/5 font-vazir-medium text-[20px] leading-[31.25px] text-[#282828] ">قیمت</th>
                            <th className="basis-1/5 font-vazir-medium text-[20px] leading-[31.25px] text-[#282828] ">شناسه کالا</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={`${book.id}-${index}`} className={`flex w-full h-[90px] bg-[#FFFFFF] border-b border-[#f9f7f7] ${index === books.length - 1 ? 'rounded-b-[20px] ' : ""}`}>
                                <td className="basis-1/6 text-center font-vazir-normal text-[14px] leading-[21.88px] text-[#282828] flex justify-center items-center">
                                    {book.image ? (
                                        <Image
                                            src={book.image}
                                            alt={book.title}
                                            width={60}
                                            height={60}
                                            className="object-cover rounded-md"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-[60px] h-[60px] bg-gray-200 rounded-md flex items-center justify-center">
                                            <span className="text-xs text-gray-500">بدون تصویر</span>
                                        </div>
                                    )}
                                </td>
                                <td className="basis-1/5 text-center font-vazir-normal text-[14px] leading-[21.88px] text-[#282828] flex items-center justify-center">{book.title}</td>
                                <td className="basis-1/6 text-center font-vazir-normal text-[13px] leading-[20.31px] text-[#282828] flex items-center justify-center">{book.quantity}</td>
                                <td className="basis-1/5 text-center font-vazir-normal text-[13px] leading-[20.31px] text-[#282828] flex items-center justify-center">{book.price} هزار تومان</td>
                                <td className="basis-1/7 text-center font-vazir-normal text-[13px] leading-[20.31px] text-[#282828] flex items-center justify-center">{book.id}</td>
                                <td className="basis-1/10 flex flex-row justify-center items-center">
                                    <button className="border-none outline-none bg-inherit flex items-center justify-center cursor-pointer" onClick={() => editHandler(book)}>
                                        <Image src={"/icons/edit.svg"} alt="edit" width={20} height={20} />
                                    </button>
                                    <button className="border-none outline-none bg-inherit flex items-center justify-center cursor-pointer" onClick={() => deleteHandler(book)}>
                                        <Image src={"/icons/trash.svg"} alt="delete" width={20} height={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showDeleteConfirm && (<DeleteModal setBookToDelete={setBookToDelete} bookToDelete={bookToDelete}  setShowDeleteConfirm={setShowDeleteConfirm} onBookAdded={onBookAdded}/>)}
            {/* {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
                        <h3 className="font-vazir-medium text-lg mb-4">آیا از حذف این کتاب اطمینان دارید؟</h3>
                        <p className="mb-6 text-gray-600">{bookToDelete?.title}</p>
                        <div className="flex justify-center space-x-4">
                            <button 
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                                بله، حذف شود
                            </button>
                            <button 
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-200 rounded-md"
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    )
}

export default TableList;


{/* <tr className="w-[1150px] h-full flex flex-row items-center ">
                       <td className="basis-1/4 text-center font-vazir-normal text-[14px] leading-[21.88px] text-[#282828] ">جنایت و مکافات </td> 
                       <td className="basis-1/4 text-center font-vazir-normal text-[13px] leading-[20.31px] text-[#282828] "> 293 </td> 
                       <td className="basis-1/4 text-center font-vazir-normal text-[13px] leading-[20.31px] text-[#282828] "> 90 هزار تو</td> 
                       <td className="basis-1/4 text-center font-vazir-normal text-[13px] leading-[20.31px] text-[#282828] ">jhjfbhjfavbjkfnrfe</td> 
                       <td className="flex flex-row justify-self-end">
                            <button className="border-none outline-none bg-inherit flex items-center justify-center">
                                <Image src={"/icons/edit.svg"} alt="edit" width={20} height={20}/>
                            </button>
                            <button className="border-none outline-none bg-inherit flex items-center justify-center">
                                <Image src={"/icons/trash.svg"} alt="edit" width={20} height={20}/>
                            </button>
                        </td> 
                    </tr> */}