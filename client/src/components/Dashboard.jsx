import React, { useState, useEffect } from 'react';

export default function Dashboard () {
    return (
        <div className='bg-slate-100 w-screen h-12 flex justify-between items-center'>
            
            <div className='flex justify-end items-center gap-6 ml-6'>
                <button className='dashboard-header'>Hats</button>
                <button className='dashboard-header'>Sweatshirts</button>
                <button className='dashboard-header'>T-Shirts</button>
                <button className='dashboard-header'>Pants</button>
                <button className='dashboard-header'>Shoes</button>
            </div>

            <div className='flex justify-end items-center gap-6 mr-6'>
                <button className='dashboard-header'>Home</button>
                <button className='dashboard-header'>Sign in</button>
                <button className='dashboard-header'>
                    <svg className="w-6 h-6 text-gray-800 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9V4a3 3 0 0 0-6 0v5m9.92 10H2.08a1 1 0 0 1-1-1.077L2 6h14l.917 11.923A1 1 0 0 1 15.92 19Z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}