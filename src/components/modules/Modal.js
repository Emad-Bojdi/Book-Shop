import { useState } from "react"


const Modal = ({ onSort, setModal, text }) => {
    console.log(text)
    // const [title, setTitle] = useState("");
    // const [author, setAuthor] = useState("");
    // const [minPrice, setMinPrice] = useState("");
    // const [maxPrice, setMaxPrice] = useState("");
    const [add, setAdd] = useState({
        title: "",
        summary: "",
        author: "",
        price: "",
        quantity: "",
        image: null,
    });

    const addHandleChange = (e) => {
        const name = e.target.name;
        if (name === "images") {
            setAdd({ ...form, [name]: e.target.files[0] });
        } else {
            setAdd({ ...form, [name]: e.target.value });
        }
    };
    const [sort, setSort] = useState({
        title: "",
        author: "",
        minPrice: "",
        maxPrice: "",
    });
    const sortHandleChange = (e) => {
        const { value, name } = e.target;
        setSort(prev => ({
            ...prev,
            [name]: value
        }))
    }
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
            <div className={`w-[460px] ${text === "مرتب سازی" ? `h-[480px]` : `h-[620px]`} rounded-[30px] bg-[#fff] flex flex-col items-center gap-y-[15px]`}>
                <h2 className='font-vazir-medium text-[20px] leading-[31.25px] text-[#282828]'>{text === "مرتب سازی " ? " مرتب سازی بر اساس: " : "افزودن کتاب"}</h2>
                <div className='flex flex-col gap-y-[10px]'>
                    <div className="flex flex-col items-start gap-y-[3px]">
                        <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>نام کتاب </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={text === "مرتب سازی" ? sort.title : add.title}
                            onChange={text === "مرتب سازی" ? sortHandleChange : addHandleChange}
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
                            value={text === "مرتب سازی" ? sort.author : add.author}
                            onChange={text === "مرتب سازی" ? sortHandleChange : addHandleChange}
                            placeholder="نام نویسنده"
                            className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                        />
                    </div>
                    {
                        text === "مرتب سازی" && (<div className="flex flex-col items-start gap-y-[3px]">
                            <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>کمترین قیمت</label>
                            <input
                                type="text"
                                id="minPrice"
                                name="minPrice"
                                value={sort.minPrice}
                                onChange={sortHandleChange}
                                placeholder="کمترین قیمت"
                                className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                            />
                        </div>)
                    }
                    {
                        text === "مرتب سازی" && (<div className="flex flex-col items-start gap-y-[3px]">
                            <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>کمترین قیمت</label>
                            <input
                                type="text"
                                id="minPrice"
                                name="minPrice"
                                value={sort.minPrice}
                                onChange={sortHandleChange}
                                placeholder="کمترین قیمت"
                                className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                            />
                        </div>)
                    }
                    {text === "افزودن کتاب " && (
                        <div className="flex flex-col items-start gap-y-[3px]">
                            <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'> خلاصه ای از کتاب </label>
                            <input
                                type="text"
                                id="minPrice"
                                name="summary"
                                value={add.summary}
                                onChange={addHandleChange}
                                placeholder="خلاصه "
                                className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                            />
                        </div>
                    )}
                    {text === "افزودن کتاب " && (
                        <div className="flex flex-col items-start gap-y-[3px]">
                            <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'> قیمت </label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={add.price}
                                onChange={addHandleChange}
                                placeholder=" قیمت "
                                className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                            />
                        </div>
                    )}
                    {text === "افزودن کتاب " && (
                        <div className="flex flex-col items-start gap-y-[3px]">
                            <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'> تعداد </label>
                            <input
                                type="text"
                                id="minPrice"
                                name="quantity"
                                value={add.quantity}
                                onChange={addHandleChange}
                                placeholder=" تعداد "
                                className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                            />
                        </div>
                    )}
                    {text === "افزودن کتاب " && (
                        <div className="flex flex-col items-start gap-y-[3px]">
                            <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'> عکس </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept=".jpg, .png, .jpeg, .webp"
                                value={add.image}
                                onChange={addHandleChange}
                                placeholder="عکس"
                                className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
                            />
                        </div>
                    )}

                </div>
                <div className="w-full flex flex-row justify-center gap-x-[20px]">
                    <button className='w-[185px] h-[42px] bg-[#F21055] rounded-[10px] outline-none border-none font-vazir-medium text-[#fff] text-[14px] leading-[21.88px] ' onClick={handleSort}>
                        جست و جو
                    </button>
                    <button className='w-[185px] h-[42px] bg-[#DFDFDF] rounded-[10px] outline-none border-none font-vazir-medium text-[#282828] text-[14px] leading-[21.88px] cursor-pointer' onClick={() => setModal(false)}>
                        انصراف
                    </button>
                </div>
            </div>
        </div>
    )


}

export default Modal;


// return (
//     <div className='fixed z-50 right-[0] bottom-[0] top-0 left-0 w-full h-full bg-[#333333]/40 backdrop-blur-[15px] flex justify-center items-center'>
//         <div className='w-[460px] h-[480px] rounded-[30px] bg-[#fff] flex flex-col items-center gap-y-[15px]'>
//             <h2 className='font-vazir-medium text-[20px] leading-[31.25px] text-[#282828]'>دسته بندی بر اساس :</h2>
//             <div className='flex flex-col gap-y-[10px]'>
//                 <div className="flex flex-col items-start gap-y-[3px]">
//                     <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>نام کتاب </label>
//                     <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={sort.title}
//                         onChange={sortHandleChange}
//                         placeholder="نام کتاب"
//                         className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
//                     />
//                 </div>
//                 <div className="flex flex-col items-start gap-y-[3px]">
//                     <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>نام نویسنده</label>
//                     <input
//                         type="text"
//                         id="author"
//                         name="author"
//                         value={sort.author}
//                         onChange={sortHandleChange}
//                         placeholder="نام نویسنده"
//                         className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
//                     />
//                 </div>
//                 <div className="flex flex-col items-start gap-y-[3px]">
//                     <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>کمترین قیمت</label>
//                     <input
//                         type="text"
//                         id="minPrice"
//                         name="minPrice"
//                         value={sort.minPrice}
//                         onChange={sortHandleChange}
//                         placeholder="کمترین قیمت"
//                         className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
//                     />
//                 </div>
//                 <div className="flex flex-col items-start gap-y-[3px]">
//                     <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>بیشترین قیمت</label>
//                     <input
//                         type="text"
//                         id="maxPrice"
//                         name="maxPrice"
//                         value={sort.maxPrice}
//                         onChange={sortHandleChange}
//                         placeholder="بیشترین قیمت"
//                         className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] placeholder:text-[#8D8D8D] pr-[8px]'
//                     />
//                 </div>

//             </div>
//             <div className="w-full flex flex-row justify-center gap-x-[20px]">
//                 <button className='w-[185px] h-[42px] bg-[#F21055] rounded-[10px] outline-none border-none font-vazir-medium text-[#fff] text-[14px] leading-[21.88px] ' onClick={handleSort}>
//                     جست و جو
//                 </button>
//                 <button className='w-[185px] h-[42px] bg-[#DFDFDF] rounded-[10px] outline-none border-none font-vazir-medium text-[#282828] text-[14px] leading-[21.88px] cursor-pointer' onClick={() => setModal(false)}>
//                     انصراف
//                 </button>
//             </div>
//         </div>
//     </div>
// )
