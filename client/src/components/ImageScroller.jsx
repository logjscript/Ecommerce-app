import { useContext } from "react";
import { useItems } from './ItemContext';
import { UserContext } from "./UserContext";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const ImageScroller = () => {
    const { setItemType } = useContext(UserContext);
    const { allClothes } = useItems();

    const handleImageClick = (imageNumber) => {
        switch(true) {
            case imageNumber < 4: {
                setItemType('hats');
                break;
            }
            case imageNumber >= 4 && imageNumber < 8: {
                setItemType('sweatshirts');
                break;
            }
            case imageNumber >= 8 && imageNumber < 12: {
                setItemType('shirts');
                break;
            }
            case imageNumber >= 12 && imageNumber < 16: {
                setItemType('pants');
                break;
            }
            case imageNumber >= 16 && imageNumber < 20: {
                setItemType('shoes');
                break;
            }
            default: {
                throw Error('Unknown');
            }
        }
        window.scrollTo(0, 0);
    }

    const handleLeftArrowClick = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 600;
    }
    
    const handleRightArrowClick = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 600;
    }

    return (
        <div data-testid='scroller' className='relative items-center flex w-full shadow-lg shadow-gray-400 bg-gradient-to-l from-gray-300 to-white md:my-0 rounded-3xl md:rounded-none'>
            <MdChevronLeft data-testid='left' onClick={handleLeftArrowClick} className='hidden md:inline-block absolute left-8 z-20 h-20 w-20 bg-black text-white opacity-80 hover:opacity-100 rounded-[50%] cursor-pointer'/>
            
            <div data-testid='slider' id='slider' className='flex flex-col md:flex-row justify-center md:justify-start items-center w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide p-[5%] pb-0 md:p-6 md:gap-6'>
                {allClothes.map((item, index) =>(
                    <div key={index} onClick={() => handleImageClick(index)} className='flex justify-center items-center md:min-w-[70vh] md:max-w-[600px] mb-[5%] md:mb-0 aspect-square cursor-pointer'>
                        <img src={item.link} alt='/' className='w-full aspect-square object-cover rounded-2xl hover:scale-105 ease-in-out duration-300 shadow-md shadow-gray-400'/>
                    </div>
                ))}
            </div>

            <MdChevronRight data-testid='right' onClick={handleRightArrowClick} className='hidden md:inline-block absolute right-8 z-20 h-20 w-20 bg-black text-white opacity-80 hover:opacity-100 cursor-pointer rounded-[50%]'/>
        </div>
    )
}

export default ImageScroller;