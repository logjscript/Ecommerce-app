import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const SignIn = () => {
    const [newUserInfo, setNewUserInfo] = useState({
        username: '', 
        password: '', 
        verifyPassword: '',
        passwordMatch: true
    });
    const [existingAccount, setExistingAccount] = useState(true);
    const [signInError, setSignInError] = useState(null);
    const [loading, setLoading] = useState(false);


    return (
        existingAccount ? (
            <LogIn 
                setExistingAccount={setExistingAccount} 
                signInError={signInError}
                setSignInError={setSignInError}
                loading={loading}
                setLoading={setLoading}
            />
        ) : (
           <SignUp 
                setNewUserInfo={setNewUserInfo} 
                newUserInfo={newUserInfo} 
                setExistingAccount={setExistingAccount} 
                signInError={signInError}
                setSignInError={setSignInError}
                loading={loading}
                setLoading={setLoading}
           />
        )
    )
}

export default SignIn;