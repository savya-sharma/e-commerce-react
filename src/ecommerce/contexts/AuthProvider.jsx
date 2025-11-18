import { createContext, useContext, useEffect, useReducer, useState } from "react";
import instance from "../config/axiosConfig";
import { Navigate } from "react-router-dom";


const authContext = createContext();

function AuthProvider({ children }) {
    const initialState = {
        isLoggedIn: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    function authReducer(state, action) {
        switch (action.type) {
            case "LOGIN":
                return { ...state, isLoggedIn: true };
            case "LOGOUT":
                return { ...state, isLoggedIn: false };
            default:
                return state;
        }
    }

    useEffect(() => {
        checkAuthStatus();
    }, []);

    async function checkAuthStatus() {
        // console.log("inside authProvider");
        try {
            const response = await instance.get("/auth/authCheck", {
                withCredentials: true,
            });
            dispatch(true);
        } catch (error) {
            console.log(error);
            dispatch(false);
        }
    }

    async function logout() {
        try {
            await instance.post(
                "/auth/logout", {}, { withCredentials: true, }
            );
            dispatch(false);
            <Navigate to="/login" />;
        } catch (error) {
            console.log("clicked issue");
        }
    }

    return (
        <authContext.Provider value={{ state, checkAuthStatus, logout }}>
            {children}
        </authContext.Provider>
    );
}


export function useAuth() {
    return useContext(authContext);
}

export default AuthProvider;