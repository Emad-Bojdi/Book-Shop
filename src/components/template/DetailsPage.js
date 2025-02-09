import Image from "next/image";


const DetailsPage = () => {
    return (
        <div className="bg-[#FCFCFC] w-full h-screen flex justify-center items-center">
            <div className="p-[10px] flex flex-row justify-center">
                <div></div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col items-start">
                        <button className="bg-[#F21055] rounded-[12px] text-center font-vazir-normal text-[36px] leading-[56.25px] ">
                            <span className="font-vazir-normal ">خرید</span>
                            <Image src="/icons/shopping-cart.svg" alt="alt" width={35} height={35} />
                        </button>
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex flex-row justify-between">
                            <p className=""></p>
                            <span className=""></span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className=""></p>
                            <span className=""></span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className=""></p>
                            <span className=""></span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className=""></p>
                            <span className=""></span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className=""></p>
                            <span className=""></span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className=""></p>
                            <span className=""></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsPage;
