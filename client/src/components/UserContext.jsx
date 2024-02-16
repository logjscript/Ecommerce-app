import { createContext, useState } from "react";

export const UserContext = createContext('user');

export default function UserProvider({ children }) {
    const [type, setType] = useState(null);
    const [signedIn, setSignedIn] = useState(false);
    const [canceled, setCanceled] = useState(true);
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        items: []
    });

    return (
        <UserContext.Provider value={{ type, setType, signedIn, setSignedIn, canceled, setCanceled, userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    )
}