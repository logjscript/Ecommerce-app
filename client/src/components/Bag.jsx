

export default function Bag({ userInfo }) {

    const userTotalPrice = userInfo.items?.reduce((acc, item) => {    
        if (item.value[0] === '$') {
            return acc + Number(item.value.slice(1));
        } else {
            return acc + Number(item.value);
        }
    }, 0);
    console.log(userTotalPrice)

    return (
        <>
            <h1 className="pt-[8rem]">Total: {userTotalPrice}</h1>
            <div>
                {userInfo.items ? (
                    <div className="pt-[8rem]">
                        {userInfo.items.map((item => (
                            <div key={item.name} className="flex gap-4 justify-center">
                                <img src={item.link} className="w-[200px]"/>
                                <div>{item.name}</div>
                                <div>{item.value}</div>
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