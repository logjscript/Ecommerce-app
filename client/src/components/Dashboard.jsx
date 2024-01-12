import React, { useState, useEffect } from 'react';

export default function Dashboard () {
    return (
        <div className='bg-slate-100 w-screen h-20 flex items-center'>
            
            <div className='dashboard-group pl-6 justify-start'>
                <button className='dashboard-header-title'>Hats</button>
                <button className='dashboard-header-title'>Sweatshirts</button>
                <button className='dashboard-header-title'>T-Shirts</button>
                <button className='dashboard-header-title'>Pants</button>
                <button className='dashboard-header-title'>Shoes</button>
            </div>

            <div className='dashboard-group font-pacifico text-3xl justify-center'>Brand</div>

            <div className='dashboard-group justify-end pr-6'>
                <button className='dashboard-header-title'>Home</button>
                <button className='dashboard-header-title'>Sign in</button>
                <button className='dashboard-header-title'>
                    <svg className="w-6 h-6 text-gray-800 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9V4a3 3 0 0 0-6 0v5m9.92 10H2.08a1 1 0 0 1-1-1.077L2 6h14l.917 11.923A1 1 0 0 1 15.92 19Z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}