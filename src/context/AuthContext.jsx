import { createContext, useState, useEffect, useCallback } from "react";
import api from "../utils/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.data.user);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    setUser(res.data.data.user);
    return res.data;
  };

  const logout = async () => {
    await api.get("/auth/logout");
    setUser(null);
  };

  const isAdmin = user?.role === "admin";
  const isSubscribed =
    user?.subscription?.status === "active" &&
    user?.subscription?.endDate &&
    new Date(user.subscription.endDate) > new Date();

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAdmin,
        isSubscribed,
        fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
