/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import api from "@/lib/api";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  authReady: boolean; // NEW: signals auth state restored
  loading: boolean; // for login/register requests
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Restore user from localStorage synchronously
  const [user, setUser] = React.useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [authReady, setAuthReady] = React.useState(false); // NEW: marks auth state ready
  const [loading, setLoading] = React.useState(false); // for form submissions
  const [error, setError] = React.useState<string | null>(null);

  // Mark auth ready immediately (synchronous restore)
  React.useEffect(() => {
    console.log("AuthProvider mounted");
    console.log("Restored user:", user);
    setAuthReady(true);
  }, []);

  // When user changes
  React.useEffect(() => {
    console.log("Auth state changed:", { user, isAuthenticated: !!user });
  }, [user]);
  // Inside login
  const login = async (email: string, password: string) => {
    console.log("Login started:", { email });
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data.data;

      console.log("Login response:", response.data);

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err);
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      console.log("Login finished");
      setLoading(false);
    }
  };

  // Inside register
  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    console.log("Register started:", { username, email });
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      const { token, user } = response.data.data;

      console.log("Register response:", response.data);

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (err: any) {
      console.error("Register error:", err.response?.data || err);
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      console.log("Register finished");
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout"); // optional backend cleanup
    } catch (err) {
      void err;
    }
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        authReady, // new
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
