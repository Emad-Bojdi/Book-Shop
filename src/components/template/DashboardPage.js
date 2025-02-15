import React from 'react'
import SearchBar from '../modules/SearchBar'
import Image from 'next/image'
import TableList from './TableList'

const DashboardPage = () => {
  return (
    <div className='bg-[#F7F8F8] w-full h-screen'>
      <SearchBar />
      <div className='flex justify-center pt-[30px]'>
        <div className='w-4/5 flex justify-between items-center'>
          <div className='flex items-center flex-row space-x-[5px]'>
            <Image src={"icons/setting-3.svg"} alt='manage' width={30} height={30} />
            <span className='font-vazir-normal text-[24px] leading-[37.5px] text-[#282828] '>مدیریت کتاب ها</span>
          </div>
          <div>
            <button className='w-[132px] h-[45px] flex justify-center border-none  items-center rounded-[10px] bg-[#F21055] text-[#FFFFFF] font-vazir-normal leading-[25px]  '>
              افزودن کتاب
            </button>
          </div>
        </div>
      </div>
      <TableList/>
    </div>
  )
}

export default DashboardPage
