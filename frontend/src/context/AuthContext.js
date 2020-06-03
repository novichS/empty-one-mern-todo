import { createContext } from 'react';

function some() { }

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: some,
    logout: some,
    isAuthenticated: false
})