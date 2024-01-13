import { createContext, useState, useContext } from "react";

const ImageContext = createContext();

export function ImageProvider({ children }) {
    const [imageGroups, setImageGroups] = useState({
        home: ['../../public/images/home-imgs/home1.jpg', '../../public/images/home-imgs/home2.jpg', '../../public/images/home-imgs/home3.jpg'],
        hats: ['../../public/images/hat-imgs/hat1.jpg', '../../public/images/hat-imgs/hat2.jpg', '../../public/images/hat-imgs/hat3.jpg', '../../public/images/hat-imgs/hat4.jpg'],
        sweatshirts: ['../../public/images/sweatshirt-imgs/sweat1.jpg', '../../public/images/sweatshirt-imgs/sweat2.jpg', '../../public/images/sweatshirt-imgs/sweat3.jpg', '../../public/images/sweatshirt-imgs/sweat4.jpg'],
        tShirts: ['../../public/images/tshirt-imgs/shirt1.jpg', '../../public/images/tshirt-imgs/shirt2.jpg', '../../public/images/tshirt-imgs/shirt3.jpg', '../../public/images/tshirt-imgs/shirt4.jpg'],
        pants: ['../../public/images/pants-imgs/pants1.jpg', '../../public/images/pants-imgs/pants2.jpg', '../../public/images/pants-imgs/pants3.jpg', '../../public/images/pants-imgs/pants4.jpg'],
        shoes: ['../../public/images/shoes-imgs/shoes1.jpg', '../../public/images/shoes-imgs/shoes2.jpg', '../../public/images/shoes-imgs/shoes3.jpg', '../../public/images/shoes-imgs/shoes4.jpg']
    })

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