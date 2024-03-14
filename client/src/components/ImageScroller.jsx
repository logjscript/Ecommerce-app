import { useImages } from './ImageContext';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function ImageScroller() {
    const { setType } = useContext(UserContext);
    const { allClothes } = useImages();

    function handleClickScrollBar(id) {
        switch(true) {
            case id < 4: {
                setType('hats');
                break;
            }
            case id >= 4 && id < 8: {
                setType('sweatshirts');
                break;
            }
            case id >= 8 && id < 12: {
                setType('shirts');
                break;
            }
            case id >= 12 && id < 16: {
                setType('pants');
                break;
            }
            case id >= 16 && id < 20: {
                setType('shoes');
                break;
            }
            default: {
                throw Error('Unknown');
            }
        }
        window.scrollTo(0, 0);
    }

    function slideLeft() {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 600;
    }

    function slideRight() {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 600;
    }

    return (
        <div data-testid='scroller' className='relative items-center flex w-full bg-white md:my-0 shadow-lg md:shadow-inner rounded-3xl md:rounded-none'>
            <MdChevronLeft data-testid='left' onClick={slideLeft} className='hidden md:inline-block absolute left-8 z-20 h-20 w-20 bg-black text-white opacity-80 hover:opacity-100 rounded-[50%] cursor-pointer'/>
            
            <div data-testid='slider' id='slider' className='flex flex-col md:flex-row justify-center md:justify-start items-center w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide p-[5%] pb-0 md:p-6 md:gap-6'>
                {allClothes.map((item, i) =>(
                    <div key={i} onClick={() => handleClickScrollBar(i)} className='flex justify-center items-center md:min-w-[70vh] md:max-w-[600px] mb-[5%] md:mb-0 aspect-square cursor-pointer'>
                        <img src={item.link} alt='/' className='w-full aspect-square object-cover rounded-2xl hover:scale-105 ease-in-out duration-300'/>
                    </div>
                ))}
            </div>

            <MdChevronRight data-testid='right' onClick={slideRight} className='hidden md:inline-block absolute right-8 z-20 h-20 w-20 bg-black text-white opacity-80 hover:opacity-100 cursor-pointer rounded-[50%]'/>
        </div>
    )
}