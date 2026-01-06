/**
 * Input Component สำหรับ WINDSOR Distributor App
 * รองรับ text input, search, และ textarea
 * รองรับ Dark Mode
 */

import React, { useState } from "react";
import { View, TextInput, Text, TextInputProps, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "../../lib/utils";
import { useThemeColors } from "../../contexts";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
}

interface SearchInputProps extends Omit<InputProps, "leftIcon"> {
  onClear?: () => void;
}

/**
 * Input Component พื้นฐาน
 */
export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerClassName,
  inputClassName,
  editable = true,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { cardBg, textMain, textSub, borderColor, isDark, raw } = useThemeColors();

  return (
    <View className={cn("w-full", containerClassName)}>
      {/* Label */}
      {label && <Text className={`text-sm font-medium ${textMain} mb-1.5`}>{label}</Text>}

      {/* Input container */}
      <View
        className={cn(
          // Base styles
          `flex-row items-center ${cardBg} rounded-lg border-2`,
          // Border color based on state
          isFocused ? "border-primary" : error ? "border-red-500" : borderColor,
          // Disabled state
          !editable && "opacity-60"
        )}
      >
        {/* Left icon */}
        {leftIcon && <View className="pl-3">{leftIcon}</View>}

        {/* Text input */}
        <TextInput
          className={cn(`flex-1 px-3 py-3 text-base ${textMain}`, inputClassName)}
          placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ color: raw.textMain }}
          {...props}
        />

        {/* Right icon */}
        {rightIcon && <View className="pr-3">{rightIcon}</View>}
      </View>

      {/* Error message */}
      {error && <Text className="text-sm text-red-500 mt-1">{error}</Text>}

      {/* Helper text */}
      {helperText && !error && (
        <Text className={`text-sm ${textSub} mt-1`}>{helperText}</Text>
      )}
    </View>
  );
}

/**
 * Search Input Component
 */
export function SearchInput({ value, onClear, containerClassName, ...props }: SearchInputProps) {
  const hasValue = value && value.length > 0;
  const { isDark } = useThemeColors();
  const iconColor = isDark ? "#64748b" : "#94a3b8";

  return (
    <Input
      containerClassName={containerClassName}
      leftIcon={<Ionicons name="search-outline" size={20} color={iconColor} />}
      rightIcon={
        hasValue && onClear ? (
          <TouchableOpacity onPress={onClear} hitSlop={8}>
            <Ionicons name="close-circle" size={20} color={iconColor} />
          </TouchableOpacity>
        ) : undefined
      }
      value={value}
      {...props}
    />
  );
}

export default Input;
