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

    /////GENERATE THE GRID
    
    return (

        <div className="flex items-stretch">
            {/* FILTER SIDEBAR */}
            <div className="w-48 bg-white p-4 min-h-screen shadow-md border-gray-300">
                <h2 className="text-lg font-semibold mb-2">Filter by Category</h2>
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

             {/* PRODUCT GRID */}
            <div className="p-40">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-80">
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
            </div>
        </div>
    );
};

export default ProductCatalog;