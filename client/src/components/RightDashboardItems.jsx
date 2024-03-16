
const RightDashboardItems = ({ classes, userSignedIn, handleItemTypeClick, handleSignOutClick, handleBagClick, setCancelSignIn, totalItems, setShowNav, testIdNumber }) => {
    return (
        <div className={classes}>
            <button 
                onClick={(e) => handleItemTypeClick(e)} 
                value={null} 
                className='text-left'
            >
                Home
            </button>

            {!userSignedIn ? (
                <button 
                    onClick={() => {setCancelSignIn(false); setShowNav(false);}} 
                    value='signIn'
                    className="text-left" 
                >
                    Sign in
                </button>
            ) : (
                <button 
                    data-testId={`signOutButton${testIdNumber}`}
                    className='text-left' 
                    onClick={handleSignOutClick}
                >
                    Sign Out
                </button>
            )}

            <button 
                data-testid={`bag${testIdNumber}`}
                onClick={() => handleBagClick()} 
                className='relative w-8'
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
    )
}

export default RightDashboardItems