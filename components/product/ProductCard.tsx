/**
 * ProductCard Component สำหรับ WINDSOR Distributor App
 * แสดงสินค้าในรูปแบบ card ตาม design reference
 */

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ProductListItem, ProductBadge } from "../../types/product";
import { Badge, Rating } from "../ui";
import { cn, formatPrice } from "../../lib/utils";

interface ProductCardProps {
  product: ProductListItem;
  variant?: "grid" | "list";
  onPress?: () => void;
  onAddToCart?: () => void;
  className?: string;
}

// แปลง badge type เป็น variant
const getBadgeVariant = (badge: ProductBadge) => {
  switch (badge) {
    case "best-seller":
      return "primary";
    case "new":
      return "new";
    case "eco":
      return "eco";
    case "promo":
      return "promo";
    default:
      return "neutral";
  }
};

// แปลง badge type เป็น label
const getBadgeLabel = (badge: ProductBadge) => {
  switch (badge) {
    case "best-seller":
      return "BEST SELLER";
    case "new":
      return "NEW";
    case "eco":
      return "ECO";
    case "promo":
      return "PROMO";
    default:
      return badge.toUpperCase();
  }
};

/**
 * ProductCard - Grid variant (สำหรับแสดงในรายการ 2 คอลัมน์)
 */
export function ProductCard({
  product,
  variant = "grid",
  onPress,
  onAddToCart,
  className,
}: ProductCardProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/(customer)/product/${product.id}`);
    }
  };

  if (variant === "list") {
    return (
      <ProductCardList
        product={product}
        onPress={handlePress}
        onAddToCart={onAddToCart}
        className={className}
      />
    );
  }

  return (
    <TouchableOpacity
      className={cn(
        "bg-white rounded-xl overflow-hidden shadow-sm",
        className
      )}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      {/* รูปภาพสินค้า */}
      <View className="relative aspect-square bg-gray-100">
        <Image
          source={{ uri: product.thumbnailUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Badges */}
        {product.badges.length > 0 && (
          <View className="absolute top-2 left-2">
            <Badge variant={getBadgeVariant(product.badges[0])}>
              {getBadgeLabel(product.badges[0])}
            </Badge>
          </View>
        )}

        {/* Favorite button */}
        <TouchableOpacity
          className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full items-center justify-center"
          hitSlop={8}
        >
          <Ionicons name="heart-outline" size={18} color="#0d141b" />
        </TouchableOpacity>
      </View>

      {/* ข้อมูลสินค้า */}
      <View className="p-3">
        {/* ชื่อสินค้า */}
        <Text
          className="text-sm font-medium text-text-main-light mb-1"
          numberOfLines={2}
        >
          {product.nameTh}
        </Text>

        {/* Series (ถ้ามี) */}
        {product.series && (
          <Text className="text-xs text-text-sub-light mb-1">
            {product.series}
          </Text>
        )}

        {/* Rating */}
        {product.rating && (
          <Rating rating={product.rating} size="sm" showValue className="mb-2" />
        )}

        {/* ราคา */}
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold text-primary">
            {formatPrice(product.basePrice)}
          </Text>

          {/* ปุ่มเพิ่มลงตะกร้า */}
          {onAddToCart && !product.isConfigurable && (
            <TouchableOpacity
              className="w-8 h-8 bg-primary rounded-full items-center justify-center"
              onPress={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
            >
              <Ionicons name="add" size={20} color="#ffffff" />
            </TouchableOpacity>
          )}

          {/* ถ้าเป็นสินค้า configurable แสดงข้อความ */}
          {product.isConfigurable && (
            <Text className="text-xs text-text-sub-light">เริ่มต้น</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

/**
 * ProductCardList - List variant (สำหรับแสดงแบบแถว)
 */
function ProductCardList({
  product,
  onPress,
  onAddToCart,
  className,
}: ProductCardProps) {
  return (
    <TouchableOpacity
      className={cn(
        "bg-white rounded-xl overflow-hidden shadow-sm flex-row",
        className
      )}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* รูปภาพสินค้า */}
      <View className="relative w-28 h-28 bg-gray-100">
        <Image
          source={{ uri: product.thumbnailUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Badge */}
        {product.badges.length > 0 && (
          <View className="absolute top-1 left-1">
            <Badge variant={getBadgeVariant(product.badges[0])} size="sm">
              {getBadgeLabel(product.badges[0])}
            </Badge>
          </View>
        )}
      </View>

      {/* ข้อมูลสินค้า */}
      <View className="flex-1 p-3 justify-between">
        <View>
          {/* ชื่อสินค้า */}
          <Text
            className="text-sm font-medium text-text-main-light"
            numberOfLines={2}
          >
            {product.nameTh}
          </Text>

          {/* Series */}
          {product.series && (
            <Text className="text-xs text-text-sub-light mt-0.5">
              {product.series}
            </Text>
          )}

          {/* Rating */}
          {product.rating && (
            <Rating rating={product.rating} size="sm" showValue className="mt-1" />
          )}
        </View>

        {/* ราคาและปุ่ม */}
        <View className="flex-row items-center justify-between mt-2">
          <View>
            <Text className="text-base font-bold text-primary">
              {formatPrice(product.basePrice)}
            </Text>
            {product.isConfigurable && (
              <Text className="text-xs text-text-sub-light">เริ่มต้น</Text>
            )}
          </View>

          {onAddToCart && !product.isConfigurable && (
            <TouchableOpacity
              className="px-3 py-1.5 bg-primary rounded-lg"
              onPress={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
            >
              <Text className="text-white text-xs font-medium">เพิ่ม</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ProductCard;

