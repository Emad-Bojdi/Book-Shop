import { getCookie } from '@/utils/cookie';
import Image from 'next/image';
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

const DeleteModal = ({ setShowDeleteConfirm, setBookToDelete, bookToDelete, onBookAdded }) => {

    const accessToken = getCookie("accessToken")
    const confirmDelete = async () => {
        if (!bookToDelete) return;
        console.log(accessToken)
        try {
            const res = await fetch(`http://localhost:3001/book/${bookToDelete.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            console.log(res)
            if (res.ok === true) {
                toast.success("کتاب مورد نظر با موفقیت حذف شد");
                // Close the confirmation dialog
                setShowDeleteConfirm(false);
                setBookToDelete(null);

                await onBookAdded();
                // Call the parent component's delete handler to refresh the book list

            } else {
                const errorData = await res.json();
                toast.error(`خطا در حذف کتاب: ${errorData.message || 'خطای نامشخص'}`);
            }
        } catch (error) {
            console.error("Error deleting book:", error);
            toast.error("خطا در حذف کتاب");
        }
    }
    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setBookToDelete(null);
    }
    return (
        <>


            <div className='fixed z-50 right-[0] bottom-[0] top-0 left-0 w-full h-full bg-[#333333]/40 backdrop-blur-[15px] flex justify-center items-center'>
                <div className={`w-[472px] h-[338px] rounded-[30px] bg-[#fff] flex flex-col items-center p-4 overflow-y-auto`}>
                    <Image src="icons/Close.svg" alt="Delete" width={97.83} height={96} className='mt-[25px] mb-[15px]' />
                    <h3 className="font-vazir-normal text-[20px] leading-[31.25px]  ">آیا از حذف این کتاب اطمینان دارید؟</h3>
                    <p className="font-vazir-normal text-[20px] mt-[-10px] text-gray-600">{bookToDelete?.title}</p>
                    <div className="flex justify-center space-x-[10px] mt-[30px]">
                        <button
                            onClick={confirmDelete}
                            className='w-[160px] h-[41px] rounded-[10px] bg-[#F21055] outline-none border-none font-vazir-bold text-[#fff] text-[16px] leading-[25px] cursor-pointer'
                        >
                            حذف
                        </button>
                        <button
                            onClick={cancelDelete}
                            className='w-[160px] h-[41px] rounded-[10px] bg-[#DFDFDF] outline-none border-none font-vazir-bold text-[#282828] text-[16px] leading-[25px] cursor-pointer'
                        >
                            انصراف
                        </button>
                    </div>
                </div>
            </div>

           
        </>
    )
}

export default DeleteModal;

// {
//     showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
//                 <h3 className="font-vazir-medium text-lg mb-4">آیا از حذف این کتاب اطمینان دارید؟</h3>
//                 <p className="mb-6 text-gray-600">{bookToDelete?.title}</p>
//                 <div className="flex justify-center space-x-4">
//                     <button
//                         onClick={confirmDelete}
//                         className="px-4 py-2 bg-red-500 text-white rounded-md"
//                     >
//                         بله، حذف شود
//                     </button>
//                     <button
//                         onClick={cancelDelete}
//                         className="px-4 py-2 bg-gray-200 rounded-md"
//                     >
//                         انصراف
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }
