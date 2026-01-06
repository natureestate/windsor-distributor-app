/**
 * CategoryCard Component สำหรับ WINDSOR Distributor App
 * แสดงหมวดหมู่สินค้า
 */

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "../../lib/utils";
import { Category } from "../../data/mockData";

interface CategoryCardProps {
  category: Category;
  onPress?: () => void;
  variant?: "icon" | "compact";
  className?: string;
}

// Map icon name to Ionicons
const getIconName = (iconName: string): keyof typeof Ionicons.glyphMap => {
  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    window: "grid-outline",
    door_sliding: "browsers-outline",
    grid_view: "apps-outline",
    pest_control: "bug-outline",
    handyman: "construct-outline",
  };
  return iconMap[iconName] || "cube-outline";
};

/**
 * CategoryCard - Icon variant (แสดงเป็น icon + ชื่อ)
 */
export function CategoryCard({
  category,
  onPress,
  variant = "icon",
  className,
}: CategoryCardProps) {
  if (variant === "compact") {
    return (
      <TouchableOpacity
        className={cn(
          "flex-row items-center bg-white rounded-lg px-3 py-2 shadow-sm",
          className
        )}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View className="w-8 h-8 bg-primary/10 rounded-lg items-center justify-center mr-2">
          <Ionicons
            name={getIconName(category.icon)}
            size={18}
            color="#137fec"
          />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-medium text-text-main-light">
            {category.nameTh}
          </Text>
          <Text className="text-xs text-text-sub-light">
            {category.productCount} รายการ
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
      </TouchableOpacity>
    );
  }

  // Icon variant (default)
  return (
    <TouchableOpacity
      className={cn(
        "items-center",
        className
      )}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Icon container */}
      <View className="w-14 h-14 bg-primary/10 rounded-2xl items-center justify-center mb-2">
        <Ionicons
          name={getIconName(category.icon)}
          size={24}
          color="#137fec"
        />
      </View>

      {/* Category name */}
      <Text
        className="text-xs font-medium text-text-main-light text-center"
        numberOfLines={1}
      >
        {category.nameTh}
      </Text>
    </TouchableOpacity>
  );
}

/**
 * CategoryRow - แสดงหมวดหมู่แบบ horizontal scroll
 */
interface CategoryRowProps {
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
  className?: string;
}

export function CategoryRow({
  categories,
  onCategoryPress,
  className,
}: CategoryRowProps) {
  return (
    <View className={cn("flex-row justify-between px-4", className)}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onPress={() => onCategoryPress?.(category)}
          variant="icon"
        />
      ))}
    </View>
  );
}

export default CategoryCard;

