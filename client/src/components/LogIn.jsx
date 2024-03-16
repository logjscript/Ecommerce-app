import { useContext, useState } from "react";
import { checkUserInfo } from "../utils";
import { UserContext } from "./UserContext";


const LogIn = ({ setExistingAccount, signInError, setSignInError, loading, setLoading }) => {
    const { setUserSignedIn, setCancelSignIn, setSignedInUserInfo } = useContext(UserContext);
    const [userInputInfo, setUserInputInfo] = useState({
        username: '',
        password: ''
    });

    const handleClick = async () => {
        try {
            setSignInError(null);
            setLoading(true);
            await checkUserInfo(userInputInfo, setSignedInUserInfo, setSignInError, setUserSignedIn);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <div 
            data-testid='logInDiv'
            className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"
        >
            <div className="w-[45%] min-w-[350px] h-[57%] bg-gradient-to-br from-gray-300 to-white rounded-3xl grid grid-rows-[30%] grid-cols-1">  
                <div className="relative flex justify-center items-start row-span-1">
                    <h1 className="text-4xl place-self-center font-pacifico pt-4">
                        Sign In
                    </h1>

                    <button 
                        onClick={() => setCancelSignIn(true)} 
                        className="absolute right-3 top-3"
                    >
                        <img 
                            src="../../images/exit.svg" 
                            alt="an exit button"
                            className="w-4 h-4"
                        />
                    </button>
                </div>

                <input 
                    type="text" 
                    id="userInput" 
                    value={userInputInfo.username}
                    onChange={(e) => setUserInputInfo({...userInputInfo, username: e.target.value})}
                    placeholder="Add your username here" 
                    className="row-span-1 w-[85%] h-[60px] place-self-center rounded-lg border-solid border-2 border-gray-400 pl-4" 
                />

                <input 
                    type="password" 
                    id="passInput" 
                    value={userInputInfo.password}
                    onChange={(e) => setUserInputInfo({...userInputInfo, password: e.target.value})}
                    placeholder="Add your password here"  
                    className="w-[85%] h-[60px] place-self-center rounded-lg border-solid border-2 border-gray-400 pl-4"
                />
                
                <div className="relative flex justify-center items-center w-full h-full">
                    <button 
                        className='bg-gray-800 text-white rounded-3xl w-36 h-11 text-xl hover:opacity-50 ease-in-out duration-200' 
                        onClick={async () => handleClick()}
                    >
                        Log In
                    </button>

                    {signInError && <div data-testid='signInError' className="absolute top-[-12px] place-self-center text-red-400">{signInError}</div>}
                    
                    {loading && <div className="absolute top-[-12px] place-self-center">Checking user data...</div>}
                </div>
                

                <p className="place-self-center text-sm">
                    Don't have an account? 
                    <span 
                        data-testid='span'
                        onClick={() => {setExistingAccount(false); setSignInError(null);}} 
                        className="text-blue-500 cursor-pointer"
                    >
                        {' Click here'}
                    </span>
                </p>
            </div>
        </div> 
    )
}

export default LogIn;