/**
 * AuthContext - จัดการสถานะ Authentication
 * รองรับ Guest Mode - ผู้ใช้ดูสินค้าได้โดยไม่ต้อง Login
 * จะขอ Login เฉพาะตอนทำ action สำคัญ (เพิ่มตะกร้า, ชำระเงิน, ดูโปรไฟล์)
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockUser } from "../data/mockData";

// ประเภท User
export interface User {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  avatarUrl: string;
}

// Interface สำหรับ Context
interface AuthContextType {
  user: User | null; // null = Guest Mode
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  loginModalMessage: string;
  requireAuth: (message?: string) => boolean; // ตรวจสอบและแสดง Modal ถ้าไม่ได้ Login
}

// สร้าง Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Key สำหรับ AsyncStorage
const AUTH_STORAGE_KEY = "@windsor_auth_user";

// Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginModalMessage, setLoginModalMessage] = useState("");

  const isAuthenticated = user !== null;

  // โหลด user จาก AsyncStorage เมื่อเริ่มต้น
  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.warn("ไม่สามารถโหลดข้อมูล user ได้:", error);
      }
    };
    loadUser();
  }, []);

  // Login function (Mock)
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login - ใช้ข้อมูลจาก mockUser
      const loggedInUser: User = {
        uid: mockUser.uid,
        email: email || mockUser.email,
        displayName: mockUser.displayName,
        phoneNumber: mockUser.phoneNumber,
        avatarUrl: mockUser.avatarUrl,
      };

      setUser(loggedInUser);
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));
      setShowLoginModal(false);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register function (Mock)
  const register = useCallback(
    async (email: string, password: string, name: string): Promise<boolean> => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock successful registration
        const newUser: User = {
          uid: `user-${Date.now()}`,
          email,
          displayName: name,
          phoneNumber: "",
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=137fec&color=fff`,
        };

        setUser(newUser);
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
        setShowLoginModal(false);
        return true;
      } catch (error) {
        console.error("Register error:", error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Logout function
  const logout = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  // ตรวจสอบ Auth และแสดง Modal ถ้าไม่ได้ Login
  const requireAuth = useCallback(
    (message?: string): boolean => {
      if (isAuthenticated) {
        return true;
      }
      setLoginModalMessage(message || "กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ");
      setShowLoginModal(true);
      return false;
    },
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        showLoginModal,
        setShowLoginModal,
        loginModalMessage,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook สำหรับใช้งาน Auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth ต้องใช้ภายใน AuthProvider");
  }
  return context;
}

