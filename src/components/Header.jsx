import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Header = () => {
    const [isBagOpen, setIsBagOpen] = useState(false);

    const toggleBag = () => setIsBagOpen((prev) => !prev);

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
                        <div className="absolute right-0 mt-4 w-80 bg-white shadow-lg border rounded-md p-4">
                            <p className="text-sm text-gray-500 italic">
                                Nothing to see here...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;