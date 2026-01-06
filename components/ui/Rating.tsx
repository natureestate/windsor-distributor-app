/**
 * Rating Component สำหรับ WINDSOR Distributor App
 * แสดงคะแนนรีวิวด้วยดาว
 */

import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "../../lib/utils";

interface RatingProps {
  rating: number; // 0-5
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  showCount?: boolean;
  reviewCount?: number;
  className?: string;
}

// ขนาดดาวตาม size
const starSizes: Record<string, number> = {
  sm: 12,
  md: 16,
  lg: 20,
};

// ขนาดข้อความตาม size
const textSizes: Record<string, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function Rating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = true,
  showCount = false,
  reviewCount = 0,
  className,
}: RatingProps) {
  const starSize = starSizes[size];

  // สร้างดาวตามคะแนน
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < maxRating; i++) {
      if (i < fullStars) {
        // ดาวเต็ม
        stars.push(
          <Ionicons key={i} name="star" size={starSize} color="#f59e0b" />
        );
      } else if (i === fullStars && hasHalfStar) {
        // ดาวครึ่ง
        stars.push(
          <Ionicons key={i} name="star-half" size={starSize} color="#f59e0b" />
        );
      } else {
        // ดาวว่าง
        stars.push(
          <Ionicons key={i} name="star-outline" size={starSize} color="#d1d5db" />
        );
      }
    }

    return stars;
  };

  return (
    <View className={cn("flex-row items-center", className)}>
      {/* Stars */}
      <View className="flex-row">{renderStars()}</View>

      {/* Rating value */}
      {showValue && (
        <Text className={cn("ml-1 font-medium text-text-main-light", textSizes[size])}>
          {rating.toFixed(1)}
        </Text>
      )}

      {/* Review count */}
      {showCount && reviewCount > 0 && (
        <Text className={cn("ml-1 text-text-sub-light", textSizes[size])}>
          ({reviewCount})
        </Text>
      )}
    </View>
  );
}

export default Rating;

