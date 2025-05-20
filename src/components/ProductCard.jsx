/////large product cards a-la apple store
//  - tall, plain, rounded, MINIMAL
//
/////system
//  - shell: link to ProductDetail.jsx
//  - outer: card
//  - innie01: image
//  - innie02: name and price
//
/////vocab for fern:
//  - bg-white          background color set to white
//  - p-4               padding on all sides
//  - rounded-lg        large border radius (smooth corners)
//  - shadow            self-explanatory
//  - hover:shadow-lg   enlargen shadow when hovering
//  - group-hover:scale-105 enlargen to 105 per cent when hovering
//  - transition-shadow     animate shadow changes
//  - duration-300      transition duration in miliseconds
//  - w-full            width 100 per cent of parent
//  - h-full            height 100 percent of parent
//  - object-cover      no distortion--just cover area
//  - rounded-lg        medium border radius
//  - mt-4              space between name and price
//  - font-semibold     bold text
//  - cursor-pointer    transition to hand when hovering
//  - overflow-hidden   hides anything beyong bounds

import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({id, image, name, price}) => {

    return (
        <Link to={`/product/${id}`} className="block">
            <div className="group cursor-pointer w-full max-w-sm mx-auto rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200">
                {/*TOP HALF*/}
                <div className="w-full aspect-[4-3] bg-gray-100">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                </div>
                {/*BOTTOM HALF*/}
                <div className="p-4 text-center">
                    <h2 className="text-lg font-medium text-gray-900">{name}</h2>
                    <p className="text-base text-gray-500 mt-1">${price}</p>
                </div>
            </div>
        </Link>
    );

};

export default ProductCard