import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Get initial user from localStorage
const getInitialUser = () => {
  const savedUser = localStorage.getItem("easypump_user");
  return savedUser ? JSON.parse(savedUser) : null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("easypump_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("easypump_user");
    localStorage.removeItem("easypump_redirect");
  };

  // Store redirect info for after login
  const setRedirectAfterLogin = (redirectInfo) => {
    localStorage.setItem("easypump_redirect", JSON.stringify(redirectInfo));
  };

  const getRedirectAfterLogin = () => {
    const saved = localStorage.getItem("easypump_redirect");
    if (saved) {
      localStorage.removeItem("easypump_redirect");
      return JSON.parse(saved);
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        setRedirectAfterLogin,
        getRedirectAfterLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
