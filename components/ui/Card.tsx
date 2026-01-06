/**
 * Card Component สำหรับ WINDSOR Distributor App
 * ใช้เป็น container สำหรับ content ต่างๆ
 */

import React from "react";
import { View, TouchableOpacity, ViewProps, TouchableOpacityProps } from "react-native";
import { cn } from "../../lib/utils";

// ประเภทของ Card
type CardVariant = "elevated" | "outlined" | "filled";

interface CardProps extends ViewProps {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
}

interface PressableCardProps extends TouchableOpacityProps {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
}

// สไตล์ตาม variant
const variantStyles: Record<CardVariant, string> = {
  elevated: "bg-white shadow-md",
  outlined: "bg-white border border-border-light",
  filled: "bg-background-light",
};

// Padding ตาม size
const paddingStyles: Record<string, string> = {
  none: "",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

/**
 * Card Component (ไม่กดได้)
 */
export function Card({
  variant = "elevated",
  padding = "md",
  children,
  className,
  ...props
}: CardProps) {
  return (
    <View
      className={cn(
        // Base styles
        "rounded-xl overflow-hidden",
        // Variant styles
        variantStyles[variant],
        // Padding
        paddingStyles[padding],
        // Custom className
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

/**
 * PressableCard Component (กดได้)
 */
export function PressableCard({
  variant = "elevated",
  padding = "md",
  children,
  className,
  ...props
}: PressableCardProps) {
  return (
    <TouchableOpacity
      className={cn(
        // Base styles
        "rounded-xl overflow-hidden",
        // Variant styles
        variantStyles[variant],
        // Padding
        paddingStyles[padding],
        // Active state
        "active:opacity-90",
        // Custom className
        className
      )}
      activeOpacity={0.9}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

export default Card;

