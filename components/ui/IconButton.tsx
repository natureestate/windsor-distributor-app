/**
 * IconButton Component สำหรับ WINDSOR Distributor App
 * ปุ่มที่มีแค่ icon ไม่มี text
 */

import React from "react";
import { TouchableOpacity, TouchableOpacityProps, View, Text } from "react-native";
import { cn } from "../../lib/utils";

type IconButtonVariant = "default" | "filled" | "outlined" | "ghost";
type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  badge?: number;
  badgeColor?: string;
}

// สไตล์ตาม variant
const variantStyles: Record<IconButtonVariant, string> = {
  default: "bg-transparent",
  filled: "bg-primary",
  outlined: "bg-transparent border-2 border-border-light",
  ghost: "bg-transparent active:bg-gray-100",
};

// ขนาดตาม size
const sizeStyles: Record<IconButtonSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export function IconButton({
  icon,
  variant = "default",
  size = "md",
  badge,
  badgeColor = "bg-red-500",
  disabled,
  className,
  ...props
}: IconButtonProps) {
  return (
    <TouchableOpacity
      className={cn(
        // Base styles
        "items-center justify-center rounded-full relative",
        // Variant styles
        variantStyles[variant],
        // Size styles
        sizeStyles[size],
        // Disabled state
        disabled && "opacity-50",
        // Custom className
        className
      )}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      {icon}

      {/* Badge (notification count) */}
      {badge !== undefined && badge > 0 && (
        <View
          className={cn(
            "absolute -top-1 -right-1 min-w-5 h-5 rounded-full items-center justify-center px-1",
            badgeColor
          )}
        >
          <Text className="text-white text-xs font-bold">
            {badge > 99 ? "99+" : badge}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default IconButton;

