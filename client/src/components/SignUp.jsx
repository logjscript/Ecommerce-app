import { useState, useEffect, useContext } from "react";
import { changeBorderColor } from "../utils";
import CreateUserButton from "./CreateUserButton";
import { UserContext } from "./UserContext";

export default function SignUp({ setNewUserInfo, newUserInfo, setExistingAccount, signInError, setSignInError, setLoading, loading }) {
    const { setCanceled } = useContext(UserContext);

    const borderColors = [
        'border-green-500 shadow-sm outline-none',
        'border-gray-400 shadow-sm',
        'border-red-500 shadow-sm outline-none',
    ]

    const [inputColor, setInputColor] = useState({
        user: borderColors[1], 
        password: borderColors[1], 
        verifyPassword: borderColors[1]
    });

    useEffect(() => {
        changeBorderColor(
            ...borderColors, 
            newUserInfo.password, 
            newUserInfo.verifyPassword,
            setInputColor,
            inputColor,
        );
    }, [newUserInfo.password, newUserInfo.verifyPassword]);

    function handleUserChange(e) {
        setSignInError('');
        setNewUserInfo({
            ...newUserInfo,
            username: e.target.value
        })

       
        if (e.target.value) {
            setInputColor({...inputColor, user: borderColors[0]})
        } else {
            setInputColor({...inputColor, user: borderColors[1]})
        }
    }

    function handlePasswordChange(e) {
        setSignInError('');

        const passInput = e.target.value;
        let matchPasswords = passInput === newUserInfo.verifyPassword;
        if (newUserInfo.verifyPassword === ''){
            matchPasswords = true;
        }
        setNewUserInfo({
            ...newUserInfo,
            password: e.target.value,
            passwordMatch: matchPasswords
        })
    }

    function handleVerifyChange(e) {
        setSignInError('');
      
        const verifyPassInput = e.target.value;
        let matchPasswords = newUserInfo.password === verifyPassInput;
        if (e.target.value === ''){
            matchPasswords = true;
        }
        setNewUserInfo({
            ...newUserInfo,
            verifyPassword: e.target.value,
            passwordMatch: matchPasswords
        })
    }

    return (
        <div
            data-testid='signUpDiv' 
            className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"
        >
            <div className="w-[45%] min-w-[370px] h-[55%] bg-slate-100 border-4 border-solid border-gray-200 rounded-3xl grid grid-rows-[25%_repeat(3,1fr)_20%] grid-cols-[120px_1fr] gap-y-2">
                <div className="relative flex justify-center items-start col-span-2 row-span-1">
                    <h1 className="text-4xl place-self-center font-pacifico p-2">
                        Sign Up
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
                    className="self-center justify-self-end text-gray-800 pl-8 text-lg"
                > 
                    Create Username:
                </label>
                <input 
                    type="text" 
                    id="userInput" 
                    value={newUserInfo.username}
                    onChange={(e) => handleUserChange(e)}
                    placeholder="Create your username here" 
                    className={`w-[85%] h-[60px] rounded-lg border-2 border-solid pl-4 text-lg place-self-center ${inputColor.user}`} />

                <label 
                    htmlFor="passInput" 
                    className="self-center justify-self-end text-gray-800 pl-8 text-lg"
                > 
                    Create Password:
                </label> 
                <input 
                    type="password" 
                    id="passInput" 
                    placeholder="Create your password here" 
                    value={newUserInfo.password}
                    onChange={(e) => handlePasswordChange(e)} 
                    className={`w-[85%] h-[60px] rounded-lg border-2 border-solid pl-4 text-lg place-self-center ${inputColor.password}`}
                />

                <label 
                    htmlFor="verifyPassInput" 
                    className="self-center justify-self-end text-gray-800 pl-8 text-lg"
                > 
                    Verify Password:
                </label>
                
                <input 
                    type="password" 
                    id="verifyPassInput" 
                    placeholder="Verify your password here" 
                    value={newUserInfo.verifyPassword}
                    onChange={(e) => handleVerifyChange(e)} 
                    className={`w-[85%] h-[60px] rounded-lg border-2 border-solid pl-4 text-lg place-self-center ${inputColor.verifyPassword}`}
                />

                <div className="col-span-2 relative flex justify-center items-center w-full h-full">
                    <div className="absolute top-[-8px] text-red-400">
                        {!newUserInfo.passwordMatch ? 'Passwords do not match' : signInError}
                    </div>

                    {loading && <div className="absolute top-[-8px]">Creating user...</div>}

                    <CreateUserButton 
                        newUserInfo={newUserInfo} 
                        setNewUserInfo={setNewUserInfo}
                        setInputColor={setInputColor} 
                        setExistingAccount={setExistingAccount} 
                        setSignInError={setSignInError}
                        borderColors={borderColors}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div> 
    )
}