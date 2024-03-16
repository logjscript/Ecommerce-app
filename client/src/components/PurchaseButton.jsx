import { useContext } from "react";
import { UserContext } from "./UserContext";

const PurchaseButton = ({ setItemsArePurchased }) => {
    const { signedInUserInfo, setSignedInUserInfo } = useContext(UserContext);
    const handleClick = () => {
        setItemsArePurchased(true);
        setSignedInUserInfo({
            ...signedInUserInfo,
            items: [],
        })
        
    }

    return (
        <button 
            onClick={handleClick}
            className='mb-[20%] mt-[calc(20%-1rem)] md:mt-0 md:mb-0 place-self-center px-[25px] py-[10px] bg-gray-800 text-white text-xl rounded-3xl opacity-100 hover:opacity-50 ease-in-out duration-200 font-voltaire'
        >
            Purchase Items
        </button>
    )
}

export default PurchaseButton;