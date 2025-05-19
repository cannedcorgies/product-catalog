// we're going for Apple Store-vibe
//  - large
//  - plain
//  - minimal items on the screen
//  - minimal descriptions
//  - it's all about readability
//  - avoid oversaturation

import React from "react";
import ProductCard from "../components/ProductCard";
import testImage from "../assets/images/kitty.jpg";

const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "99.99",
    image: testImage,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "199.99",
    image: testImage,
  },
  {
    id: 3,
    name: "Portable Speaker",
    price: "59.99",
    image: testImage,
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: "49.99",
    image: testImage,
  },
  {
    id: 5,
    name: "Gaming Mouse",
    price: "49.99",
    image: testImage,
  },

];

// fern vocab:
//  - grid          we're gonna be working with a grid
//  - grid-cols-1   columns on mobile
//  - sm:/md/xl:grid-cols...        number of columns on different screen sizes
//  - gap-6         spacing between items

const ProductCatalog = () => {

    return (
        <div className="p-6">
            <h1 className="text-2x1 font-semibold mb-6">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockProducts.map((product) => (
                    <ProductCard
                    key={product.id}
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