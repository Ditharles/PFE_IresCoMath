import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { getUser, removesTokens, removeUser, getToken } from "../utils/tokens.utils";
import AuthService from "../services/auth.service";
import { AxiosResponse } from "axios";

interface AuthContextType {
    user: ReturnType<typeof getUser>;
    isLoggedIn: boolean;
    login(): Promise<void>;
    logout(): Promise<AxiosResponse<unknown, unknown> | undefined>;
    loginSession(): Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
    }
    return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(getUser);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const accessToken = getToken("accessToken");
        const refreshToken = getToken("refreshToken");
        return !!(accessToken && refreshToken && getUser());
    });
    const authService = new AuthService();

    // Vérification initiale de l'authentification
    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = getToken("accessToken");
            const refreshToken = getToken("refreshToken");

            if (accessToken && refreshToken) {
                try {
                    const response = await authService.getUser();
                    if (response.status === 200) {
                        setUser(response.data);
                        setIsLoggedIn(true);
                    } else {
                        removesTokens();
                        removeUser();
                        setIsLoggedIn(false);
                    }
                } catch (error) {
                    console.error("Erreur lors de la vérification de l'authentification:", error);
                    removesTokens();
                    removeUser();
                    setIsLoggedIn(false);
                }
            }
        };

        checkAuth();
    }, []);

    // Vérification périodique de l'authentification
    useEffect(() => {
        if (isLoggedIn) {
            const interval = setInterval(async () => {
                const accessToken = getToken("accessToken");
                const refreshToken = getToken("refreshToken");

                if (!accessToken || !refreshToken) {
                    setIsLoggedIn(false);
                    setUser(null);
                    return;
                }

                try {
                    const response = await authService.getUser();
                    if (response.status !== 200) {
                        setIsLoggedIn(false);
                        setUser(null);
                        removesTokens();
                        removeUser();
                    }
                } catch (error) {
                    console.error("Erreur lors de la vérification périodique:", error);
                    setIsLoggedIn(false);
                    setUser(null);
                    removesTokens();
                    removeUser();
                }
            }, 5 * 60 * 1000); // Vérification toutes les 5 minutes

            return () => clearInterval(interval);
        }
    }, [isLoggedIn]);

    const login = async () => {
        const accessToken = getToken("accessToken");
        const refreshToken = getToken("refreshToken");
        const currentUser = getUser();

        if (accessToken && refreshToken && currentUser) {
            try {
                const response = await authService.getUser();
                if (response.status === 200) {
                    // Conserver à la fois userId (général) et id (sous-table)
                    const userData = response.data;
                    setUser({
                        ...userData,
                        userId: userData.userId ?? userData.id, // userId = id général
                        id: userData.id, // id = id sous-table (si présent)
                    });
                    setIsLoggedIn(true);
                } else {
                    removesTokens();
                    removeUser();
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Erreur lors de la vérification de l'authentification:", error);
                removesTokens();
                removeUser();
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    const logout = async () => {
        try {
            const response = await authService.logout();
            setUser(null);
            removesTokens();
            removeUser();
            setIsLoggedIn(false);
            return response;
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
            setUser(null);
            removesTokens();
            removeUser();
            setIsLoggedIn(false);
            throw error;
        }
    };

    const loginSession = async () => {
        const accessToken = getToken("accessToken");
        const refreshToken = getToken("refreshToken");
        const currentUser = getUser();

        if (accessToken && refreshToken && currentUser) {
            try {
                const response = await authService.getUser();
                if (response.status === 200) {
                    // Conserver à la fois userId (général) et id (sous-table)
                    const userData = response.data;
                    setUser({
                        ...userData,
                        userId: userData.userId ?? userData.id,
                        id: userData.id,
                    });
                    setIsLoggedIn(true);
                } else {
                    removesTokens();
                    removeUser();
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Erreur lors de la vérification de l'authentification:", error);
                removesTokens();
                removeUser();
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        loginSession,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
