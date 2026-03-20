import React, { createContext, useContext, useState, useCallback } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  joinedAt: string;
  lastLogin: string;
  device: string;
  ip: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  needs2FA: boolean;
  verify2FA: (code: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const DEMO_USER: User = {
  id: "usr_8k2m4n6p",
  email: "franklin.taipe",
  name: "Franklin Taipe",
  role: "user",
  joinedAt: "2024-09-15T10:30:00Z",
  lastLogin: new Date().toISOString(),
  device: "Chrome 120 / macOS",
  ip: "192.168.1.42",
};

const VALID_OTP_CODES = ["010062", "012301"];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [needs2FA, setNeeds2FA] = useState(false);
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    if (username === "franklin.taipe" && password === "Peru@2030") {
      setPendingUser(DEMO_USER);
      setNeeds2FA(true);
      return true;
    }
    return false;
  }, []);

  const verify2FA = useCallback((code: string) => {
    if (VALID_OTP_CODES.includes(code)) {
      setUser(pendingUser);
      setNeeds2FA(false);
      setPendingUser(null);
      return true;
    }
    return false;
  }, [pendingUser]);

  const logout = useCallback(() => {
    setUser(null);
    setNeeds2FA(false);
    setPendingUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, needs2FA, verify2FA }}>
      {children}
    </AuthContext.Provider>
  );
};
