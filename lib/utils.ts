/**
 * Utility functions สำหรับ WINDSOR Distributor App
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes อย่างปลอดภัย
 * ใช้ clsx สำหรับ conditional classes และ twMerge สำหรับ handle conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format ราคาเป็นสกุลเงินบาท
 * @param amount - จำนวนเงิน
 * @param options - ตัวเลือกการแสดงผล
 */
export function formatPrice(
  amount: number,
  options: {
    showCurrency?: boolean;
    locale?: string;
  } = {}
): string {
  const { showCurrency = true, locale = "th-TH" } = options;

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return showCurrency ? `฿${formatted}` : formatted;
}

/**
 * Format วันที่เป็นภาษาไทย
 * @param date - วันที่
 * @param format - รูปแบบการแสดงผล
 */
export function formatDate(
  date: Date | string,
  format: "short" | "long" | "relative" = "short"
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (format === "relative") {
    return formatRelativeTime(d);
  }

  const options: Intl.DateTimeFormatOptions =
    format === "long"
      ? { year: "numeric", month: "long", day: "numeric" }
      : { year: "numeric", month: "short", day: "numeric" };

  return d.toLocaleDateString("th-TH", options);
}

/**
 * Format เวลาแบบ relative (เช่น "2 วันที่แล้ว")
 */
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return diffMins <= 1 ? "เมื่อสักครู่" : `${diffMins} นาทีที่แล้ว`;
    }
    return `${diffHours} ชั่วโมงที่แล้ว`;
  }

  if (diffDays === 1) return "เมื่อวาน";
  if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} สัปดาห์ที่แล้ว`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} เดือนที่แล้ว`;

  return `${Math.floor(diffDays / 365)} ปีที่แล้ว`;
}

/**
 * Truncate ข้อความยาวเกินไป
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

/**
 * แปลงสถานะ Order เป็นภาษาไทย
 */
export function getOrderStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    pending_payment: "รอชำระเงิน",
    payment_confirmed: "ชำระเงินแล้ว",
    processing: "กำลังดำเนินการ",
    manufacturing: "กำลังผลิต",
    quality_check: "ตรวจสอบคุณภาพ",
    ready_to_ship: "พร้อมจัดส่ง",
    shipped: "จัดส่งแล้ว",
    delivered: "ส่งถึงแล้ว",
    completed: "เสร็จสิ้น",
    cancelled: "ยกเลิก",
    refunded: "คืนเงินแล้ว",
  };

  return statusMap[status] || status;
}

/**
 * แปลงสถานะ Order เป็นสีสำหรับ Badge
 */
export function getOrderStatusColor(
  status: string
): "primary" | "success" | "warning" | "error" | "neutral" {
  const colorMap: Record<string, "primary" | "success" | "warning" | "error" | "neutral"> = {
    pending_payment: "warning",
    payment_confirmed: "primary",
    processing: "primary",
    manufacturing: "primary",
    quality_check: "primary",
    ready_to_ship: "primary",
    shipped: "primary",
    delivered: "success",
    completed: "success",
    cancelled: "error",
    refunded: "neutral",
  };

  return colorMap[status] || "neutral";
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = ""): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return prefix ? `${prefix}-${timestamp}${random}` : `${timestamp}${random}`;
}

/**
 * Delay function สำหรับ mock async operations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
