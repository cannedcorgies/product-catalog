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

    /////POPULATE GRID
    const [products, setProducts] = useState([]);       // empty products array

    // when the component shows up...
    useEffect(() => {
        fetch("https://cart-api.alexrodriguez.workers.dev/products")                // fetch from url...
        .then((response) => response.json())                                        // store data as a json...
        .then((data) => setProducts(data))                                          // updates...
        .catch((error) => console.error("ERROR FETCHING THE PRODUCTS:", error));    // ERROR CATCHER
    }, []);

    /////GENERATE THE GRID
    return (
        <div className="p-6">
            {/*UPPER MARGIN*/}
            <h1 className="text-2xl font-semibold mb-6"></h1>
            {/*PRODUCT GRID*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
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
    );
};

export default ProductCatalog;