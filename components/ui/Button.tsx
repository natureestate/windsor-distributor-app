/**
 * Button Component สำหรับ WINDSOR Distributor App
 * รองรับหลาย variant และ size ตาม design system
 */

import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacityProps,
} from "react-native";
import { cn } from "../../lib/utils";

// ประเภทของ Button
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

// สไตล์ตาม variant
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary active:bg-primary-dark",
  secondary: "bg-surface-dark active:bg-gray-700",
  outline: "bg-transparent border-2 border-primary active:bg-primary/10",
  ghost: "bg-transparent active:bg-gray-100",
  danger: "bg-red-500 active:bg-red-600",
};

// สีข้อความตาม variant
const textStyles: Record<ButtonVariant, string> = {
  primary: "text-white",
  secondary: "text-white",
  outline: "text-primary",
  ghost: "text-text-main-light",
  danger: "text-white",
};

// ขนาดตาม size
const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2 rounded",
  md: "px-4 py-3 rounded-lg",
  lg: "px-6 py-4 rounded-xl",
};

// ขนาดข้อความตาม size
const textSizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      className={cn(
        // Base styles
        "flex-row items-center justify-center",
        // Variant styles
        variantStyles[variant],
        // Size styles
        sizeStyles[size],
        // Full width
        fullWidth && "w-full",
        // Disabled state
        isDisabled && "opacity-50",
        // Custom className
        className
      )}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {/* Loading indicator */}
      {isLoading && (
        <ActivityIndicator
          size="small"
          color={variant === "outline" || variant === "ghost" ? "#137fec" : "#ffffff"}
          className="mr-2"
        />
      )}

      {/* Left icon */}
      {!isLoading && leftIcon && <View className="mr-2">{leftIcon}</View>}

      {/* Button text */}
      <Text
        className={cn(
          "font-semibold text-center",
          textStyles[variant],
          textSizeStyles[size]
        )}
      >
        {children}
      </Text>

      {/* Right icon */}
      {rightIcon && <View className="ml-2">{rightIcon}</View>}
    </TouchableOpacity>
  );
}

export default Button;

