"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { account } from "@/config/appwriteClient";

const AuthContext = createContext();

const ADMIN_EMAILS = ["andy.short101@gmail.com"];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      const user = await account.get();

      const isAdmin = user.labels?.includes("admin") || ADMIN_EMAILS.includes(user.email);

      setIsAuthenticated(true);
      setCurrentUser(user);
      setIsAdmin(isAdmin);
    } catch {
      setIsAuthenticated(false);
      setCurrentUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Single auth check on app load
  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        currentUser,
        refreshAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
