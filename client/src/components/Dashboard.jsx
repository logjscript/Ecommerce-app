import { itemsInBag } from "../utils";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import {  FaBars, FaTimes } from 'react-icons/fa';

export default function Dashboard () {
    const { setType, signedIn, setSignedIn, setCanceled, userInfo, setUserInfo } = useContext(UserContext);
    const [showNav, setShowNav] = useState(false);
    const totalItems = itemsInBag(userInfo?.items);

    const handleSignOutClick = () => {
        setSignedIn(false);
        setCanceled(true);
        setType(null);
        setUserInfo({
            username: '',
            password: '',
            items: [],
            total: 0,
        });
    }

    const handleTypeClick = (e) => {
        setType(e.target.value);
        setShowNav(false);
        window.scrollTo(0,0);
    }

    const handleBagClick = () => {
        if (!signedIn) {
          setCanceled(false);
        } else {
          setType('bag');
          window.scrollTo(0,0);
        }
    }

    return (
            <nav data-testid='container' className={`fixed top-0 box-border z-30 grid grid-rows-1 grid-cols-[1fr_auto_1fr] justify-between items-center w-screen h-20 bg-black text-base text-white gap-8 pt-0 px-[1.5%]`}>
            
                {/* left items */}
                <ul className='justify-self-start hidden custom-md:flex text-sm gap-x-3 gap-y-3'>
                    <li><button onClick={(e) => handleTypeClick(e)} value={null} className='text-left md:text-center'>Home</button></li>
                    <li><button data-testid='itemTypeButton' onClick={(e) => handleTypeClick(e)} value='hats'className='text-left md:text-center'>Hats</button></li>
                    <li><button onClick={(e) => handleTypeClick(e)} value='sweatshirts' className='text-left md:text-center'>Sweatshirts</button></li>
                    <li><button onClick={(e) => handleTypeClick(e)} value='shirts' className='text-left md:text-center'>Shirts</button></li>
                    <li><button onClick={(e) => handleTypeClick(e)} value='pants' className='text-left md:text-center'>Pants</button></li>
                    <li><button onClick={(e) => handleTypeClick(e)} value='shoes' className='text-left md:text-center'>Shoes</button></li>
                </ul>

                <button value={null} onClick={(e) => handleTypeClick(e)} className='col-start-2 font-pacifico text-4xl'>Lodi NW</button>

                {/*hamburger menu */}
                <div onClick={() => setShowNav(!showNav)} className="justify-self-end custom-md:hidden z-40">
                    {!showNav ? <FaBars size={20} /> : <FaTimes size={20} />}
                </div>

                <ul className={!showNav ? 'hidden' : 'fixed top-0 left-0 w-full h-screen bg-black flex flex-col justify-center items-center text-4xl opacity-90 text-white gap-12 font-pacifico'}>
                    <li><button onClick={(e) => handleTypeClick(e)} value={null} className='text-left md:text-center'>Home</button></li>
                    <li><button data-testid='itemTypeButton' onClick={(e) => handleTypeClick(e)} value='hats'className='text-left md:text-center'>Hats</button></li>
                    <li><button onClick={(e) => handleTypeClick(e)} value='sweatshirts' className='text-left md:text-center'>Sweatshirts</button></li>
                    <li><button onClick={(e) => handleTypeClick(e)} value='shirts' className='text-left md:text-center'>Shirts</button></li>
                    <li><button onClick={(e) => handleTypeClick(e)} value='pants' className='text-left md:text-center'>Pants</button></li>
                    <li><button onClick={(e) => handleTypeClick(e)} value='shoes' className='text-left md:text-center'>Shoes</button></li>
                </ul>

                {/* right items */}
                <div className='justify-self-end hidden custom-md:flex text-sm gap-x-3 gap-y-3'>
                    {!signedIn ? (
                        <button 
                        onClick={() => setCanceled(false)} 
                        value='signIn' 
                        className=''
                        >
                            Sign in
                        </button>
                    ) : (
                        <button 
                        className='text-left md:text-center' 
                        onClick={handleSignOutClick}
                        >
                            Sign Out
                        </button>
                    )}

                    <button 
                        data-testid='bag'
                        onClick={() => handleBagClick()} 
                        className='relative w-8 md:w-auto'
                        >
                        <svg className="w-8 h-8 white dark:white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9V4a3 3 0 0 0-6 0v5m9.92 10H2.08a1 1 0 0 1-1-1.077L2 6h14l.917 11.923A1 1 0 0 1 15.92 19Z"/>
                        </svg>

                        {totalItems > 0 && 
                            <div 
                            data-testid='itemQuantity' 
                            className='absolute flex justify-center items-center w-[22px] h-[22px] text-sm bg-red-500 rounded-[50%] top-0 right-[-5px]'
                            >
                                {totalItems}
                            </div>
                        }
                    </button>    
                </div>
            </nav>

    )
}