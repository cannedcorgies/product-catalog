import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import nestIcon from "../assets/icons/digitalNest-icon.jpg";

const Header = () => {
    const [isBagOpen, setIsBagOpen] = useState(false);

    const toggleBag = () => setIsBagOpen((prev) => !prev);

    const { cartItems, removeFromCart, updateQuantity} = useCart();

    return (
        // WRAPS BOTH HEADER AND DROPDOWN
        <header 
            className="top-0 bg-white shadow z-50"
            onMouseLeave={() => setIsBagOpen(false)}
        >
            <div className="max-w-9xl mx-auto px-6 py-10 flex justify-between items-center">
                {/* LEFT: LOGO */}
                <Link
                    to="/"
                    className="text-xl font-semibold hover:opacity-70 transition"
                >
                    <img src={nestIcon} alt="Digital Nest Logo" className="h-10 w-auto" />
                </Link>

                {/* RIGHT: SHOPPING CART AND COUNTER*/}
                <div className="relative">
                    <button onClick={toggleBag} aria-label="Toggle bag">
                        <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-black transition" />
                        {/* if at least one item, show counter above the cart */}
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-sky-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                {cartItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        )}
                    </button>

                    {/* DROPDOWN BAG CONTENT */}
                    {isBagOpen && (
                        <div className="absolute right-0 mt-4 w-80 bg-white shadow-lg border rounded-md p-4 space-y-4 z-50">
                            {/*<p className="text-sm text-gray-500 italic">
                                Nothing to see here...
                            </p>*/}
                            <h2 className="text-lg font-semibold">Your Cart</h2>

                            {/* UNORDERED LIST OF ITEMS */}
                            <ul className="divide-y">
                                {/* map list items */}
                                {cartItems.map((item, index) => (
                                    <li key={index} className="flex items-center gap-4 py-2">
                                        {/* DATA AND LINK */}
                                        <Link to={`/product/${item.id}`} className="flex items-center gap-4 flex-1 hover:opacity-80 transition">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-medium text-sm">{item.name}</p>
                                                <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                                            </div>
                                        </Link>
                                        {/* QUANTITY BUTTONS */}
                                        <div className="flex items-center space-x-1">
                                            {/* ADD 1 BUTTON */}
                                            <button
                                                className="px-2 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                                                onClick={() => updateQuantity(index, -1)}
                                            >
                                                –
                                            </button>
                                            {/* COUNTER */}
                                            <span className="px-2">{item.quantity}</span>
                                            {/* MINUS 1 BUTTON */}
                                            <button
                                                className="px-2 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                                                onClick={() => updateQuantity(index, 1)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* REMOVE BUTTON */}
                                        <button
                                            onClick={() => removeFromCart(index)}
                                            className="ml-2 text-red-500 hover:text-red-700 text-xs"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* TOTAL */}
                                {/* ADD 1 BUTTON */}
                            <div className="pt-4 border-t text-right font-semibold">
                                {/* iteratively add price times the quantity of that item */}
                                Total: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;