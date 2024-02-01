import { fetchUsername } from "../utils";

export default function LogIn({ canceledFunc, setUserInfo, userInfo, setExistingAccount, signedInFunc, signInError, setSignInError }) {

    async function handleLogInButton() {
        try {
            const response = await fetchUsername(userInfo, setUserInfo, setSignInError, signedInFunc);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20">
            <div className="w-[50%] h-[55%] bg-slate-100 border-4 border-solid border-gray-200 rounded-3xl grid grid-cols-[25%_1fr] grid-rows-[25%_repeat(3,1fr)_repeat(2,.5fr)] gap-y-2">  
                <div className="relative flex justify-center items-start col-span-2 row-span-1">
                    <h1 className="text-3xl place-self-center text-gray-800 pt-4">
                        Sign In
                    </h1>
                    <button 
                        onClick={canceledFunc} 
                        className="absolute right-[.75rem] top-[.3rem] text-xl text-gray-500"
                    >
                        x
                    </button>
                </div>

                <label 
                    htmlFor="userInput" 
                    className="row-span-1 col-span-1 self-center justify-self-end text-gray-800"
                >
                    Username:
                </label>
                <input 
                    type="text" 
                    id="userInput" 
                    value={userInfo.username}
                    onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}
                    placeholder="Add your username here" 
                    className="row-span-1 col-span-1 w-[90%] h-[80%] place-self-center rounded-lg border-solid border-2 border-gray-400 pl-4" 
                />

                <label 
                    htmlFor="passInput" 
                    className="self-center justify-self-end text-gray-800"
                >
                    Password:
                </label>
                <input 
                    type="password" 
                    id="passInput" 
                    value={userInfo.password}
                    onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                    placeholder="Add your password here"  
                    className="w-[90%] h-[80%] place-self-center rounded-lg border-solid border-2 border-gray-400 pl-4"
                />
                
                <button 
                    className='col-span-2 place-self-center bg-gray-800 text-white rounded-3xl w-36 h-11 text-xl hover:opacity-50 ease-in-out duration-200' 
                    onClick={async () => handleLogInButton()}
                >
                    Log In
                </button>

                {signInError && <div>{signInError}</div>}

                <p className="col-span-2 place-self-center text-sm">
                    Don't have an account? 
                    <span 
                        onClick={() => setExistingAccount(false)} 
                        className="text-blue-500 cursor-pointer"
                    >
                        Click here
                    </span>
                </p>
            </div>
        </div> 
    )
}