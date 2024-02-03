import { useImages } from './ImageContext';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function ImageScroller({ setType }) {
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
                setType('tShirts');
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
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    function slideRight() {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return (
        <div data-testid='scroller' className='relative flex items-center mb-8'>
            <MdChevronLeft data-testid='left' onClick={slideLeft} size={40} className='opacity-50 cursor-pointer hover:opacity-100' />
            <div data-testid='slider' id='slider' className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                {allClothes.map((item, i) =>(
                    <img key={i} src={item.link} alt='/' onClick={() => handleClickScrollBar(i)} className='w-[220px] h-[220px] object-cover inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300' />
                ))} 
            </div>
            <MdChevronRight data-testid='right' onClick={slideRight} size={40} className='opacity-50 cursor-pointer hover:opacity-100' />
        </div>
    )
}