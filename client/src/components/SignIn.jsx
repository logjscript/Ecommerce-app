import { useEffect, useState } from "react";

export default function SignIn({ signedInFunc, canceledFunc, setUserInfo, userInfo }) {
    const [newUserInfo, setNewUserInfo] = useState({
        username: '', 
        password: '', 
        verifyPassword: '',
        passwordMatch: true
    });
    
    const [inputColor, setInputColor] = useState({
        user: 'border-gray-400 shadow-sm', 
        password: 'border-gray-400 shadow-sm', 
        verifyPassword: 'border-gray-400 shadow-sm'
    });
    const [errorIsVisible, setErrorIsVisible] = useState(false);
    const [existingAccount, setExistingAccount] = useState(true);
    const [signInError, setSignInError] = useState(null);

    useEffect(() => {
        if (newUserInfo.password) {
            if (newUserInfo.verifyPassword === '') {
                setInputColor({
                    ...inputColor,
                    password: 'border-green-500 shadow-sm outline-none', 
                    verifyPassword: 'border-gray-400 shadow-sm'
                });
            } else if (newUserInfo.verifyPassword && newUserInfo.verifyPassword !== newUserInfo.password){
                setInputColor({
                    ...inputColor,
                    password: 'border-red-500 shadow-sm outline-none',
                    verifyPassword: 'border-red-500 shadow-sm outline-none'
                });
            } else {
                setInputColor({
                    ...inputColor,
                    password: 'border-green-500 shadow-sm outline-none',
                    verifyPassword: 'border-green-500 shadows-sm outline-none'
                });
            }
        } else if (newUserInfo.verifyPassword && newUserInfo.password === ''){
            setInputColor({
                ...inputColor,
                password: 'border-red-500 shadow-sm outline-none',
                verifyPassword: 'border-red-500 shadow-sm outline-none'
            })
        } else {
            setInputColor({
                ...inputColor,
                password: 'border-gray-400 shadow-sm',
                verifyPassword: 'border-gray-400 shadow-sm'
            });
        }
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

    function handleButtonClick() {
        // submit info to db

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
                user: 'border-gray-400 shadow-sm', 
                password: 'border-gray-400 shadow-sm', 
                verifyPassword: 'border-gray-400 shadow-sm'
            })
            setErrorIsVisible(false);
            setExistingAccount(true);
        } else {
            setErrorIsVisible(true);
        }
    }

    async function fetchUsername() {
        try {
            const response = await fetch(`http://localhost:5200/api/v1/users/${userInfo.username}`);

            if (!response.ok) {
                throw new Error('Username does not exist');
            } 

            const [{ username, password, items, total }] = await response.json();

            if (userInfo.password !== password) {
                throw new Error('Password is incorrect');
            }

            setUserInfo({
                username: username,
                password: password,
                items: items, 
                total: total
            })
            signedInFunc();
        } catch (error) {
            console.error(error);
            setSignInError(error.message);
        }
    }

    async function handleLogInButton() {
        setErrorIsVisible(null);
        fetchUsername().then(username => console.log(username));
    }

    return (
        existingAccount ? (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20">
                <div className="w-[50%] h-[55%] bg-slate-100 border-4 border-solid border-gray-200 rounded-3xl grid grid-cols-[25%_1fr] grid-rows-[25%_repeat(3,1fr)_repeat(2,.5fr)] gap-y-2">
                    
                    <div className="relative flex justify-center items-start col-span-2 row-span-1">
                        <h1 className="text-3xl place-self-center text-gray-800 pt-4">Sign In</h1>
                        <button  onClick={canceledFunc} className="absolute right-[.75rem] top-[.3rem] text-xl text-gray-500">x</button>
                    </div>

                    <label htmlFor="userInput" className="row-span-1 col-span-1 self-center justify-self-end text-gray-800">Username:</label>
                    <input type="text" 
                           id="userInput" 
                           value={userInfo.username}
                           onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}
                           placeholder="Add your username here" 
                           className="row-span-1 col-span-1 w-[90%] h-[80%] place-self-center rounded-lg border-solid border-2 border-gray-400 pl-4" 
                    />

                    <label htmlFor="passInput" className="self-center justify-self-end text-gray-800">Password:</label>
                    <input type="password" 
                           id="passInput" 
                           value={userInfo.password}
                           onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                           placeholder="Add your password here"  
                           className="w-[90%] h-[80%] place-self-center rounded-lg border-solid border-2 border-gray-400 pl-4"
                    />
                    
                    <button className='col-span-2 place-self-center bg-gray-800 text-white rounded-3xl w-36 h-11 text-xl hover:opacity-50 ease-in-out duration-200' onClick={async () => handleLogInButton()}>Log In</button>

                    {signInError && (<div className="text-red-400 col-span-2 mx-auto place-self-center">{signInError}</div>)}

                    <p className="col-span-2 place-self-center text-sm">Don't have an account? <span onClick={() => setExistingAccount(false)} className="text-blue-500 cursor-pointer">Click here</span></p>
                </div>
            </div> 
        ) : (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20">
                <div className="w-[50%] h-[55%] bg-slate-100 border-4 border-solid border-gray-200 rounded-3xl grid grid-cols-[25%_1fr] grid-rows-[25%_repeat(4,1fr)] gap-y-2">

                    <div className="relative flex justify-center items-start col-span-2 row-span-1">
                        <h1 className="text-3xl place-self-center text-gray-800 pt-4">Sign Up</h1>
                        <button onClick={canceledFunc} className="absolute right-[.75rem] top-[.3rem] text-xl text-gray-500">x</button>
                        {errorIsVisible && (<div className="absolute bottom-[-.4rem] left-[30%] text-red-400 text-lg">Please fill in all required fields</div>)}
                    </div>
    
                    <label htmlFor="userInput" className="row-span-1 col-span-1 self-center justify-self-end text-gray-800 text-lg outline-none border{}"> Create Username:</label>
                    <input type="text" 
                           id="userInput" 
                           value={newUserInfo.username}
                           onChange={(e) => handleUserChange(e)}
                           placeholder="Create your username here" 
                           className={`row-span-1 col-span-1 w-[90%] h-[80%] place-self-center rounded-lg border-solid border-2 ${inputColor.user} pl-4 text-lg`} />
    
                    <label htmlFor="passInput" className="self-center justify-self-end text-gray-800 pl-5 text-lg"> Create Password:</label> 
                    <input type="password" 
                           id="passInput" 
                           placeholder="Create your password here" 
                           value={newUserInfo.password}
                           onChange={(e) => handlePassChange(e)} 
                           className={`w-[90%] h-[80%] rounded-lg border-2 border-solid pl-4 text-lg place-self-center ${inputColor.password}`}
                    />
    
                    <label htmlFor="verifyPassInput" className="self-center justify-self-end text-gray-800 pl-5 text-lg"> Verify Password:</label>
                    <div className='w-full h-full flex justify-center items-center relative'>
                        <input type="password" 
                            id="verifyPassInput" 
                            placeholder="Verify your password here" 
                            value={newUserInfo.verifyPassword}
                            onChange={(e) => handleVerifyChange(e)} 
                            className={`w-[90%] h-[80%] rounded-lg border-2 border-solid pl-4 text-lg ${inputColor.verifyPassword}`}
                        />
                        {(!newUserInfo.passwordMatch) && <div className="absolute left-[10%] bottom-[-1rem] text-red-400 text-sm z-30">Passwords do not match</div>}
                    </div>

                    <button onClick={handleButtonClick} className='col-span-2 place-self-center bg-gray-800 text-white rounded-3xl w-44 h-11 text-xl hover:opacity-50 ease-in-out duration-200'>Create Account</button>
                </div>
            </div> 
        )
    )
}