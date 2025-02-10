import Image from "next/image"


const NotFound = () => {
  return (
    <div className="w-full flex flex-row justify-center">
      <div classname="w-6/10">
         <h2> پیدا نشد! </h2>
         <p className="">
            اطلاعات مورد نظر یافت نشد . احتمالا اشتباهی آمده اید!!
         </p>
         <Image src="src" alt="alt" width={40} height={40} /> 
      </div>
    </div>
  )
}

export default NotFound
