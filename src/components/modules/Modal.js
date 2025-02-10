import React from 'react'

const Modal = ({ setModal }) => {
    return (
        <div className='fixed z-50 right-[0] bottom-[0] top-0 left-0 w-full h-full bg-[#333333]/40 backdrop-blur-[15px] flex justify-center items-center'>
            <div className='w-[460px] h-[480px] rounded-[30px] bg-[#fff] flex flex-col items-center gap-y-[15px]'>
                <h2 className='font-vazir-medium text-[20px] leading-[31.25px] text-[#282828]'>دسته بندی بر اساس :</h2>
                <div className='flex flex-col gap-y-[10px]'>
                    <div className="flex flex-col items-start gap-y-[3px]">
                        <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>نام کتاب </label>
                        <input
                            type="text"
                            id="id"
                            name="name"
                            placeholder="نام کتاب"
                            className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] text-[#8D8D8D] pr-[8px]'
                        />
                    </div>
                    <div className="flex flex-col items-start gap-y-[3px]">
                        <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>نام نویسنده</label>
                        <input
                            type="text"
                            id="id"
                            name="name"
                            placeholder="نام نویسنده"
                             className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] text-[#8D8D8D] pr-[8px]'
                        />
                    </div>
                    <div className="flex flex-col items-start gap-y-[3px]">
                        <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>کمترین قیمت</label>
                        <input
                            type="text"
                            id="id"
                            name="name"
                            placeholder="کمترین قیمت"
                             className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] text-[#8D8D8D] pr-[8px]'
                        />
                    </div>
                    <div className="flex flex-col items-start gap-y-[3px]">
                        <label className='font-vazir-medium text-[14px] leading-[21.88px] text-[#282828]'>بیشترین قیمت</label>
                        <input
                            type="text"
                            id="id"
                            name="name"
                            placeholder="بیشترین قیمت"
                             className='w-[389px] h-[42px] rounded-[8px] bg-[#F2F2F2] outline-none border-none font-vazir-normal text-[14px] leading-[21.88px] text-[#8D8D8D] pr-[8px]'
                        />
                    </div>

                </div>
                <div className="w-full flex flex-row justify-center gap-x-[20px]">
                    <button className='w-[185px] h-[42px] bg-[#F21055] rounded-[10px] outline-none border-none font-vazir-medium text-[#fff] text-[14px] leading-[21.88px] '>
                        جست و جو
                    </button>
                    <button  className='w-[185px] h-[42px] bg-[#DFDFDF] rounded-[10px] outline-none border-none font-vazir-medium text-[#282828] text-[14px] leading-[21.88px] ' onClick={() => {setModal(false)}}>
                        انصراف
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
