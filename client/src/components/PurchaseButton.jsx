export default function PurchaseButton({ setBought, userInfo, setUserInfo }) {
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