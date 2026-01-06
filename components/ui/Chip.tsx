/**
 * Chip Component สำหรับ WINDSOR Distributor App
 * ใช้สำหรับ filter chips, tags, และ selection
 * รองรับ Dark Mode
 */

import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "../../lib/utils";
import { useThemeColors } from "../../contexts";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function Chip({
  label,
  selected = false,
  onPress,
  onRemove,
  leftIcon,
  disabled = false,
  size = "md",
  className,
}: ChipProps) {
  const isInteractive = !!onPress && !disabled;
  const { cardBg, textMain, borderColor, isDark } = useThemeColors();

  const Container = isInteractive ? TouchableOpacity : View;

  // สีสำหรับ unselected state ตาม theme
  const unselectedBg = isDark ? "bg-surface-dark" : "bg-white";
  const unselectedBorder = isDark ? "border-border-dark" : "border-border-light";
  const unselectedText = isDark ? "text-text-main-dark" : "text-text-main-light";

  return (
    <Container
      className={cn(
        // Base styles
        "flex-row items-center rounded-full border",
        // Size
        size === "sm" ? "px-2 py-1" : "px-3 py-2",
        // Selected state
        selected ? "bg-primary border-primary" : `${unselectedBg} ${unselectedBorder}`,
        // Disabled state
        disabled && "opacity-50",
        // Custom className
        className
      )}
      onPress={isInteractive ? onPress : undefined}
      activeOpacity={0.7}
    >
      {/* Left icon */}
      {leftIcon && <View className="mr-1.5">{leftIcon}</View>}

      {/* Label */}
      <Text
        className={cn(
          "font-medium",
          size === "sm" ? "text-xs" : "text-sm",
          selected ? "text-white" : unselectedText
        )}
      >
        {label}
      </Text>

      {/* Remove button */}
      {onRemove && (
        <TouchableOpacity onPress={onRemove} hitSlop={8} className="ml-1.5">
          <Ionicons
            name="close-circle"
            size={size === "sm" ? 14 : 18}
            color={selected ? "#ffffff" : (isDark ? "#64748b" : "#94a3b8")}
          />
        </TouchableOpacity>
      )}
    </Container>
  );
}

/**
 * ChipGroup - จัดกลุ่ม Chips แบบ horizontal scroll
 */
interface ChipGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function ChipGroup({ children, className }: ChipGroupProps) {
  return <View className={cn("flex-row flex-wrap gap-2", className)}>{children}</View>;
}

export default Chip;
