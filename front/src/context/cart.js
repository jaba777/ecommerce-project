import { useState, createContext, useContext,useEffect } from 'react';

const CartContext=createContext();


export const CartProvider=({children})=>{
    const [cart,setCart]=useState([]);

    //default axios

    useEffect(()=> {
        let existCartItem = localStorage.getItem('cart');
        if(existCartItem) setCart(JSON.parse(existCartItem));
    },[])

    return(
        <CartContext.Provider value={{cart,setCart}}>
            {children}
        </CartContext.Provider>
    )

}


export const useCart=() => useContext(CartContext);