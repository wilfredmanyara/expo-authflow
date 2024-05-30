import React, { createContext, useContext, useEffect, useState } from "react";
import { useSegments, useRouter } from "expo-router";

type User = {
  name: string;
  email: string; // Add email to User type
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

  const login = async (email: string, password: string) => {
    const apiUrl = 'https://joint-invest-gq7dqxfxha-uw.a.run.app/api/user/login';
    const applicationId = '0d1cf352-f195-4dc8-a628-c1b4332a7f31';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                application_id: applicationId,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        console.log('Login Response:', data); // Log the response data

        // Assuming the token is received in the response
        const token = data.token;

        // Fetch user details using the token
        const userUrl = 'https://joint-invest-gq7dqxfxha-uw.a.run.app/api/user/me';
        const userDetailsResponse = await fetch(userUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!userDetailsResponse.ok) {
            throw new Error('Failed to fetch user details');
        }

        const userData = await userDetailsResponse.json();
        console.log('User Details:', userData); // Log user details

        // Set both name and email
        setUser({ name: userData.name, email: userData.email });
    } catch (error) {
        console.error('Login error:', error);
    }
};


  const signup = (email: string, password: string) => {
    // Perform signup logic, e.g., API call
    // Assume successful signup for demonstration
    setUser({ name: "New User", email }); // Set email when signing up
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
