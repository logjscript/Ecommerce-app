import { useState, useEffect } from "react";
import { changeBorderColor } from "../utils";
import CreateUserButton from "./CreateUserButton";

export default function SignUp({ canceledFunc, setNewUserInfo, newUserInfo, setExistingAccount, signInError, setSignInError }) {

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
    const [passwordError, setPasswordError] = useState('');
    const errorMessage = signInError ? signInError : passwordError; 

    useEffect(() => {
        changeBorderColor(
            ...borderColors, 
            newUserInfo.password, 
            newUserInfo.verifyPassword,
            setInputColor,
            inputColor,
            setPasswordError
        );
    }, [newUserInfo.password, newUserInfo.verifyPassword]);


    function handleUserChange(e) {
        setNewUserInfo({
            ...newUserInfo,
            username: e.target.value
        })
        e.target.value ? (
            setInputColor({...inputColor, user: borderColors[0]})
        ) : (
            setInputColor({...inputColor, user: borderColors[1]})
        )
    }

    function handlePasswordChange(e) {
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
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20">
            <div className="w-[50%] h-[55%] bg-slate-100 border-4 border-solid border-gray-200 rounded-3xl grid grid-cols-[25%_1fr] grid-rows-[25%_repeat(4,1fr)] gap-y-2">
                <div className="relative flex justify-center items-start col-span-2 row-span-1">
                    <h1 className="text-3xl place-self-center text-gray-800 pt-4">
                        Sign Up
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
                    className="row-span-1 col-span-1 self-center justify-self-end text-gray-800 text-lg outline-none border{}"
                > 
                    Create Username:
                </label>
                <input 
                    type="text" 
                    id="userInput" 
                    value={newUserInfo.username}
                    onChange={(e) => handleUserChange(e)}
                    placeholder="Create your username here" 
                    className={`row-span-1 col-span-1 w-[90%] h-[80%] place-self-center rounded-lg border-solid border-2 ${inputColor.user} pl-4 text-lg`} />

                <label 
                    htmlFor="passInput" 
                    className="self-center justify-self-end text-gray-800 pl-5 text-lg"
                > 
                    Create Password:
                </label> 
                <input 
                    type="password" 
                    id="passInput" 
                    placeholder="Create your password here" 
                    value={newUserInfo.password}
                    onChange={(e) => handlePasswordChange(e)} 
                    className={`w-[90%] h-[80%] rounded-lg border-2 border-solid pl-4 text-lg place-self-center ${inputColor.password}`}
                />

                <label 
                    htmlFor="verifyPassInput" 
                    className="self-center justify-self-end text-gray-800 pl-5 text-lg"
                > 
                    Verify Password:
                </label>
                
                <input 
                    type="password" 
                    id="verifyPassInput" 
                    placeholder="Verify your password here" 
                    value={newUserInfo.verifyPassword}
                    onChange={(e) => handleVerifyChange(e)} 
                    className={`w-[90%] h-[80%] rounded-lg border-2 border-solid pl-4 text-lg ${inputColor.verifyPassword}`}
                />
                
                <div className="text-red-400 col-span-2 mx-auto place-self-center">
                    {errorMessage}
                </div>

                <CreateUserButton 
                    newUserInfo={newUserInfo} 
                    setNewUserInfo={setNewUserInfo}
                    setInputColor={setInputColor} 
                    setExistingAccount={setExistingAccount} 
                    setSignInError={setSignInError}
                    borderColors={borderColors}
                />
            </div>
        </div> 
    )
}