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
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
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
  email: "demo@eduvault.io",
  name: "Alex Morgan",
  role: "user",
  joinedAt: "2024-09-15T10:30:00Z",
  lastLogin: new Date().toISOString(),
  device: "Chrome 120 / macOS",
  ip: "192.168.1.42",
};

const ADMIN_USER: User = {
  id: "adm_1a2b3c4d",
  email: "admin@eduvault.io",
  name: "System Admin",
  role: "admin",
  joinedAt: "2024-01-01T00:00:00Z",
  lastLogin: new Date().toISOString(),
  device: "Chrome 120 / Linux",
  ip: "10.0.0.1",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [needs2FA, setNeeds2FA] = useState(false);
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const u = email.includes("admin") ? ADMIN_USER : { ...DEMO_USER, email };
    setPendingUser(u);
    setNeeds2FA(true);
    return true;
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const u = { ...DEMO_USER, name, email, id: `usr_${Math.random().toString(36).slice(2, 10)}` };
    setPendingUser(u);
    setNeeds2FA(true);
    return true;
  }, []);

  const verify2FA = useCallback((code: string) => {
    if (code.length === 6) {
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
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, needs2FA, verify2FA }}>
      {children}
    </AuthContext.Provider>
  );
};
