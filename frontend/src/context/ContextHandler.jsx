import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    function Login(token){
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    }

    function Logout(){
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return(
        <AuthContext.Provider value={{isLoggedIn, Login, Logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
