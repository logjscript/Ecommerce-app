import { createContext, useState } from "react";

export const UserContext = createContext('user');

export default function UserProvider({ children }) {
    const [itemType, setItemType] = useState(null);
    const [userSignedIn, setUserSignedIn] = useState(false);
    const [cancelSignIn, setCancelSignIn] = useState(true);
    const [signedInUserInfo, setSignedInUserInfo] = useState({
        username: '',
        password: '',
        items: []
    });

    return (
        <UserContext.Provider value={{ itemType, setItemType, userSignedIn, setUserSignedIn, cancelSignIn, setCancelSignIn, signedInUserInfo, setSignedInUserInfo }}>
            {children}
        </UserContext.Provider>
    )
}