import { useEffect, useMemo, useState } from "react"
import { db } from "../data/db"


export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    
      const [data] = useState(db)
      const [cart, setCart] = useState(initialCart)
    
      const MAX_ITEM = 5
      const MIN_ITEM = 1
    
    
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))   
      }, [cart])
      
    
      function addToCart(item) {
        const itemExits = cart.findIndex(guitar => guitar.id === item.id)
        if(itemExits >= 0 ){
          if(cart[itemExits].quantity >= MAX_ITEM) return
          const upDateCart = [...cart]
          upDateCart[itemExits].quantity++
          setCart(upDateCart)
        } else {
          item.quantity = 1
          setCart( [...cart, item])
        }
      }
    
      function removeFromCart(id) {
        setCart( prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
    
      function increaseQuantity(id) {
        const updatedCart = cart.map(item => {
          if(item.id === id && item.quantity < MAX_ITEM ){
            return{
              ...item,
              quantity: item.quantity + 1
            }
          
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function decreQuantity(id) {
        const updateCart = cart.map(item => {
          if(item.id === id && item.quantity > MIN_ITEM){
            return{
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        })
        setCart(updateCart)
      }
    
      function clearCart(e) {
        setCart([])
      }

       // ** State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

    

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

