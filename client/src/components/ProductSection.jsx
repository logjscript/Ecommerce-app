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
                className="grid grid-cols-[repeat(auto-fit,300px)] justify-evenly items-center gap-11 pt-28 p-8"
            >
                {imageGroups[type].map((image) => (
                    <div key={image.id} className="grid text-center gap-y-4 p-4 bg-white shadow-xl shadow-gray-300 rounded-3xl">
                        <div className="flex w-full h-72">
                            <img src={image.link} alt="/" className="place-self-center h-full w-full object-cover rounded-xl shadow-lg shadow-gray-300" />
                        </div>

                        <div className="text-2xl">{image.name}</div>

                        <p>{image.name} is both a stylish choice and a comfortable fit, making this one of our most loved products</p>

                        <div className="text-base text-gray-800 opacity-70">{image.value}</div>

                        <ProductSectionButton item={image} />
                    </div>
                ))}               
            </div>
    )
}