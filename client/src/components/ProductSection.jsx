import { useImages } from "./ImageContext";
import ProductSectionButton from './ProductSectionButton';
import { useContext } from "react";
import { UserContext } from "./UserContext";


export default function ProductSection() {
    const { type } = useContext(UserContext);
    const { imageGroups } = useImages();
    let title = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <div className="grid grid-rows[auto_1fr]">
            <h1 className='pt-28 p-8 font-pacifico text-4xl'>{title}</h1>
            <div 
                data-testid='testDiv'
                className="grid grid-cols-[repeat(auto-fit,300px)] justify-evenly items-center gap-11 pt-0 p-8"
                >
                {imageGroups[type].map((image) => (
                    <div key={image.id} className="grid text-center gap-y-4 p-4 h-[575px] bg-gray-100 shadow-lg shadow-gray-400 rounded-3xl">
                        <div className="flex w-full h-72">
                            <img src={image.link} alt="/" className="place-self-center h-full w-full object-cover rounded-xl shadow-md shadow-gray-400" />
                        </div>

                        <div className="text-2xl">{image.name}</div>

                        <p>{image.description}</p>

                        <div className="text-base text-gray-800 opacity-70">{image.value}</div>

                        <ProductSectionButton item={image} />
                    </div>
                ))}               
            </div>
        </div>
    )
}