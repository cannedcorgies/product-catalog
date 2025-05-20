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

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://cart-api.alexrodriguez.workers.dev/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [id]);

    if (!product) return <p className="p-6">Loading...</p>

    return (
        <div className="p-6 max-w-2x-1 mx-auto">
            <img src={product.image} alt={product.name} className="w-40 rounded-lg shadow" />
            <h1 className="text=2x1 font-bold mt-4">{product.price}</h1>
            <p className="text-gray-600 mt-2">${product.price}</p>
            <p className="mt-4">{product.description}</p> 
        </div>
    );
};

export default ProductDetail;