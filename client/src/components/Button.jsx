
export default function Button({ item, userInfo, setUserInfo, signedIn, setCanceled }) {

    const itemToBag = async () => {
        try {
            const response = await fetch(`http://localhost:5200/api/v1/users/${userInfo.username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...userInfo, items: [
                    ...userInfo.items, {price: item.value, img_path: item.link, item_name: item.name}
                ]})
            });

            if (!response.ok) {
                throw new Error('Data cannot be sent');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = async () => {
        !signedIn ? setCanceled(false) : await itemToBag();
        setUserInfo({
            ...userInfo, items: [
                ...(userInfo.items || []), {price: item.value, img_path: item.link, item_name: item.name}
            ]
        })
    }

    return (
        <button 
            className=' bg-gray-800 
                        text-white text-xl
                        rounded-3xl 
                        w-36 h-11  
                        hover:opacity-50 ease-in-out duration-200'
                
            onClick={handleClick}
        >
            Add to bag
        </button>
    )
}