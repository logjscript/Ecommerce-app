import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

export default function SignIn({ signedInFunc, canceledFunc, setUserInfo, userInfo }) {
    
    const [newUserInfo, setNewUserInfo] = useState({
        username: '', 
        password: '', 
        verifyPassword: '',
        passwordMatch: true
    });
    const [errorIsVisible, setErrorIsVisible] = useState(false);
    const [existingAccount, setExistingAccount] = useState(true);
    const [signInError, setSignInError] = useState(null);


    return (
        existingAccount ? (
            <LogIn 
                canceledFunc={canceledFunc} 
                setUserInfo={setUserInfo} 
                userInfo={userInfo} 
                setExistingAccount={setExistingAccount} 
                signedInFunc={signedInFunc}
                signInError={signInError}
                setErrorIsVisible={setErrorIsVisible}
                setSignInError={setSignInError}
            />
        ) : (
           <SignUp 
                errorIsVisible={errorIsVisible}
                canceledFunc={canceledFunc} 
                setNewUserInfo={setNewUserInfo} 
                newUserInfo={newUserInfo} 
                setExistingAccount={setExistingAccount} 
                signInError={signInError}
                setErrorIsVisible={setErrorIsVisible}
                setSignInError={setSignInError}
           />
        )
    )
}