import { checkUserInfo } from "../utils";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";


export default function LogIn({ setExistingAccount, signInError, setSignInError }) {
    const { setSignedIn, setCanceled, userInfo, setUserInfo } = useContext(UserContext);
    const [checkLogInInfo, setCheckLogInInfo] = useState({
        username: '',
        password: ''
    });

    async function handleLogInButton() {
        try {
            const response = await checkUserInfo(checkLogInInfo, setUserInfo, setSignInError, setSignedIn);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div 
            data-testid='logInDiv'
            className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"
        >
            <div className="w-[45%] min-w-[350px] h-[57%] bg-slate-100 border-4 border-solid border-gray-200 rounded-3xl grid grid-rows-[30%] grid-cols-[100px_1fr]">  
                <div className="relative flex justify-center items-start col-span-2 row-span-1">
                    <h1 className="text-4xl place-self-center  font-pacifico pt-4">
                        Sign In
                    </h1>
                    <button 
                        onClick={() => setCanceled(true)} 
                        className="absolute left-3 top-3"
                    >
                        <img 
                            src="../../images/exit.svg" 
                            alt="an exit button"
                            className="w-3 h-3"
                        />
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
                    value={checkLogInInfo.username}
                    onChange={(e) => setCheckLogInInfo({...checkLogInInfo, username: e.target.value})}
                    placeholder="Add your username here" 
                    className="row-span-1 col-span-1 w-[85%] h-[60px] place-self-center rounded-lg border-solid border-2 border-gray-400 pl-4" 
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
                    value={checkLogInInfo.password}
                    onChange={(e) => setCheckLogInInfo({...checkLogInInfo, password: e.target.value})}
                    placeholder="Add your password here"  
                    className="w-[85%] h-[60px] place-self-center rounded-lg border-solid border-2 border-gray-400 pl-4"
                />
                
                <div className="col-span-2 relative flex justify-center items-end w-full h-full">
                    <button 
                        className='bg-gray-800 text-white rounded-3xl w-36 h-11 text-xl hover:opacity-50 ease-in-out duration-200' 
                        onClick={async () => handleLogInButton()}
                    >
                        Log In
                    </button>

                    {signInError && <div data-testid='signInError' className="absolute top-[-7px] col-span-2 place-self-center text-red-400">{signInError}</div>}
                </div>
                

                <p className="col-span-2 place-self-center text-sm">
                    Don't have an account? 
                    <span 
                        data-testid='span'
                        onClick={() => setExistingAccount(false)} 
                        className="text-blue-500 cursor-pointer"
                    >
                        {' Click here'}
                    </span>
                </p>
            </div>
        </div> 
    )
}