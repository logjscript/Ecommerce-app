import { createContext, useContext } from "react";

const ItemContext = createContext();

const ItemProvider = ({ children }) => {
    const itemGroups = {
        home: ['../../images/home-imgs/home1.jpg', '../../public/images/home-imgs/home2.jpg', '../../public/images/home-imgs/home3.jpg'],
        hats: [
            {link: '../../images/hat-imgs/hat1.jpg', value: '$54.99', name: 'Striped Hat', description: 'This is a beautiful striped hat with a red decorated band wrapping around it', quantity: 0, id: 0}, 
            {link: '../../images/hat-imgs/hat2.jpg', value: '$39.99', name: 'Brown Hat', description: 'This brown hat is a great choice for the colder seasons', quantity: 0, id: 1},
            {link: '../../images/hat-imgs/hat3.jpg', value: '$34.95', name: 'Sun Hat', description: 'This hat will keep the sun out of your face while looking stylish', quantity: 0, id: 2},
            {link: '../../images/hat-imgs/hat4.jpg', value: '$24.99', name: 'Blue Knit Cap', description: 'This knit cap will keep your ears warm during the winter', quantity: 0, id: 3},
        ],
        sweatshirts: [
            {link: '../../images/sweatshirt-imgs/sweat1.jpg', value: '$23.99', name: 'Striped Sweatshirt', description: 'This striped sweatshirt is soft as can be with a loose fit', quantity: 0, id: 0}, 
            {link: '../../images/sweatshirt-imgs/sweat2.jpg', value: '$47.95', name: 'Black Sweatshirt', description: 'This tighter fitting hoodie is great to wear when doing activities', quantity: 0, id: 1},
            {link: '../../images/sweatshirt-imgs/sweat3.jpg', value: '$35.99', name: 'Blue Sweatshirt', description: 'This sweatshirt is a beautiful blue and is a comfy fit', quantity: 0, id: 2},
            {link: '../../images/sweatshirt-imgs/sweat4.jpg', value: '$39.99', name: 'Yellow Sweatshirt', description: 'This is a fun sweatshirt that can be enjoyed while lounging or being active', quantity: 0, id: 3},
        ],
        shirts: [
            {link: '../../images/shirt-imgs/shirt1.jpg', value: '$42.99', name: 'White Long Sleeve', description: 'This long sleeve goes well with a suit jacket', quantity: 0, id: 0}, 
            {link: '../../images/shirt-imgs/shirt2.jpg', value: '$79.99', name: 'White Shirt', description: 'This shirt is a tighter fit through the chest and looser at the waist, making the perfect fitting shirt', quantity: 0, id: 1},
            {link: '../../images/shirt-imgs/shirt3.jpg', value: '$63.95', name: 'Blue Shirt', description: 'This shirt is a tighter fitting shirt meant for book lovers', quantity: 0, id: 2},
            {link: '../../images/shirt-imgs/shirt4.jpg', value: '$51.99', name: 'Striped Long Sleeve', description: 'This striped long sleeve goes great with suspenders and a bow tie', quantity: 0, id: 3},
        ],
        pants: [
            {link: '../../images/pants-imgs/pants1.jpg', value: '$83.99', name: 'Slacks', description: 'These slacks pair nicely with a matching suit jacket', quantity: 0, id: 0}, 
            {link: '../../images/pants-imgs/pants2.jpg', value: '$69.99', name: 'Khakis', description: 'These pants are both fashionable and casual, which allow them to be paired with many things', quantity: 0, id: 1},
            {link: '../../images/pants-imgs/pants3.jpg', value: '$77.95', name: 'Black Jeans', description: 'These slim-fit jeans are breathable and stretchy, allowing for a comfortable fit', quantity: 0, id: 2},
            {link: '../../images/pants-imgs/pants4.jpg', value: '$49.99', name: 'Ripped Jeans', description: "These ripped jeans are bold and flaunt an artist's personality", quantity: 0, id: 3},
        ],
        shoes: [
            {link: '../../images/shoes-imgs/shoes1.jpg', value: '$109.99', name: 'White Shoes', description: 'These shoes are comfortable and go with any outfit imaginable', quantity: 0, id: 0}, 
            {link: '../../images/shoes-imgs/shoes2.jpg', value: '$57.95', name: 'Running Shoes', description: 'These running shoes are great for any activity and will last a long time', quantity: 0, id: 1},
            {link: '../../images/shoes-imgs/shoes3.jpg', value: '$38.99', name: 'Green Boots', description: 'These boots are hand-made, very durable, and waterproof', quantity: 0, id: 2},
            {link: '../../images/shoes-imgs/shoes4.jpg', value: '$62.99', name: 'Light-brown Boots', description: 'These waterproof boots are great for the colder seasons and are a nice neutral color', quantity: 0, id: 3},
        ],
    }

    const allClothes = [
        ...itemGroups.hats,
        ...itemGroups.sweatshirts,
        ...itemGroups.shirts,
        ...itemGroups.pants,
        ...itemGroups.shoes,
    ];

    return (
        <ItemContext.Provider value={{ itemGroups, allClothes }}>
            {children}
        </ItemContext.Provider>
    )
}

export function useItems() {
    return useContext(ItemContext);
}

export { ItemProvider };