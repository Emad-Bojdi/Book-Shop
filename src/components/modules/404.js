import Image from "next/image"


const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-row justify-center items-center">
      <div classname="w-6/10 h-screen justify-between">
         <h2 className="font-vazir-bold text-center text-[40px]"> پیدا نشد! </h2>
         <p className="font-vazir-normal text-[28px]">
            اطلاعات مورد نظر یافت نشد . احتمالا اشتباهی آمده اید!!
         </p>
         <Image src="/images/404.png" className="relative right-[100px]"  alt="alt" width={400} height={400} /> 
      </div>
    </div>
  )
}

export default NotFound
