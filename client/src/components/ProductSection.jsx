import { useItems } from "./ItemContext";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import ProductSectionButton from './ProductSectionButton';


const ProductSection = () => {
    const { itemType } = useContext(UserContext);
    const { itemGroups } = useItems();
    let headerText = itemType.charAt(0).toUpperCase() + itemType.slice(1);

    return (
        <div className="grid grid-rows[auto_1fr] font-voltaire">
            <h1 className='pt-28 p-8 font-pacifico text-4xl'>{headerText}</h1>

            <div 
                data-testid='testDiv'
                className="grid grid-cols-[repeat(auto-fit,300px)] justify-evenly items-center gap-11 pt-0 p-8"
            >
                {itemGroups[itemType].map(item => (
                    <div key={item.id} className="grid text-center gap-y-4 p-4 h-[575px] bg-gray-100 shadow-lg shadow-gray-400 rounded-3xl">
                        <div className="flex w-full h-72">
                            <img src={item.link} alt="/" className="place-self-center h-full w-full object-cover rounded-xl shadow-md shadow-gray-400" />
                        </div>

                        <div className="text-3xl font-semibold">{item.name}</div>

                        <p>{item.description}</p>

                        <div className="text-base text-gray-800 opacity-70">{item.value}</div>

                        <ProductSectionButton item={item} />
                    </div>
                ))}               
            </div>
        </div>
    )
}

export default ProductSection;