'use client'

import React, {createContext, useState, ReactNode, Dispatch, SetStateAction} from 'react';
import {UserQuery} from "@/api/user/AuthAndRegistration";


interface AuthContextType {
    loggedStatus: boolean;
    authedUserInfo: UserQuery;
    setLoggedStatus: Dispatch<SetStateAction<boolean>>;
    setAuthedUserInfo: Dispatch<SetStateAction<UserQuery>>;
}

export const AuthContext = createContext<AuthContextType>({
    loggedStatus: false,
    authedUserInfo: {} as UserQuery,
    setLoggedStatus: () => {
    },
    setAuthedUserInfo: () => {
    },
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [loggedStatus, setLoggedStatus] = useState(false);
    const [authedUserInfo, setAuthedUserInfo] = useState <UserQuery > ({} as UserQuery);

    return (
        <AuthContext.Provider value={{loggedStatus, authedUserInfo, setLoggedStatus, setAuthedUserInfo}}>
            {children}
        </AuthContext.Provider>
    );
};
