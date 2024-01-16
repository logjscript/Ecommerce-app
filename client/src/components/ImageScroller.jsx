import { useRef } from 'react';
import { useImages } from './ImageContext';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function ImageScroller({ func }) {
    const { imageGroups, allClothes } = useImages();

    function slideLeft() {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    function slideRight() {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return (
        <div className='relative flex items-center mb-8'>
            <MdChevronLeft onClick={slideLeft} size={40} className='opacity-50 cursor-pointer hover:opacity-100' />
            <div id='slider' className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                {allClothes.map((item, i) =>(
                    <img key={i} src={item.link} alt='/' onClick={() => func(i)} className='w-[220px] h-[220px] object-cover inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300' />
                ))} 
            </div>
            <MdChevronRight onClick={slideRight} size={40} className='opacity-50 cursor-pointer hover:opacity-100' />
        </div>
    )
}