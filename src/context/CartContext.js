import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const index = prev.findIndex((item) => item.id === product.id);
            // if cart's not empty...
            if (index !== -1) {
                const updated = [...prev]
                updated[index].quantity += 1;   // search for index, and add 1 to quantity
                return updated;
            }
            return [...prev, {...product, quantity:1}]; // otherwise, default to 1
        });
    };

    // update count per item
    const updateQuantity = (index, delta) => {
        setCartItems((prev) => {
            const updated = [...prev];
            updated[index].quantity = Math.max(1, updated[index].quantity + delta); // cannot go below 1
            return updated;
        });
    };

    // remove by index
    const removeFromCart = (index) => {
        if (index >= 0) {
            const updatedItems = [...cartItems.slice(0, index), ...cartItems.slice(index + 1)]; // cut it out!
            console.log(updatedItems);
            setCartItems(updatedItems);
        }
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};