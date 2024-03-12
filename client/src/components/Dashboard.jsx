import { itemsInBag } from "../utils";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import {  FaBars, FaTimes } from 'react-icons/fa';
import LeftDashboardItems from "./LeftDashboardItems";
import RightDashboardItems from "./RightDashboardItems";

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
                <LeftDashboardItems classes={'justify-self-start hidden custom-md:flex text-sm gap-x-3 gap-y-3'} />

                <button value={null} onClick={(e) => handleTypeClick(e)} className='col-start-2 font-pacifico text-4xl'>Lodi NW</button>

                {/*hamburger menu */}
                <div onClick={() => setShowNav(!showNav)} className="relative justify-self-end custom-md:hidden z-40 mr-4">
                    {!showNav ? <FaBars size={20} /> : <FaTimes size={20} />}
                    {(totalItems > 0 && !showNav) && 
                        <div 
                            data-testid='itemQuantity' 
                            className='absolute flex justify-center items-center w-[22px] h-[22px] text-sm bg-red-500 rounded-[50%] top-[-13px] right-[-13px]'
                        >
                            {totalItems}
                        </div>
                    }
                </div>
                
                <div className={!showNav ? 'hidden' : 'fixed top-0 left-0 w-full h-screen bg-black flex justify-center items-center text-4xl opacity-90 text-white font-pacifico'}>
                    <div className="flex flex-col gap-16">
                        <LeftDashboardItems classes={'flex flex-col gap-6'} />

                        <RightDashboardItems 
                            handleBagClick={handleBagClick} 
                            handleSignOutClick={handleSignOutClick} 
                            setCanceled={setCanceled} 
                            totalItems={totalItems} 
                            signedIn={signedIn} 
                            classes={'flex flex-col gap-6'} 
                        />
                    </div>
                </div>

                {/* right items */}
                <RightDashboardItems 
                    handleBagClick={handleBagClick} 
                    handleSignOutClick={handleSignOutClick} 
                    setCanceled={setCanceled} 
                    totalItems={totalItems} 
                    signedIn={signedIn} 
                    classes={'justify-self-end hidden custom-md:flex text-sm gap-x-3 gap-y-3'} 
                />
            </nav>

    )
}