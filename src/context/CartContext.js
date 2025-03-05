"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getCookie } from "@/utils/cookie";

// Create the cart context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart provider component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const accessToken = getCookie("accessToken");
  
  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!accessToken) return;
      
      try {
        const res = await fetch("http://localhost:3001/auth/check-login", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
        });

        if (!res.ok) {
          console.log("Failed to fetch user profile");
          return;
        }

        const data = await res.json();
        setUserProfile(data.user || null);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [accessToken]);
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('bookshop-cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          // Filter out any invalid items
          const validItems = parsedCart.filter(item => 
            item && typeof item === 'object' && item.id
          );
          setCartItems(validItems);
          updateCartCount(validItems);
        }
      }
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      localStorage.removeItem('bookshop-cart');
    }
  }, []);
  
  // Update localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('bookshop-cart', JSON.stringify(cartItems));
      updateCartCount(cartItems);
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);
  
  // Update cart count
  const updateCartCount = (items) => {
    if (!Array.isArray(items)) {
      setCartCount(0);
      return;
    }
    const count = items.reduce((total, item) => {
      const itemQuantity = item && typeof item === 'object' ? (item.quantity || 0) : 0;
      return total + itemQuantity;
    }, 0);
    setCartCount(count);
  };
  
  // Add item to cart
  const addToCart = (book, quantity = 1) => {
    // Validate book data
    if (!book || typeof book !== 'object' || !book.id) {
      toast.error('اطلاعات کتاب نامعتبر است');
      return;
    }
    
    // Check if this is the user's own book
    if (userProfile && book.sellerId && userProfile.id === book.sellerId) {
      toast.error('شما نمی‌توانید کتاب خود را خریداری کنید');
      return;
    }
    
    // Ensure quantity is a valid number
    const safeQuantity = Number(quantity) || 1;
    
    setCartItems(prevItems => {
      // Check if the book is already in the cart
      const existingItemIndex = prevItems.findIndex(item => item.id === book.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if book already exists in cart
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: (updatedItems[existingItemIndex].quantity || 0) + safeQuantity
        };
        return updatedItems;
      } else {
        // Add new book to cart with essential properties only
        const newItem = {
          id: book.id,
          title: book.title || 'عنوان نامشخص',
          author: book.author || 'نویسنده نامشخص',
          price: book.price || 0,
          image: book.image || null,
          sellerId: book.sellerId || null,
          quantity: safeQuantity
        };
        return [...prevItems, newItem];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (bookId) => {
    if (!bookId) return;
    
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
  };
  
  // Update item quantity
  const updateQuantity = (bookId, quantity) => {
    if (!bookId) return;
    
    // Ensure quantity is a valid number
    const safeQuantity = Number(quantity) || 0;
    
    if (safeQuantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === bookId ? { ...item, quantity: safeQuantity } : item
      )
    );
  };
  
  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Calculate total price
  const getTotalPrice = () => {
    if (!Array.isArray(cartItems)) return 0;
    
    return cartItems.reduce((total, item) => {
      const itemPrice = item && typeof item === 'object' ? (item.price || 0) : 0;
      const itemQuantity = item && typeof item === 'object' ? (item.quantity || 0) : 0;
      return total + (itemPrice * itemQuantity);
    }, 0);
  };
  
  // Context value
  const value = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    userProfile
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 