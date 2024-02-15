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
        <button onClick={handleClick}>Delete</button>
    )
}