import { createContext, useContext, useState, useEffect } from "react";
import checkAuth from "@/app/actions/checkAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {  
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            const { isAuthenticated, isAdmin, user } = await checkAuth();
            setIsAuthenticated(isAuthenticated);
            setIsAdmin(isAdmin);
            setCurrentUser(user);
        }

        checkAuthentication();
    }, []);

    const refreshAuth = async () => {
        const { isAuthenticated, isAdmin, user } = await checkAuth();
        setIsAuthenticated(isAuthenticated);
        setIsAdmin(isAdmin);
        setCurrentUser(user);
    };


    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isAdmin,
            setIsAuthenticated,
            setIsAdmin,
            currentUser,
            setCurrentUser,
            refreshAuth
        }}>
            { children }
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
   
    if (!context) {
        throw new Error("useAuth MUST be used within an AuthProvider");
    }

    return context;
};
