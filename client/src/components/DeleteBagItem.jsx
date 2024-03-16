import { useContext } from "react";
import { UserContext } from "./UserContext";

const DeleteBagItem = ({ item }) => {
    const { signedInUserInfo, setSignedInUserInfo } = useContext(UserContext);
    
    const handleClick = () => {
        const existingItem = signedInUserInfo.items.findIndex(bagItem => bagItem.name === item.name);
        const updatedState = [...signedInUserInfo.items];

        if (updatedState[existingItem].quantity > 1) {
            updatedState[existingItem] = {
                ...item, 
                quantity: item.quantity - 1
            };
        } else {
            updatedState.splice(existingItem, 1);
        }

        setSignedInUserInfo({
            ...signedInUserInfo,
            items: updatedState
        })
    }

    return (
        <button className='px-[16px] py-[8px] bg-gray-800 text-white rounded-3xl rounded- opacity-100 hover:opacity-50 ease-in-out duration-200 text-xs sm:text-sm xl:text-lg lg:text-base font-voltaire' onClick={handleClick}>Remove Item</button>
    )
}

export default DeleteBagItem;
