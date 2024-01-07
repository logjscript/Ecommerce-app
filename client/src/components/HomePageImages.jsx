import React from 'react';
import image1 from '../images/home-img-1.jpg';
import image2 from '../images/home-img-2.jpg';
import image3 from '../images/home-img-3.jpg';


export default function HomePageImages() {
    return (
        <div className='box-border flex justify-evenly w-screen'>
            <img src={image2} className='home-img'/>
            <img src={image3} className='home-img'/>
            <img src={image1} className='home-img'/>
        </div>
    )
}