import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const Header = () => {
    const [isBagOpen, setIsBagOpen] = useState(false);

    const toggleBag = () => setIsBagOpen((prev) => !prev);

    const { cartItems, removeFromCart } = useCart();

    return (
        // WRAPS BOTH HEADER AND DROPDOWN
        <header 
            className="sticky top-0 bg-white shadow z-50"
            onMouseLeave={() => setIsBagOpen(false)}
        >
            <div className="max-w-9xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* LEFT: LOGO */}
                <Link
                    to="/"
                    className="text-xl font-semibold hover:opacity-70 transition"
                >
                    Digital Nest Store
                </Link>

                {/* RIGHT: SHOPPING CART */}
                <div className="relative">
                    <button onClick={toggleBag} aria-label="Toggle bag">
                        <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-black transition" />
                    </button>

                    {/* DROPDOWN BAG CONTENT */}
                    {isBagOpen && (
                        <div className="absolute right-0 mt-4 w-80 bg-white shadow-lg border rounded-md p-4 space-y-4">
                            {/*<p className="text-sm text-gray-500 italic">
                                Nothing to see here...
                            </p>*/}
                            <h2 className="text-lg font-semibold">Your Cart</h2>

                            {/* UNORDERED LIST OF ITEMS */}
                            <ul className="divide-y">
                                {/* map list items */}
                                {cartItems.map((item, index) => (
                                    <li key={index} className="flex items-center gap-4 py-2">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{item.name}</p>
                                            <p className="text gray-500 text-sm">${item.price.toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(index)}
                                            className="text-red-500 hover:text-red-700 text-xs"
                                            >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* TOTAL */}
                            <div className="pt-4 border-t text-right font-semibold">
                                Total: ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;