import Image from "next/image";
import Link from "next/link";

const BookCard = ({book}) => {
  console.log(book)
  const {title, author, price, image,id} = book;
  return (
    <div className="bg-[#FFFFFF] w-[231px] h-[240px] rounded-[12px] shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] ml-[10px]">
      <div className="flex flex-col justify-center p-[8px]">
        <Image src={image} alt="alt" width={70} height={70} unoptimized className="mb-[15px]"/>
      <Link  className="font-vazir-normal text-[25px] leading-[31.25px] text-[#282828] no-underline" href={`/books/${id}`}>
        {title}
        </Link>
        <p className="font-vazir-normal text-[18px] text-[#282828] ">{author}</p>
        <div className="w-full flex flex-row justify-between ml-[5px]">
          <p className="font-vazir-normal text-[14px] leading-[21.88px] text-[#282828]" dir="rtl">{price} هزار تومان </p>
          <button className="border-none outline-none bg-inherit ml-[10px] ">
            <Image src="/icons/shopping-cart.svg" alt="alt" width={22} height={22} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard;
