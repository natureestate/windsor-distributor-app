/**
 * ThemeContext - จัดการ Dark/Light Mode สำหรับแอป
 * รองรับ 3 โหมด: light, dark, system
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ประเภท Theme ที่รองรับ
export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

// Interface สำหรับ Context
interface ThemeContextType {
  themeMode: ThemeMode; // โหมดที่ผู้ใช้เลือก (light/dark/system)
  resolvedTheme: ResolvedTheme; // theme จริงที่ใช้งาน (light/dark)
  isDark: boolean; // ตรวจสอบว่าเป็น dark mode หรือไม่
  setThemeMode: (mode: ThemeMode) => void; // ฟังก์ชันเปลี่ยน theme
  toggleTheme: () => void; // สลับระหว่าง light/dark
}

// สร้าง Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Key สำหรับเก็บใน AsyncStorage
const THEME_STORAGE_KEY = "@windsor_theme_mode";

// Provider Component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // ดึง system color scheme
  const systemColorScheme = useColorScheme();
  
  // State สำหรับ theme mode ที่ผู้ใช้เลือก
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [isLoaded, setIsLoaded] = useState(false);

  // คำนวณ resolved theme จาก themeMode และ system preference
  const resolvedTheme: ResolvedTheme = 
    themeMode === "system" 
      ? (systemColorScheme === "dark" ? "dark" : "light")
      : themeMode;

  const isDark = resolvedTheme === "dark";

  // โหลด theme จาก AsyncStorage เมื่อเริ่มต้น
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
          setThemeModeState(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.warn("ไม่สามารถโหลด theme ได้:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadTheme();
  }, []);

  // ฟังก์ชันเปลี่ยน theme และบันทึกลง AsyncStorage
  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.warn("ไม่สามารถบันทึก theme ได้:", error);
    }
  }, []);

  // ฟังก์ชันสลับ theme (light <-> dark)
  const toggleTheme = useCallback(() => {
    const newMode: ThemeMode = isDark ? "light" : "dark";
    setThemeMode(newMode);
  }, [isDark, setThemeMode]);

  // รอให้โหลด theme เสร็จก่อน render
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        resolvedTheme,
        isDark,
        setThemeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook สำหรับใช้งาน Theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme ต้องใช้ภายใน ThemeProvider");
  }
  return context;
}

// Helper function สำหรับเลือกค่าตาม theme
export function useThemeValue<T>(lightValue: T, darkValue: T): T {
  const { isDark } = useTheme();
  return isDark ? darkValue : lightValue;
}

// Hook สำหรับดึง theme colors ที่ใช้บ่อย
export function useThemeColors() {
  const { isDark } = useTheme();

  return {
    // Background colors
    bgColor: isDark ? "bg-background-dark" : "bg-background-light",
    cardBg: isDark ? "bg-surface-dark" : "bg-white",
    surfaceBg: isDark ? "bg-surface-dark" : "bg-white", // สำหรับ Modal, Bottom Sheet

    // Text colors
    textMain: isDark ? "text-text-main-dark" : "text-text-main-light",
    textSub: isDark ? "text-text-sub-dark" : "text-text-sub-light",

    // Border colors
    borderColor: isDark ? "border-border-dark" : "border-border-light",

    // Icon colors (hex values)
    iconMain: isDark ? "#e2e8f0" : "#0d141b",
    iconSub: isDark ? "#94a3b8" : "#4c739a",
    iconMuted: isDark ? "#64748b" : "#d1d5db",

    // Raw values for style objects
    raw: {
      bgColor: isDark ? "#101922" : "#f6f7f8",
      cardBg: isDark ? "#1e2936" : "#ffffff",
      surfaceBg: isDark ? "#1e2936" : "#ffffff",
      textMain: isDark ? "#e2e8f0" : "#0d141b",
      textSub: isDark ? "#94a3b8" : "#4c739a",
      borderColor: isDark ? "#334155" : "#e2e8f0",
    },

    isDark,
  };
}

