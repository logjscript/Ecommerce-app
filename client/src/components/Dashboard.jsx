import { countItemsInBag } from "../utils";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { FaBars, FaTimes } from 'react-icons/fa';
import LeftDashboardItems from "./LeftDashboardItems";
import RightDashboardItems from "./RightDashboardItems";

const Dashboard = () => {
    const { setItemType, userSignedIn, setUserSignedIn, setCancelSignIn, signedInUserInfo, setSignedInUserInfo } = useContext(UserContext);
    const [showNav, setShowNav] = useState(false);
    const totalItems = countItemsInBag(signedInUserInfo?.items);

    const handleSignOutClick = () => {
        setUserSignedIn(false);
        setCancelSignIn(true);
        setItemType(null);
        setSignedInUserInfo({
            username: '',
            password: '',
            items: [],
            total: 0,
        });
        setShowNav(false);
    }

    const handleItemTypeClick = (e) => {
        setItemType(e.target.value);
        setShowNav(false);
        window.scrollTo(0,0);
    }

    const handleBagClick = () => {
        if (!userSignedIn) {
          setCancelSignIn(false);
        } else {
          setItemType('bag');
          window.scrollTo(0,0);
        }
        setShowNav(false);
    }

    return (
        <nav data-testid='container' className={`fixed top-0 box-border z-30 grid grid-rows-1 grid-cols-[1fr_auto_1fr] justify-between items-center w-screen h-20 bg-black text-base text-white gap-8 px-[1.5%]`}>
            <LeftDashboardItems 
                handleItemTypeClick={handleItemTypeClick} 
                testIdNumber={'1'}
                classes={'justify-self-start hidden custom-md:flex text-sm gap-x-3 gap-y-3'
            } />

            <button 
                value={null} 
                onClick={(e) => handleItemTypeClick(e)} 
                className='col-start-2 font-pacifico text-4xl'
            >
                Pacific Clothing
            </button>

            <RightDashboardItems 
                handleItemTypeClick={handleItemTypeClick}
                handleBagClick={handleBagClick} 
                handleSignOutClick={handleSignOutClick} 
                setCancelSignIn={setCancelSignIn} 
                totalItems={totalItems} 
                userSignedIn={userSignedIn} 
                testIdNumber={'2'}
                classes={'justify-self-end hidden custom-md:flex text-sm gap-x-3 gap-y-3'} 
                setShowNav={setShowNav}
            />


            {/* hamburger menu */}
            <div 
                onClick={() => setShowNav(!showNav)} 
                className="relative justify-self-end custom-md:hidden z-40 mr-4"
            >
                {!showNav ? <FaBars size={20} /> : <FaTimes size={20} />}
                {(totalItems > 0 && !showNav) && 
                    <div 
                        data-testid='dashIconItemCount' 
                        className='absolute flex justify-center items-center w-[22px] h-[22px] text-sm bg-red-500 rounded-[50%] top-[-13px] right-[-13px]'
                    >
                        {totalItems}
                    </div>
                }
            </div>
            
            <div className={!showNav ? 'hidden' : 'fixed top-0 left-0 w-full h-screen bg-black flex justify-center items-center text-4xl opacity-90 text-white font-pacifico'}>
                <div className="flex flex-col gap-16 pl-[10%]">
                    <LeftDashboardItems 
                        handleItemTypeClick={handleItemTypeClick}
                        testIdNumber={'2'}
                        classes={'flex flex-col gap-6'}
                    />

                    <RightDashboardItems 
                        handleItemTypeClick={handleItemTypeClick}
                        handleBagClick={handleBagClick} 
                        handleSignOutClick={handleSignOutClick} 
                        setCancelSignIn={setCancelSignIn} 
                        totalItems={totalItems} 
                        userSignedIn={userSignedIn} 
                        testIdNumber={'1'}
                        classes={'flex flex-col gap-6'} 
                        setShowNav={setShowNav}
                    />
                </div>
            </div>
        </nav>
    )
}

export default Dashboard;