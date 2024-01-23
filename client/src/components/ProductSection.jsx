import { useState } from "react";
import { useImages } from "./ImageContext";


export default function ProductSection({ clothingType }) {
    const { imageGroups } = useImages();

    return (
        <div className="grid grid-cols-[repeat(2,minmax(200px,50%))] grid-rows-[repeat(2,minmax(200px,50%))] pt-[7.75rem] gap-y-[5%] mb-[5%]">
            
                {imageGroups[clothingType].map((image, i) => (
                    <div key={image.id} className="w-full h-full flex flex-col justify-start items-center gap-4 place-self-center">
                        <img src={image.link} alt="/" className="w-[80%] h-[80%] object-cover rounded-2xl shadow-lg hover:scale-105 ease-in-out duration-300" />
                        <div className="text-base text-gray-800 opacity-70">{image.value}</div>
                        <button className='bg-gray-800 text-white rounded-3xl w-36 h-11 text-xl hover:opacity-50 ease-in-out duration-200'>Add to bag</button>
                    </div>
                ))}               
        </div>
    )
}