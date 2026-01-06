/**
 * Badge Component สำหรับ WINDSOR Distributor App
 * ใช้แสดงสถานะ, labels, และ tags ต่างๆ
 */

import React from "react";
import { View, Text } from "react-native";
import { cn } from "../../lib/utils";

// ประเภทสีของ Badge
type BadgeVariant =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "neutral"
  | "white"
  | "eco"
  | "new"
  | "promo";

type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

// สไตล์พื้นหลังตาม variant
const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary",
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  neutral: "bg-gray-500",
  white: "bg-white",
  eco: "bg-green-600",
  new: "bg-blue-600",
  promo: "bg-primary",
};

// สีข้อความตาม variant
const textStyles: Record<BadgeVariant, string> = {
  primary: "text-white",
  success: "text-white",
  warning: "text-white",
  error: "text-white",
  neutral: "text-white",
  white: "text-gray-800",
  eco: "text-white",
  new: "text-white",
  promo: "text-white",
};

// ขนาดตาม size
const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 rounded",
  md: "px-2 py-1 rounded",
  lg: "px-3 py-1.5 rounded-lg",
};

// ขนาดข้อความตาม size
const textSizeStyles: Record<BadgeSize, string> = {
  sm: "text-xs",
  md: "text-xs",
  lg: "text-sm",
};

export function Badge({
  variant = "primary",
  size = "md",
  children,
  className,
}: BadgeProps) {
  return (
    <View
      className={cn(
        // Base styles
        "self-start",
        // Variant styles
        variantStyles[variant],
        // Size styles
        sizeStyles[size],
        // Custom className
        className
      )}
    >
      <Text
        className={cn(
          "font-semibold uppercase tracking-wide",
          textStyles[variant],
          textSizeStyles[size]
        )}
      >
        {children}
      </Text>
    </View>
  );
}

export default Badge;

