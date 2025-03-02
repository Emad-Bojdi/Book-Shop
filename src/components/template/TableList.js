import Image from "next/image";
import { useRouter } from "next/navigation";

const TableList = ({ books, onEditBook }) => {
    const router = useRouter();
    console.log(books);

    const editHandler = (book) => {
        router.push(`/dashboard/edit/${book.id}`);
        onEditBook(book);
    }
    return (
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
                {books.map(book => (
                    <tbody className="flex w-full h-[80px] bg-[#FFFFFF]" key={book.id}>
                        <tr className="w-[1150px] h-full flex flex-row items-center " >
                            <td className="basis-1/5 text-center font-vazir-normal text-[14px] leading-[21.88px] text-[#282828] flex justify-center">
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
                            <td className="basis-1/5 text-center font-vazir-normal text-[14px] leading-[21.88px] text-[#282828] ">{book.title}</td>
                            <td className="basis-1/5 text-center font-vazir-normal text-[13px] leading-[20.31px] text-[#282828] ">{book.quantity}</td>
                            <td className="basis-1/5 text-center font-vazir-normal text-[13px] leading-[20.31px] text-[#282828] ">{book.price} هزار تومان</td>
                            <td className="basis-1/5 text-center font-vazir-normal text-[13px] leading-[20.31px] text-[#282828] ">{book.id}</td>
                            <td className="flex flex-row justify-self-end">
                                <button className="border-none outline-none bg-inherit flex items-center justify-center cursor-pointer" onClick={() => editHandler(book)}>
                                    <Image src={"/icons/edit.svg"} alt="edit" width={20} height={20} />
                                </button>
                                <button className="border-none outline-none bg-inherit flex items-center justify-center cursor-pointer">
                                    <Image src={"/icons/trash.svg"} alt="delete" width={20} height={20} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
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