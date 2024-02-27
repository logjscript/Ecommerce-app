import { itemsInBag } from "../utils";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

export default function Dashboard () {
    const { setType, signedIn, setSignedIn, setCanceled, userInfo, setUserInfo } = useContext(UserContext);
    const [showNav, setShowNav] = useState(false);
    const [navTransform, setNavTransform] = useState('');
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

    const handleArrowClick = () => {
        if (showNav === true) {
            setNavTransform('transform ease-in-out duration-300 translate-x-0');
            setTimeout(() => {
                setNavTransform('transform translate-x-0');
            }, 300);
        } else {
            setNavTransform('transform ease-in-out duration-300 translate-x-[150px]');
            setTimeout(() => {
                setNavTransform('transform translate-x-[150px]');
            }, 300);
        }
        setShowNav(!showNav);
    }

    return (
        <div data-testid='container' className={`box-border fixed top-0 left-[-150px] md:left-0 ${navTransform} md:transform-none md:duration-0 z-10 grid grid-rows-[auto,auto,auto,1fr] grid-cols-[118px] md:grid-rows-1 md:grid-cols-[1fr_auto_1fr] md:justify-between items-center md:w-screen h-full md:h-20 bg-black text-base text-white gap-8 pt-8 md:pt-0 px-4 md:px-[1.5%]`}>
            <div className='absolute md:hidden right-[-32px] self-align-center w-16 h-16 rounded-[50%] bg-black hover:opacity-70'>
                {!showNav ? (
                    <MdChevronRight onClick={handleArrowClick} className='pl-[20px] h-16 w-16' />
                ) : (
                    <MdChevronLeft onClick={handleArrowClick} className='pl-[20px] h-16 w-16' />
                )}

            </div>

            <div className='justify-self-start flex flex-col md:flex-row gap-x-3 gap-y-3'>
                <button onClick={(e) => handleTypeClick(e)} value={null} className='text-left md:text-center'>Home</button>
                <button data-testid='itemTypeButton' onClick={(e) => handleTypeClick(e)} value='hats'className='text-left md:text-center'>Hats</button>
                <button onClick={(e) => handleTypeClick(e)} value='sweatshirts' className='text-left md:text-center'>Sweatshirts</button>
                <button onClick={(e) => handleTypeClick(e)} value='shirts' className='text-left md:text-center'>Shirts</button>
                <button onClick={(e) => handleTypeClick(e)} value='pants' className='text-left md:text-center'>Pants</button>
                <button onClick={(e) => handleTypeClick(e)} value='shoes' className='text-left md:text-center'>Shoes</button>
            </div>

            <div className='row-start-1 md:row-auto font-pacifico text-3xl'>Brand</div>

            <div className='justify-self-start md:justify-self-end flex flex-col md:flex-row gap-x-3 gap-y-3'>
                
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
        </div>
    )
}