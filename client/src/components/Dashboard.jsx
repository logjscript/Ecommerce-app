import React, { useState, useEffect } from 'react';

export default function Dashboard ({ handleClickDashboard, handleBagClick, canceledFunc, signedIn, username, userInfo, setUserInfo, setSignedIn, setCanceled, setType }) {

    const itemsInBag = userInfo.items?.reduce((acc, item) => {return item.quantity + acc}, 0);

    const handleClick = () => {
        setSignedIn(false);
        setCanceled(true);
        setType(null);
        setUserInfo({
            username: '',
            password: '',
            items: [],
            total: 0,
        })
    }

    return (
        <div className='bg-slate-100 w-screen min-h-20 flex items-center fixed top-0 z-10'>
            
            <div className='dashboard-group pl-6 justify-start'>
                <button onClick={(e) => handleClickDashboard(e)} value='hats'className='dashboard-header-title'>Hats</button>
                <button onClick={(e) => handleClickDashboard(e)} value='sweatshirts' className='dashboard-header-title'>Sweatshirts</button>
                <button onClick={(e) => handleClickDashboard(e)} value='tShirts' className='dashboard-header-title'>Tshirts</button>
                <button onClick={(e) => handleClickDashboard(e)} value='pants' className='dashboard-header-title'>Pants</button>
                <button onClick={(e) => handleClickDashboard(e)} value='shoes' className='dashboard-header-title'>Shoes</button>
            </div>

            <div className='dashboard-group font-pacifico text-3xl justify-center'>Brand</div>

            <div className='dashboard-group justify-end pr-6'>
                <button onClick={(e) => handleClickDashboard(e)} value={null} className='dashboard-header-title'>Home</button>
                {signedIn ? (<div className='dashboard-title-header'>Hello <br />{userInfo.username}</div>): (<button onClick={canceledFunc} value='signIn' className='dashboard-header-title'>Sign in</button>)}
                {signedIn && (<button onClick={handleClick}>Sign Out</button>)}
                <button onClick={() => handleBagClick()} className='relative dashboard-header-title'>
                    <svg className="w-8 h-8 text-gray-800 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9V4a3 3 0 0 0-6 0v5m9.92 10H2.08a1 1 0 0 1-1-1.077L2 6h14l.917 11.923A1 1 0 0 1 15.92 19Z"/>
                    </svg>
                    {itemsInBag > 0 && <div className='absolute flex justify-center items-center w-[22px] h-[22px] text-sm text-white bg-red-500 rounded-[50%] top-0 right-[-5px]'>{itemsInBag}</div>}
                </button>    
            </div>
        </div>
    )
}