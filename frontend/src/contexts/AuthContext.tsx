import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { getUser, removesTokens, removeUser, getToken } from "../utils/tokens.utils";
import AuthService from "../services/auth.service";
import { AxiosResponse } from "axios";
import api from "../api/axios";

interface AuthContextType {
    user: ReturnType<typeof getUser>;
    isLoggedIn: boolean;
    login(): Promise<void>;
    logout(): Promise<AxiosResponse<unknown, unknown> | undefined>;
    loginSession(): Promise<void>;
    clearSession(): void;
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
    const [user, setUser] = useState(() => getUser());
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const accessToken = getToken("accessToken");
        const refreshToken = getToken("refreshToken");
        return !!(accessToken && refreshToken && getUser());
    });
    const authService = new AuthService();

    const clearSession = () => {
        removesTokens();
        removeUser();
        setIsLoggedIn(false);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];

        if (typeof window !== "undefined") {
            window.localStorage.setItem('logout', Date.now().toString());
        }
    };

    // Synchronisation entre onglets
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'logout') {
                clearSession();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Gestion des sessions expirées
    useEffect(() => {
        const handleSessionExpired = () => {
            clearSession();
            window.location.href = '/login';
        };

        window.addEventListener('sessionExpired', handleSessionExpired);

        return () => {
            window.removeEventListener('sessionExpired', handleSessionExpired);
        };
    }, []);

    // Vérification initiale de l'authentification
    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = getToken("accessToken");
            const refreshToken = getToken("refreshToken");

            if (accessToken && refreshToken) {
                try {
                    const response = await authService.getUser();
                    if (response.status === 200) {
                        const userData = response.data;
                        setUser({
                            ...userData,
                            userId: userData.userId ?? userData.id,
                            id: userData.id,
                        });
                        setIsLoggedIn(true);
                    } else {
                        clearSession();
                    }
                } catch (error) {
                    console.error("Erreur lors de la vérification de l'authentification:", error);
                    clearSession();
                }
            }
        };

        checkAuth();
    }, []);

    const login = async () => {
        try {
            const response = await authService.getUser();
            const userData = response.data;
            setUser({
                ...userData,
                userId: userData.userId ?? userData.id,
                id: userData.id,
            });
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            clearSession();
            throw error;
        }
    };

    const logout = async () => {
        try {
            const response = await authService.logout();
            clearSession();

            // Notifier les autres onglets
            if (typeof window !== "undefined") {
                window.localStorage.setItem('logout', Date.now().toString());
            }

            return response;
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
            clearSession();
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
                    const userData = response.data;
                    setUser({
                        ...userData,
                        userId: userData.userId ?? userData.id,
                        id: userData.id,
                    });
                    setIsLoggedIn(true);
                } else {
                    clearSession();
                }
            } catch (error) {
                console.error("Erreur lors de la vérification de la session:", error);
                clearSession();
            }
        } else {
            clearSession();
        }
    };

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        loginSession,
        clearSession,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}