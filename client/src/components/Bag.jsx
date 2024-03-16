import { useEffect, useState, useContext } from 'react';
import { totalBagPrice } from "../utils";
import { UserContext } from "./UserContext";
import DeleteBagItem from "./DeleteBagItem";
import PurchaseButton from './PurchaseButton';

const Bag = () => {
    const { signedInUserInfo, setSignedInUserInfo } = useContext(UserContext);
    const [itemsArePurchased, setItemsArePurchased] = useState(false);
    const [showPurchaseButton, setShowPurchaseButton] = useState(null);
    const priceTotal = totalBagPrice(signedInUserInfo.items);  

    useEffect(() => {
        if (signedInUserInfo.items.length > 0) {
            setItemsArePurchased(false);
            setShowPurchaseButton(
                <PurchaseButton 
                    setItemsArePurchased={setItemsArePurchased} 
                /> 
            );
        } else if (itemsArePurchased) {
            setShowPurchaseButton(<div className='px-12 text-3xl md:text-5xl text-gray-800 text-center'>Thank you for shopping with us!</div>);
        } else {
            setShowPurchaseButton(null);
        }
    }, [signedInUserInfo.items, itemsArePurchased]);

    let totalToDisplay;
    let itemsToDisplay;

    if (!itemsArePurchased) {
        totalToDisplay = (
            priceTotal ? (
                <h1 className="text-3xl md:text-2xl text-gray-700 md:justify-self-center md:self-end text-center">
                    Total: <br />
                        <span className='text-4xl'>${priceTotal.toFixed(2)}</span>
                </h1>
            ) : (
                <h1 className="hidden md:block md:text-2xl text-gray-700 md:justify-self-center md:self-end text-center">
                    Total: <br />
                        <span className='text-4xl'>$0.00</span>
                </h1>
        ));

        itemsToDisplay = (
            (signedInUserInfo.items && signedInUserInfo.items.length > 0) ? (
                <div data-testid='testContainerDiv' className='flex flex-col items-center self-center gap-6 lg:gap-8 w-full px-[5%] min-h-full md:h-full md:px-[20%] py-6 pt-[104px] md:pt-6 lg:py-8 md:row-start-2 md:overflow-auto'>
                    {signedInUserInfo.items.map(item => (
                        <div data-testid='testMappedDiv' key={item.name} className="w-full grid grid-cols-[40%_1fr] bg-white rounded-3xl p-4 shadow-lg shadow-gray-500 bg-gradient-to-r from-gray-300 to-white">
                            <img src={item.link} className="rounded-xl aspect-square min-w-[125px] w-full object-cover justify-self-start self-center shadow-md shadow-gray-400 row-span-2"/>

                            <div className='place-self-center flex flex-col justify-center items-center'>
                                <div className='text-xl text-gray-600 text-center sm:text-2xl'>{item.name}</div>
                                <div className='text-md text-gray-500 sm:text-lg'>{`Quantity: ${item.quantity}`}</div>
                                <div className='text-md text-gray-500 sm:text-lg'>{`Price: ${item.value}`}</div>
                            </div>

                            <div className='place-self-center'>
                                <DeleteBagItem item={item} setSignedInUserInfo={setSignedInUserInfo} signedInUserInfo={signedInUserInfo} />
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
        !itemsArePurchased ? (
            <div className='border-box flex flex-col h-full gap-16 md:gap-0 md:h-screen min-h-screen w-full bg-gray-100 md:grid md:grid-rows-[5rem_1fr] md:grid-cols-[1.5fr_1fr]'>

                {itemsToDisplay}

                <div className='self-center flex flex-col justify-center items-center gap-4 md:row-start-2 md:col-start-2 md:h-[90%] md:grid md:grid-rows-[15%_1fr_15%] md:border-l md:border-gray-400'>
                    {totalToDisplay}
                
                    <ul className='max-h-[100%] min-w-[35%] justify-self-center md:self-start overflow-auto'>
                        {signedInUserInfo.items.map((item) => (
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

export default Bag;