import { useState } from "react";
import { useImages } from "./ImageContext";


export default function ProductSection({ clothingType }) {
    const { imageGroups } = useImages();

    return (
        <div className="grid grid-cols-[repeat(2,minmax(200px,50%))] grid-rows-[repeat(2,minmax(200px,50%))] gap-x-[6%] gap-y-[8%] pt-[10%]">
            
                <img src={imageGroups[clothingType][0]} alt="/" className="w-[80%] h-[90%] object-cover justify-self-end self-start rounded-2xl" />
                
            
                <img src={imageGroups[clothingType][1]} alt="/" className="w-[80%] h-[90%] object-cover justify-self-start self-start rounded-2xl" />
                
         
           
                <img src={imageGroups[clothingType][2]} alt="/" className="w-[80%] h-[90%] object-cover justify-self-end self-start rounded-2xl" />
                
           
            
                <img src={imageGroups[clothingType][3]} alt="/" className="w-[80%] h-[90%] ] object-cover justify-self-start self-start rounded-2xl" />
                
        </div>
    )
}