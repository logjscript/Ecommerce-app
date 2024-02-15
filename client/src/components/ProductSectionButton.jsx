import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function ProductSectionButton({ item }) {
    const { signedIn, setCanceled, userInfo, setUserInfo } = useContext(UserContext);

    const handleClick = () => {

        if (signedIn) {
            const existingItemIndex = userInfo.items?.findIndex(bagItem => {
                return bagItem.name === item.name;
            });

            if (existingItemIndex !== -1 && existingItemIndex !== undefined) {
                let updatedState = [...userInfo.items];
                updatedState[existingItemIndex] = {
                    ...item, 
                    quantity: userInfo.items[existingItemIndex].quantity + 1
                };

                setUserInfo({
                    ...userInfo,
                    items: updatedState
                });
            } else {
                setUserInfo({
                    ...userInfo, items: [
                        ...(userInfo.items || []), {value: item.value, link: item.link, name: item.name, quantity: 1}
                    ]
                });
            }
        } else {
            setCanceled(false);
        }
    }

    return (
        <button 
            className=' bg-gray-800 text-white text-xl rounded-3xl w-36 h-11 opacity-100 hover:opacity-50 ease-in-out duration-200'
            onClick={handleClick}
        >
            Add to bag
        </button>
    )
}