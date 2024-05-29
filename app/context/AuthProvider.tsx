// AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSegments, useRouter } from "expo-router";

type User = {
  name: string;
};

type AuthType = {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthType>({
  user: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/login");
    } else if (user && inAuthGroup) {
      router.replace("/home");
    }
  }, [user, segments]);

  const login = (email: string, password: string) => {
    // Perform login logic, e.g., API call
    // Assume successful login for demonstration
    setUser({ name: "John Doe" });
  };

  const signup = (email: string, password: string) => {
    // Perform signup logic, e.g., API call
    // Assume successful signup for demonstration
    setUser({ name: "New User" });
  };

  const logout = () => {
    // Perform logout logic, e.g., clear session
    setUser(null);
  };

  const authContext: AuthType = {
    user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
