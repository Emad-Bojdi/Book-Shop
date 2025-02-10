import { useState } from "react"


const Modal = ({ onSort, setModal }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSort = () => {
        const queryParams = {};
        if (title) queryParams.title = title;
        if (author) queryParams.author = author;
        if (minPrice) queryParams.minPrice = minPrice;
        if (maxPrice) queryParams.maxPrice = maxPrice;
        
        onSort(queryParams);
    }

    return (
        <div className='fixed z-50 right-[0] bottom-[0] top-0 left-0 w-full h-full bg-[#333333]/40 backdrop-blur-[15px] flex justify-center items-center'>
            <div className='w-[460px] h-[480px] rounded-[30px] bg-[#fff] flex flex-col items-center gap-y-[15px]'>
                <h2 className='font-vazir-medium text-[20px] leading-[31.25px] text-[#282828]'>دسته بندی بر اساس :</h2>
                <div className='flex flex-col gap-y-[10px]'>
                    <div className="flex flex-col items-start gap-y-[3px]">
                        <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>نام کتاب </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="نام کتاب"
                            className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                        />
                    </div>
                    <div className="flex flex-col items-start gap-y-[3px]">
                        <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>نام نویسنده</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="نام نویسنده"
                             className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                        />
                    </div>
                    <div className="flex flex-col items-start gap-y-[3px]">
                        <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>کمترین قیمت</label>
                        <input
                            type="text"
                            id="minPrice"
                            name="minPrice"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="کمترین قیمت"
                             className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                        />
                    </div>
                    <div className="flex flex-col items-start gap-y-[3px]">
                        <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>بیشترین قیمت</label>
                        <input
                            type="text"
                            id="maxPrice"
                            name="maxPrice"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="بیشترین قیمت"
                             className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                        />
                    </div>

                </div>
                <div className="w-full flex flex-row justify-center gap-x-[20px]">
                    <button className='w-[185px] h-[42px] bg-[#F21055] rounded-[10px] outline-none border-none font-vazir-medium text-[#fff] text-[14px] leading-[21.88px] ' onClick={handleSort}>
                        جست و جو
                    </button>
                    <button  className='w-[185px] h-[42px] bg-[#DFDFDF] rounded-[10px] outline-none border-none font-vazir-medium text-[#282828] text-[14px] leading-[21.88px] '  onClick={() => setModal(false)}>
                        انصراف
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
