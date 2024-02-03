import DeleteBagItem from "./DeleteBagItem";
import { userTotalPrice } from "../utils";

export default function Bag({ userInfo, setUserInfo }) {

    const priceTotal = userTotalPrice(userInfo.items);    

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
        </>
        
    )
}