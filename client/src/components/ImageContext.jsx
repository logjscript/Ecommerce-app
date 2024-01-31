import { createContext, useContext } from "react";

const ImageContext = createContext();

export function ImageProvider({ children }) {
    const imageGroups = {
        home: ['../../public/images/home-imgs/home1.jpg', '../../public/images/home-imgs/home2.jpg', '../../public/images/home-imgs/home3.jpg'],
        hats: [
            {link: '../../public/images/hat-imgs/hat1.jpg', value: '$54.99', name: 'Hat One', quantity: 0, id: 0}, 
            {link: '../../public/images/hat-imgs/hat2.jpg', value: '$39.99', name: 'Hat Two', quantity: 0, id: 1},
            {link: '../../public/images/hat-imgs/hat3.jpg', value: '$34.95', name: 'Hat Three', quantity: 0, id: 2},
            {link: '../../public/images/hat-imgs/hat4.jpg', value: '$24.99', name: 'Hat Four', quantity: 0, id: 3},
        ],
        sweatshirts: [
            {link: '../../public/images/sweatshirt-imgs/sweat1.jpg', value: '$23.99', name: 'Sweatshirt One', quantity: 0, id: 0}, 
            {link: '../../public/images/sweatshirt-imgs/sweat2.jpg', value: '$47.95', name: 'Sweatshirt Two', quantity: 0, id: 1},
            {link: '../../public/images/sweatshirt-imgs/sweat3.jpg', value: '$35.99', name: 'Sweatshirt Three', quantity: 0, id: 2},
            {link: '../../public/images/sweatshirt-imgs/sweat4.jpg', value: '$39.99', name: 'Sweatshirt Four', quantity: 0, id: 3},
        ],
        tShirts: [
            {link: '../../public/images/tshirt-imgs/shirt1.jpg', value: '$42.99', name: 'Tshirt One', quantity: 0, id: 0}, 
            {link: '../../public/images/tshirt-imgs/shirt2.jpg', value: '$79.99', name: 'Tshirt Two', quantity: 0, id: 1},
            {link: '../../public/images/tshirt-imgs/shirt3.jpg', value: '$63.95', name: 'Tshirt Three', quantity: 0, id: 2},
            {link: '../../public/images/tshirt-imgs/shirt4.jpg', value: '$51.99', name: 'Tshirt Four', quantity: 0, id: 3},
        ],
        pants: [
            {link: '../../public/images/pants-imgs/pants1.jpg', value: '$83.99', name: 'Pants One', quantity: 0, id: 0}, 
            {link: '../../public/images/pants-imgs/pants2.jpg', value: '$69.99', name: 'Pants Two', quantity: 0, id: 1},
            {link: '../../public/images/pants-imgs/pants3.jpg', value: '$77.95', name: 'Pants Three', quantity: 0, id: 2},
            {link: '../../public/images/pants-imgs/pants4.jpg', value: '$49.99', name: 'Pants Four', quantity: 0, id: 3},
        ],
        shoes: [
            {link: '../../public/images/shoes-imgs/shoes1.jpg', value: '$109.99', name: 'Shoes One', quantity: 0, id: 0}, 
            {link: '../../public/images/shoes-imgs/shoes2.jpg', value: '$57.95', name: 'Shoes Two', quantity: 0, id: 1},
            {link: '../../public/images/shoes-imgs/shoes3.jpg', value: '$38.99', name: 'Shoes Three', quantity: 0, id: 2},
            {link: '../../public/images/shoes-imgs/shoes4.jpg', value: '$62.99', name: 'Shoes Four', quantity: 0, id: 3},
        ],
    }

    const allClothes = [
        ...imageGroups.hats,
        ...imageGroups.sweatshirts,
        ...imageGroups.tShirts,
        ...imageGroups.pants,
        ...imageGroups.shoes,
    ];

    return (
        <ImageContext.Provider value={{ imageGroups, allClothes }}>
            {children}
        </ImageContext.Provider>
    )
}

export function useImages() {
    return useContext(ImageContext);
}