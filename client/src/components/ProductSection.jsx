import { useImages } from "./ImageContext";
import ProductSectionButton from './ProductSectionButton';
import { useContext } from "react";
import { UserContext } from "./UserContext";


export default function ProductSection() {
    const { type } = useContext(UserContext);
    const { imageGroups } = useImages();

    return (
        <div 
            data-testid='testDiv'
            className="grid grid-cols-[repeat(2,minmax(200px,50%))] grid-rows-[repeat(2,minmax(200px,50%))] pt-[7.75rem] gap-y-[5%] mb-[5%]"
        >
            
                {imageGroups[type].map((image) => (
                    <div key={image.id} className="w-full h-full flex flex-col justify-start items-center gap-4 place-self-center">
                        <img src={image.link} alt="/" className="w-[80%] h-[80%] object-cover rounded-2xl shadow-lg hover:scale-105 ease-in-out duration-300" />
                        <div className="text-base text-gray-800 opacity-70">{image.value}</div>
                        <ProductSectionButton item={image} />
                    </div>
                ))}               
        </div>
    )
}