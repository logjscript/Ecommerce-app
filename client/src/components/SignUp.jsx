import { useState, useEffect } from "react";
import { addUsername, changeBorderColor } from "../utils";

export default function SignUp({ canceledFunc, setNewUserInfo, newUserInfo, setExistingAccount, signInError, errorIsVisible, setErrorIsVisible, setSignInError }) {

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
            inputColor
        );
    }, [newUserInfo.password, newUserInfo.verifyPassword])

    function handleUserChange(e) {
        setNewUserInfo({
            ...newUserInfo,
            username: e.target.value
        })
        e.target.value ? setInputColor({...inputColor, user: 'border-green-500 shadow-sm outline-none'}) : setInputColor({...inputColor, user: 'border-gray-400 shadow-sm'})
    }

    function handlePassChange(e) {
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

    async function handleButtonClick() {
        if (!newUserInfo.username || 
            !newUserInfo.password || 
            !newUserInfo.verifyPassword) {
            
            setErrorIsVisible(true);
        }

        try {
            if (newUserInfo.username &&
                newUserInfo.password &&
                newUserInfo.verifyPassword &&
                newUserInfo.passwordMatch) {
    
                setNewUserInfo({
                    username: '', 
                    password: '', 
                    verifyPassword: '',
                    passwordMatch: true
                })
                setInputColor({
                    user: borderColors[1], 
                    password: borderColors[1], 
                    verifyPassword: borderColors[1]
                })
                await addUsername(newUserInfo);
                setErrorIsVisible(false);
                setExistingAccount(true);
            } 
        } catch (error) {
            if (error.message === 'Username already exists') {
                setSignInError(error.message);
            } 
        }   
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

                {errorIsVisible && (
                    <div className="absolute bottom-[-.4rem] left-[30%] text-red-400 text-lg">
                        Please fill in all required fields
                    </div>
                )}
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
                onChange={(e) => handlePassChange(e)} 
                className={`w-[90%] h-[80%] rounded-lg border-2 border-solid pl-4 text-lg place-self-center ${inputColor.password}`}
            />

            <label 
                htmlFor="verifyPassInput" 
                className="self-center justify-self-end text-gray-800 pl-5 text-lg"
            > 
                Verify Password:
            </label>
            <div className='w-full h-full flex justify-center items-center relative'>
                <input 
                    type="password" 
                    id="verifyPassInput" 
                    placeholder="Verify your password here" 
                    value={newUserInfo.verifyPassword}
                    onChange={(e) => handleVerifyChange(e)} 
                    className={`w-[90%] h-[80%] rounded-lg border-2 border-solid pl-4 text-lg ${inputColor.verifyPassword}`}
                />

                {(!newUserInfo.passwordMatch) && (
                    <div className="absolute left-[10%] bottom-[-1rem] text-red-400 text-sm z-30">
                        Passwords do not match
                    </div>
                )}
            </div>

            {signInError && (
                <div className="text-red-400 col-span-2 mx-auto place-self-center">
                    {signInError}
                </div>
            )}

            <button 
                onClick={handleButtonClick} 
                className='col-span-2 place-self-center bg-gray-800 text-white rounded-3xl w-44 h-11 text-xl hover:opacity-50 ease-in-out duration-200'
            >
                Create Account
            </button>
        </div>
    </div> 
    )
}