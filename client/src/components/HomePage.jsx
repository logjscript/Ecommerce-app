import React from 'react';
import image1 from '../images/home-img-1.jpg';
import image2 from '../images/home-img-2.jpg';
import image3 from '../images/home-img-3.jpg';


export default function HomePage() {
    return (
        <>
            <div className='box-border flex justify-evenly w-screen'>
                <img src={image2} className='home-img'/>
                <img src={image3} className='home-img'/>
                <img src={image1} className='home-img'/>
            </div>

            <div className='h-92 text-gray-800 flex flex-col justify-center items-center py-24'> 
                <div className='font-fjalla text-6xl flex justify-center items-center'>BUILD YOUR</div>
                <div className='font-pacifico text-8xl flex justify-center items-center pt-4 pb-12'>Brand</div>
                <button className='bg-gray-800 text-white rounded-3xl w-36 h-11 text-xl'>Shop Now</button>
            </div>
        </>
    )
}