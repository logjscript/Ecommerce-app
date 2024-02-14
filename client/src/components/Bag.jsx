import { useEffect, useState, useContext } from 'react';
import DeleteBagItem from "./DeleteBagItem";
import PurchaseButton from './PurchaseButton';
import { userTotalPrice } from "../utils";
import { UserContext } from "./UserContext";

export default function Bag() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [bought, setBought] = useState(false);
    const [showPurchaseButton, setShowPurchaseButton] = useState(null);
    const priceTotal = userTotalPrice(userInfo.items);   

    useEffect(() => {
        if (userInfo.items.length > 0) {
            setBought(false);

            setShowPurchaseButton(
                <PurchaseButton 
                    setBought={setBought} 
                    userInfo={userInfo} 
                    setUserInfo={setUserInfo} 
                /> 
            );
        } else if (userInfo.items.length === 0 && bought === true) {
            setShowPurchaseButton(<div>Thank you for shopping with us!</div>);
        } else {
            setShowPurchaseButton(null);
        }
    }, [userInfo.items])
    
    


    return (
        <>
            <h1 className="pt-[8rem]">Total: {priceTotal ? `$${priceTotal.toFixed(2)}` : '$0.00'}</h1>
            <div data-testid='testContainerDiv'>
                {(userInfo.items && userInfo.items.length > 0) ? (
                    <div className="pt-[8rem]">
                        {userInfo.items.map((item => (
                            <div data-testid='testMappedDiv' key={item.name} className="flex gap-4 justify-center">
                                <img src={item.link} className="w-[200px]"/>
                                <div>{item.name}</div>
                                <div>{`${item.quantity} x ${item.value}`}</div>
                                <DeleteBagItem item={item} setUserInfo={setUserInfo} userInfo={userInfo} />
                            </div>
                        )))}
                    </div>
                ) : (
                    <div className="pt-[8rem] text-center">No Items</div>
                )}
            </div>

            {showPurchaseButton}
        </>
    )
}