"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const CartIcon = () => {
  const { cartCount } = useCart();
  
  return (
    <Link href="/cart" className="relative inline-block">
      <div className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <Image 
          src="/icons/shopping-cart.svg" 
          alt="Shopping Cart" 
          width={24} 
          height={24} 
        />
        
        {cartCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-[#F21055] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount > 99 ? '99+' : cartCount}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;