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
                /> 
            );
        } else if (bought) {
            setShowPurchaseButton(<div className='px-12 text-3xl md:text-5xl text-gray-800 text-center'>Thank you for shopping with us!</div>);
        } else {
            setShowPurchaseButton(null);
        }
    }, [userInfo.items, bought]);

    let totalToDisplay;
    let itemsToDisplay;

    if (!bought) {
        totalToDisplay = (
            <h1 className="text-2xl text-gray-700 md:justify-self-center md:self-end text-center">
                Total: <br />
                {priceTotal ? (
                     <span className='text-4xl'>${priceTotal.toFixed(2)}</span>
                ) : (
                    <span className='text-4xl'>$0.00</span>
                )}
             </h1> 
        );

        itemsToDisplay = (
            (userInfo.items && userInfo.items.length > 0) ? (
                <div data-testid='testContainerDiv' className='flex flex-col gap-8 items-center self-center w-full min-h-screen md:min-h-full md:h-[100%] md:row-start-2 py-[5%] md:overflow-auto'>
                    {userInfo.items.map(item => (
                        <div data-testid='testMappedDiv' key={item.name} className="w-[75%] grid grid-cols-[50%_1fr] bg-white rounded-3xl p-4 shadow-lg md:w-[85%]">
                            <img src={item.link} className="rounded-[50%] aspect-square min-w-[125px] w-[80%] object-cover justify-self-end self-center shadow-2xl shadow-gray-400 row-span-2"/>

                            <div className='place-self-center flex flex-col justify-center items-center'>
                                <div className='text-xl text-gray-600 text-center sm:text-2xl'>{item.name}</div>
                                <div className='text-md text-gray-500 sm:text-lg'>{`Quantity: ${item.quantity}`}</div>
                                <div className='text-md text-gray-500 sm:text-lg'>{`Price: ${item.value}`}</div>
                            </div>

                            <div className='place-self-center'>
                                <DeleteBagItem item={item} setUserInfo={setUserInfo} userInfo={userInfo} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div data-testid='testContainerDiv' className={'flex h-screen justify-center items-center'}>
                    <div className='text-3xl text-gray-600'>No Items</div>
                </div>
            )
        );
    } else {
        totalToDisplay = null;
        itemsToDisplay = null;
    }

    return (
        !bought ? (
            <div className='border-box flex flex-col h-screen w-screen md:grid md:grid-rows-[5rem_1fr] md:grid-cols-[1.5fr_1fr] md:gap-0'>

                {itemsToDisplay}

                <div className='self-center flex flex-col justify-center items-center gap-4 pt-8 md:pt-0 md:row-start-2 md:col-start-2 md:h-[90%] md:grid md:grid-rows-[15%_1fr_15%] md:border-l md:border-gray-400'>
                    {totalToDisplay}
                
                    <ul className='max-h-[100%] min-w-[35%] justify-self-center md:self-start overflow-auto'>
                        {userInfo.items.map((item) => (
                            <li key={item.name} className='text-md text-gray-500'>{item.name}: {item.quantity}</li>
                        ))}
                    </ul>

                    {showPurchaseButton}
                </div>
            </div>
        ) : (
            <div className='h-screen w-screen flex justify-center items-center'>
                {showPurchaseButton}
            </div>
        )
    )
}