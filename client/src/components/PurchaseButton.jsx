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
            className='mb-[20%] mt-[calc(20%-1rem)] md:mt-0 md:mb-0 place-self-center px-[25px] py-[10px] bg-gray-800 text-white text-xl rounded-3xl opacity-100 hover:opacity-50 ease-in-out duration-200'
        >
            Purchase Items
        </button>
    )
}