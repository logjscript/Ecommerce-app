
export default function DeleteBagItem({ item, userInfo, setUserInfo }) {

    const handleClick = () => {
        const existingItem = userInfo.items.findIndex(bagItem => bagItem.name === item.name);
        const updatedState = [...userInfo.items];

        if (updatedState[existingItem].quantity > 1) {
            updatedState[existingItem] = {
                ...item, 
                quantity: item.quantity - 1
            };
        } else {
            updatedState.splice(existingItem, 1);
        }

        setUserInfo({
            ...userInfo,
            items: updatedState
        })
    }

    return (
        <button onClick={handleClick}>Delete</button>
    )
}