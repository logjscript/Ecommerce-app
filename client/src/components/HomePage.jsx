import { useImages } from './ImageContext';
import ImageScroller from './ImageScroller';
import { useContext } from "react";
import { UserContext } from "./UserContext";


export default function HomePage() {
    const { setType } = useContext(UserContext);
    const { imageGroups } = useImages();
    
    return (
        <div 
            data-testid='homepage'
            className='pt-[5.75rem]'
        >
            <div className='box-border flex justify-evenly w-screen'>
                <img src={imageGroups.home[1]} className='home-img'/>
                <img src={imageGroups.home[2]} className='home-img'/>
                <img src={imageGroups.home[0]} className='home-img'/>
            </div>

            <div className='h-92 text-gray-800 flex flex-col justify-center items-center py-24'> 
                <div className='font-fjalla text-6xl flex justify-center items-center'>BUILD YOUR</div>
                <div className='font-pacifico text-8xl flex justify-center items-center pt-4 pb-12'>Brand</div>
                <button 
                    onClick={() => {setType('hats'); window.scrollTo(0, 0)}} 
                    className='bg-gray-800 text-white rounded-3xl w-36 h-11 text-xl opacity-100 hover:opacity-50 duration-200 ease-in-out'
                >
                    Shop Now
                </button>
            </div>
            <ImageScroller />
        </div>
    )
}