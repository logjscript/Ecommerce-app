import { useEffect, useRef } from "react";

export default function Button({ item, userInfo, setUserInfo, signedIn, setCanceled }) {
    const quantityRef = useRef(null);
    
    useEffect(() => {
        const existingItem = userInfo.items?.find(oldItem => oldItem.name === item.name);
        if (existingItem) {
            quantityRef.current = existingItem.quantity;
        } else {
            quantityRef.current = 0;
        }
        
        const itemToBag = async () => {
            try {
                const response = await fetch(`http://localhost:5200/api/v1/users/${userInfo.username}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...userInfo, items: [
                        ...(userInfo.items || []), {value: item.value, link: item.link, name: item.name, quantity: quantityRef.current}
                    ]})
                });
    
                if (!response.ok) {
                    throw new Error('Data cannot be sent');
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (userInfo.items) {
            itemToBag();
        }
    }, [userInfo.items])

    const handleClick = async () => {
        try {
            if (signedIn) {
                const existingItemIndex = userInfo.items?.findIndex(bagItem => {
                    console.log(bagItem.name);
                    console.log(item.name);
                    return bagItem.name === item.name;
                });
                console.log(existingItemIndex);

                if (existingItemIndex !== -1 && existingItemIndex !== undefined) {
                    let updatedState = [...userInfo.items];
                    updatedState[existingItemIndex] = {
                        ...item, 
                        quantity: userInfo.items[existingItemIndex].quantity + 1
                    };

                    setUserInfo({
                        ...userInfo,
                        items: updatedState
                    })
                    quantityRef.current = userInfo.items[existingItemIndex].quantity + 1;
                } else {
                    setUserInfo({
                        ...userInfo, items: [
                            ...(userInfo.items || []), {value: item.value, link: item.link, name: item.name, quantity: 1}
                        ]
                    });
                    quantityRef.current = 1;
                }
            } else {
                setCanceled(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button 
            className=
            ' bg-gray-800 text-white text-xl rounded-3xl w-36 h-11 hover:opacity-50 ease-in-out duration-200'
                
            onClick={handleClick}
        >
            Add to bag
        </button>
    )
}