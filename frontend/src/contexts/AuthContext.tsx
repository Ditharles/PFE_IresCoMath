import { createContext, useState, ReactNode, useContext } from "react";
import { getUser } from "../utils/tokens.utils";
import AuthService from "../services/auth.service";

interface AuthContextType {
    user: ReturnType<typeof getUser>;
    isLoggedIn: boolean;
    login(email: string, password: string): Promise<void>;
    logout(): Promise<void>;
    loginSession(): Promise<void>;

}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(getUser);
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);
    const authService = new AuthService();

    const login = async (email: string, password: string) => {
      
        const response = await authService.login(email, password);
        setUser(getUser());
        setIsLoggedIn(true);
        return response;
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        setIsLoggedIn(false);
    };
    const loginSession = async () => {

        setUser(getUser());
        setIsLoggedIn(true);

    };

    return <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loginSession }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
