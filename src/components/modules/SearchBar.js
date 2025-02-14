import Image from "next/image"


const SearchBar = () => {
    return (
        <div className="flex flex-row justify-center">
            <div className="w-4/5 border border-[#E4E4E4] rounded-[16px] h-[60px] bg-[#FFFFFF]  flex items-center ">
                <button className="border-none outline-none bg-inherit cursor-pointer mr-[5px] ml-[-4px] ">
                    <Image src={"/icons/search-normal.svg"} alt="Search" width={24} height={24} className="" />
                </button>
                <input className="basis-9/10 outline-none border-none  m-[5px] text-[16px] font-vazir-normal leading-[25px] placeholder:text-[#E4E4E4]" placeholder="جستجو کالا" />
                <div className="basis-1/6 h-[68px] flex items-center">
                    <div className="w-full p-[5px] h-[52px] border-r border-[#E4E4E4] flex flex-row space-x-[10px]">
                        <div className="">
                            <div className="border w-[46px] h-[46px] rounded-full flex justify-center items-center text-[25px]">
                                U
                            </div>
                        </div>
                        <div className="h-[22px] flex flex-col  ">
                            <span className="h-[10px] text-[16px] font-vazir-normal text-[#282828] ">عماد بجدی</span>
                            <p className="h-auto text-[14px] font-vazir-thin text-[#282828] ">کاربر</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
