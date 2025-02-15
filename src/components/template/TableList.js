import Image from "next/image";


const TableList = () => {
    return (
        <div className="w-full flex justify-center pt-[25px]">
            <table className="w-4/5 ">
                <thead className="flex h-[60px] w-full bg-[#E4E4E4] rounded-t-[20px]">
                    <tr className="w-9/10 h-full flex flex-row items-center  ">
                        <th className="basis-1/4 font-vazir-medium text-[20px] leading-[31.25px] text-[#282828] "> نام کتاب </th>
                        <th className="basis-1/4  font-vazir-medium text-[20px] leading-[31.25px] text-[#282828] "> موجودی </th>
                        <th className="basis-1/4  font-vazir-medium text-[20px] leading-[31.25px] text-[#282828] "> قیمت </th>
                        <th className="basis-1/4  font-vazir-medium text-[20px] leading-[31.25px] text-[#282828] "> شناسه کالا </th>
                    </tr>
                </thead>
                <tbody className="flex w-full h-[40px] bg-[#FFFFFF]">
                    <tr className="w-[1150px] h-full flex flex-row items-center ">
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
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableList;
