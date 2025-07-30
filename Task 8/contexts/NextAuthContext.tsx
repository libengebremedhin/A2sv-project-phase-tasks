"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface NextAuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  signup: (data: SignupData) => Promise<{ success: boolean; message?: string }>;
  verifyEmail: (email: string, otp: string) => Promise<{ success: boolean; message?: string }>;
}

const NextAuthContext = createContext<NextAuthContextType | undefined>(undefined);

export const useNextAuth = () => {
  const context = useContext(NextAuthContext);
  if (context === undefined) {
    throw new Error('useNextAuth must be used within a NextAuthProvider');
  }
  return context;
};

interface NextAuthProviderProps {
  children: ReactNode;
}

export const NextAuthProvider = ({ children }: NextAuthProviderProps) => {
  const { data: session, status } = useSession();

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        return { success: false, message: "Invalid credentials" };
      }

      return { success: true };
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const logout = async (): Promise<void> => {
    await signOut({ redirect: false });
  };

  const signup = async (formData: SignupData): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: data.message || "Signup failed" };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const verifyEmail = async (email: string, otp: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch("https://akil-backend.onrender.com/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, OTP: otp }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: data.message || "Verification failed" };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const value: NextAuthContextType = {
    user: session?.user || null,
    isAuthenticated: !!session,
    isLoading: status === "loading",
    login,
    logout,
    signup,
    verifyEmail,
  };

  return (
    <NextAuthContext.Provider value={value}>
      {children}
    </NextAuthContext.Provider>
  );
};
