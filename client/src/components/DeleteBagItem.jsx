import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function DeleteBagItem({ item }) {
    const { userInfo, setUserInfo } = useContext(UserContext);
    
    const handleClick = () => {
        const existingItem = userInfo.items.findIndex(bagItem => bagItem.name === item.name);
        const updatedState = [...userInfo.items];

        if (updatedState[existingItem].quantity > 1) {
            updatedState[existingItem] = {
                ...item, 
                quantity: item.quantity - 1
            };
        } else {
            updatedState.splice(existingItem, 1);
        }

        setUserInfo({
            ...userInfo,
            items: updatedState
        })
    }

    return (
        <button className='px-[10px] py-[8px] bg-gray-800 text-white text-xs rounded-3xl opacity-100 hover:opacity-50 ease-in-out duration-200 sm:text-sm lg:text-base' onClick={handleClick}>Remove Item</button>
    )
}
