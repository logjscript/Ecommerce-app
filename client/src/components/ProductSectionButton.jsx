import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function ProductSectionButton({ item }) {
    const { userSignedIn, setCancelSignIn, signedInUserInfo, setSignedInUserInfo } = useContext(UserContext);

    const handleClick = () => {

        if (userSignedIn) {
            const existingItemIndex = signedInUserInfo.items?.findIndex(bagItem => {
                return bagItem.name === item.name;
            });

            if (existingItemIndex !== -1 && existingItemIndex !== undefined) {
                let updatedState = [...signedInUserInfo.items];
                updatedState[existingItemIndex] = {
                    ...item, 
                    quantity: signedInUserInfo.items[existingItemIndex].quantity + 1
                };

                setSignedInUserInfo({
                    ...signedInUserInfo,
                    items: updatedState
                });
            } else {
                setSignedInUserInfo({
                    ...signedInUserInfo, items: [
                        ...(signedInUserInfo.items || []), {value: item.value, link: item.link, name: item.name, quantity: 1}
                    ]
                });
            }
        } else {
            setCancelSignIn(false);
        }
    }

    return (
        <button 
            className='place-self-center bg-gray-800 text-white text-xl rounded-3xl w-36 h-11 opacity-100 hover:opacity-50 ease-in-out duration-200'
            onClick={handleClick}
        >
            Add to bag
        </button>
    )
}