import { itemsInBag } from "../utils";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Dashboard () {
    const { setType, signedIn, setSignedIn, setCanceled, userInfo, setUserInfo } = useContext(UserContext);
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

    function handleTypeClick(e) {
        setType(e.target.value);
        window.scrollTo(0,0);
    }

    function handleBagClick() {
        if (!signedIn) {
          setCanceled(false);
        } else {
          setType('bag');
          window.scrollTo(0,0);
        }
    }

    return (
        <div data-testid='container' className='bg-black opacity-85 w-screen min-h-20 flex items-center fixed top-0 z-10'>  
            <div className='dashboard-group pl-6 justify-start'>
                <button data-testid='itemTypeButton' onClick={(e) => handleTypeClick(e)} value='hats'className='dashboard-header-title'>Hats</button>
                <button onClick={(e) => handleTypeClick(e)} value='sweatshirts' className='dashboard-header-title'>Sweatshirts</button>
                <button onClick={(e) => handleTypeClick(e)} value='tShirts' className='dashboard-header-title'>Tshirts</button>
                <button onClick={(e) => handleTypeClick(e)} value='pants' className='dashboard-header-title'>Pants</button>
                <button onClick={(e) => handleTypeClick(e)} value='shoes' className='dashboard-header-title'>Shoes</button>
            </div>

            <div className='dashboard-group text-white font-pacifico text-3xl justify-center'>Brand</div>

            <div className='dashboard-group justify-end pr-6'>
                <button 
                    onClick={(e) => handleTypeClick(e)} 
                    value={null} 
                    className='dashboard-header-title'
                >
                    Home
                </button>

                {signedIn ? (
                    <div className='dashboard-title-header text-white'>Hello <br />{userInfo.username}</div>
                ) : (
                    <button 
                        onClick={() => setCanceled(false)} 
                        value='signIn' 
                        className='dashboard-header-title text-white'
                    >
                        Sign in
                    </button>
                )}
                
                {signedIn && (<button className='text-white' onClick={handleSignOutClick}>Sign Out</button>)}

                <button 
                    data-testid='bag'
                    onClick={() => handleBagClick()} 
                    className='relative dashboard-header-title text-white'
                >
                    <svg className="w-8 h-8 white dark:white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9V4a3 3 0 0 0-6 0v5m9.92 10H2.08a1 1 0 0 1-1-1.077L2 6h14l.917 11.923A1 1 0 0 1 15.92 19Z"/>
                    </svg>

                    {totalItems > 0 && <div data-testid='itemQuantity' className='absolute flex justify-center items-center w-[22px] h-[22px] text-sm text-white bg-red-500 rounded-[50%] top-0 right-[-5px]'>{totalItems}</div>}
                </button>    
            </div>
        </div>
    )
}