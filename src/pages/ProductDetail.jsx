// apple design:
//  - ttwo columns of info:
//      - left:
//          - first name, big and bold
//          - price, small and muted underneath
//          - description
//          - finally, add to bag button at the bottom
//      - right:
//          - singularly, the photo - large and unintrusive
//          - actually, seems to be about the same height as whole info in left

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext"; 

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`https://cart-api.alexrodriguez.workers.dev/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [id]);

    if (!product) return <p className="p-10 text-center">Loading...</p>

    return (
        
        <div className="max-w-5xl mx-auto mt-10 md:mt-40 p-4 md:p-10 grid grid-cols-1 md:grid-cols-2 md:gap-40 gap-8 items-start">
            {/* IMAGE */}
            {/* some basic re=ordering because the image kept showing up after the details... */}
            <div className="order-1 md:order-2">
                <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-md"
                />
            </div>

            {/* DETAILS*/}
            <div className="order-2 md:order-1">
                <h1 className="text-4xl break-words font-semibold mb-4">{product.name}</h1>
                <p className="text-gray-500 text-lg mb-4">${product.price}</p>
                <p className="text-base break-words mb-6">{product.description}</p> 
                <button className="w-full bg-sky-300 text-white px-6 py-3 rounded-md hover:bg-sky-400 hover:scale-105 active:scale-110 active:bg-sky-600 transition" onClick={() => addToCart(product)}>
                Add to Cart
                </button>
            </div>
            </div>
    );
};

export default ProductDetail;