/**
 * User Types สำหรับ WINDSOR Distributor App
 * จัดการข้อมูลผู้ใช้งาน, authentication, และ authorization
 */

import { ShippingAddress } from "./order";

// บทบาทผู้ใช้งาน
export type UserRole = "customer" | "admin" | "staff";

// สถานะบัญชีผู้ใช้
export type AccountStatus = "active" | "suspended" | "pending_verification";

// ข้อมูลผู้ใช้งานหลัก
export interface UserProfile {
  uid: string; // Firebase Auth UID
  email: string;
  displayName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  role: UserRole;
  accountStatus: AccountStatus;
  // ที่อยู่จัดส่ง
  addresses: ShippingAddress[];
  defaultAddressId?: string;
  // สรุปคำสั่งซื้อล่าสุด (Denormalized สำหรับ quick access)
  recentOrdersSummary?: RecentOrderSummary[];
  // Preferences
  preferences: UserPreferences;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

// สรุปคำสั่งซื้อล่าสุด (เก็บไว้ใน user document เพื่อลด reads)
export interface RecentOrderSummary {
  orderId: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: Date;
}

// User preferences
export interface UserPreferences {
  language: "th" | "en"; // ภาษาที่ต้องการ
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  theme: "light" | "dark" | "system";
}

// ข้อมูล Auth state
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  error: string | null;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Register data
export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
  phoneNumber?: string;
}

// Firebase Custom Claims สำหรับ role-based access
export interface CustomClaims {
  role: UserRole;
  permissions?: string[];
}

// Guest user (สำหรับ anonymous checkout)
export interface GuestUser {
  sessionId: string;
  cartId?: string;
  createdAt: Date;
}

