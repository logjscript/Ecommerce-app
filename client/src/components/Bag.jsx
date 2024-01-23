

export default function Bag({ userInfo }) {

    return (
        <div className="pt-[7.75rem]">
            {userInfo.items.map((item => (
                <div key={item.item_name} className="flex gap-4 justify-center">
                    <img src={item.img_path} className="w-[200px]"/>
                    <div>{item.item_name}</div>
                    <div>{item.price}</div>
                </div>
            )))}
        </div>
    )
}