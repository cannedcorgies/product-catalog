// we're going for Apple Store-vibe
//  - large
//  - plain
//  - minimal items on the screen
//  - minimal descriptions
//  - it's all about readability
//  - avoid oversaturation
//
// fern vocab:
//  - grid          we're gonna be working with a grid
//  - grid-cols-1   columns on mobile
//  - sm:/md/xl:grid-cols...        number of columns on different screen sizes
//  - gap-6         spacing between items

import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import testImage from "../assets/images/kitty.jpg";

const ProductCatalog = () => {

    /////FILTERS
    const [allProducts, setAllProducts] = useState([]);     // unfiltered base
    const [visibleProducts, setVisibleProducts] = useState([]); // what we show
    const [categories, setCategories] = useState([]);        // unique categories
    const [filters, setFilters] = useState([]);              // selected filters
    const [sortOption, setSortOption] = useState("az");      // sort mode

    useEffect(() => {
        fetch("https://cart-api.alexrodriguez.workers.dev/products")                    // fetch from url...
            .then((res) => res.json())                                                  // store data as a jsonm...
            .then((data) => {                                                           // set products for grid...
                setAllProducts(data);
                setVisibleProducts(data);       // default -- no filters
        
                // get the unique categories
                const UniqueCategories = [...new Set(data.map((p) => p.category))];     // set up filters...
                setCategories(UniqueCategories);

            })
            .catch((error) => console.error("ERROR FETCHING THE PRODUCTS:", error))     // ERROR DETECTION

    }, []);

    /////FILTERING AND SORTING
    useEffect(() => {

        let filtered = [...allProducts];

        // applying category filters
        if (filters.length > 0) {
            filtered = filtered.filter((product) => filters.includes(product.category));
        };

        // applying sorting
        if (sortOption === "az") {                                  // alphabetically
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "price-asc") {                    // lowest to highest
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-desc") {                   // highest to lowest
            filtered.sort((a, b) => b.price - a.price);
        }

        // visibility
        setVisibleProducts(filtered);
    }, [filters, sortOption, allProducts]);

    /////TOGGLE FILTER
    const toggleCategory = (category) => {
        setFilters((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    }

    const [showMobileFilters, setShowMobileFilters] = useState(false);


    /////GENERATE THE GRID
    
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-row">
                {/* MOBILE FILTERS BUTTON */}
                <div className="flex-row sm:hidden sticky top-0 z-40 shadow-lg">
                    <div className="bg-white pb-4">
                        <button
                            onClick={() => setShowMobileFilters(prev => !prev)}
                            className="w-full pt-4 pl-4 text-lg text-left text-gray-400 font-medium rounded"
                        >
                            {showMobileFilters ? "Close" : "Filters"}
                        </button>
                    </div>
                    {showMobileFilters && (
                        <div className="bg-white z-50 p-6 overflow-y-auto sm:hidden">
                            <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Filter Products</h2>
                            </div>
                            {categories.map((category) => (
                            <label key={category} className="flex items-center gap-2 mb-2 cursor-pointer">
                                <input
                                type="checkbox"
                                checked={filters.includes(category)}
                                onChange={() => toggleCategory(category)}
                                className="mr-2"
                                />
                                {category}
                            </label>
                            ))}
                            <div className="mt-4">
                            <select
                                className="border rounded px-4 py-2 w-full text-sm"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="az">Sort: A–Z</option>
                                <option value="price-asc">Price: Low → High</option>
                                <option value="price-desc">Price: High → Low</option>
                            </select>
                            </div>
                        </div>
                    )}
                </div>
                {/* CONTENT AREA: SIDEBAR+GRID */}
                <div className="flex flex-grow">
                    {/* FILTER SIDEBAR */}
                    <div className="hidden sm:block w-80 bg-white p-4 min-h-screen shadow-md border-r border-gray-300 sticky top-0 h-screen">
                        <div className="pl-20">
                        <h2 className="text-lg font-semibold mb-2">Product Type</h2>
                        {categories.map((category) => (
                            <label key={category} className="flex items-center gap-2 mb-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.includes(category)}
                                onChange={() => toggleCategory(category)}
                                className="mr-2"
                            />
                            {category}
                            </label>
                        ))}
                        <div className="flex mb-4">
                            <select
                            className="border rounded px-4 py-1 text-sm"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            >
                            <option value="az">Sort: A–Z</option>
                            <option value="price-asc">Price: Low → High</option>
                            <option value="price-desc">Price: High → Low</option>
                            </select>
                        </div>
                        </div>
                    </div>

                    {/* PRODUCT GRID */}
                    <div className="px-4 sm:px-12 lg:px-20 xl:px-40 py-10 flex-grow w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-80">
                            {visibleProducts.map((product) => (
                                <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                />
                            ))}
                        </div>

                        {/* FOOTER CREDITS */}
                        <div className="mt-20 px-8 pt-10 text-center text-gray-500 text-sm">
                            <p className="mb-2">Made by Fernando Jose Alcazar, 2025</p>
                            <div className="flex justify-center gap-4">
                                <a
                                href="https://www.linkedin.com/in/alcazarfjose"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue-400 hover:text-blue-600 transition"
                                >
                                LinkedIn
                                </a>
                                <a
                                href="https://linktr.ee/falcazar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue-400 hover:text-blue-600 transition"
                                >
                                Linktree
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCatalog;