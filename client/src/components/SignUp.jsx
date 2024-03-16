import { useState, useEffect, useContext } from "react";
import { changeBorderColor } from "../utils";
import CreateUserButton from "./CreateUserButton";
import { UserContext } from "./UserContext";

const SignUp = ({ setNewUserInfo, newUserInfo, setExistingAccount, signInError, setSignInError, setLoading, loading }) => {
    const { setCancelSignIn } = useContext(UserContext);
    const borderColors = {
        green: 'border-green-500 shadow-sm outline-none',
        gray: 'border-gray-400 shadow-sm',
        red: 'border-red-500 shadow-sm outline-none',
    }
    const [inputColor, setInputColor] = useState({
        user: borderColors.gray, 
        password: borderColors.gray, 
        verifyPassword: borderColors.gray
    });

    useEffect(() => {
        changeBorderColor(
            borderColors, 
            newUserInfo.password, 
            newUserInfo.verifyPassword,
            setInputColor,
            inputColor,
        );
    }, [newUserInfo.password, newUserInfo.verifyPassword]);

    const handleUserChange = (e) => {
        setSignInError('');
        setNewUserInfo({
            ...newUserInfo,
            username: e.target.value
        })

       
        if (e.target.value) {
            setInputColor({...inputColor, user: borderColors.green})
        } else {
            setInputColor({...inputColor, user: borderColors.gray})
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
            <div className="w-[45%] min-w-[370px] h-[57%] bg-gradient-to-br from-gray-300 to-white rounded-3xl grid grid-rows-[25%_repeat(3,1fr)_20%] grid-cols-1 gap-y-2">
                <div className="relative flex justify-center items-start">
                    <h1 className="text-4xl place-self-center font-pacifico p-2">
                        Sign Up
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
                    value={newUserInfo.username}
                    onChange={(e) => handleUserChange(e)}
                    placeholder="Create your username here" 
                    className={`w-[85%] h-[60px] rounded-lg border-2 border-solid pl-4 text-lg place-self-center ${inputColor.user}`} 
                />

                <input 
                    type="password" 
                    id="passInput" 
                    placeholder="Create your password here" 
                    value={newUserInfo.password}
                    onChange={(e) => handlePasswordChange(e)} 
                    className={`w-[85%] h-[60px] rounded-lg border-2 border-solid pl-4 text-lg place-self-center ${inputColor.password}`}
                />
                
                <input 
                    type="password" 
                    id="verifyPassInput" 
                    placeholder="Verify your password here" 
                    value={newUserInfo.verifyPassword}
                    onChange={(e) => handleVerifyChange(e)} 
                    className={`w-[85%] h-[60px] rounded-lg border-2 border-solid pl-4 text-lg place-self-center ${inputColor.verifyPassword}`}
                />

                <div className="relative flex justify-center items-center w-full h-full">
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
                        gray={borderColors.gray}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div> 
    )
}

export default SignUp;