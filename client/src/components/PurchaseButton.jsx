import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function PurchaseButton({ setBought }) {
    const { userInfo, setUserInfo } = useContext(UserContext);
    function handleClick() {
        setBought(true);
        setUserInfo({
            ...userInfo,
            items: [],
        })
        
    }

    return (
        <button 
            onClick={handleClick}
            className=""
        >
            Purchase Items
        </button>
    )
}