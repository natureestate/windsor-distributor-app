/**
 * Product Details Screen - หน้ารายละเอียดสินค้า
 * แสดงรูปภาพ, specs, และปุ่ม configure/add to cart
 */

import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Button, Badge, Rating, Chip } from "../../../components/ui";
import { ProductRow } from "../../../components/product";

// Mock Data
import { mockProducts, mockProductListItems } from "../../../data/mockData";
import { formatPrice } from "../../../lib/utils";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // หาสินค้าจาก mock data
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];

  // State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.constraints?.colors[0]?.id || "");
  const [selectedGlass, setSelectedGlass] = useState(
    product.constraints?.glassTypes?.[0]?.id || ""
  );
  const [isFavorite, setIsFavorite] = useState(false);

  // Similar products (กรองตาม category)
  const similarProducts = mockProductListItems
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Handle add to cart
  const handleAddToCart = () => {
    if (product.isConfigurable) {
      // ไปหน้า configurator
      router.push(`/(customer)/product/${id}/configure`);
    } else {
      // เพิ่มลงตะกร้าเลย
      alert("เพิ่มลงตะกร้าแล้ว!");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="absolute top-0 left-0 right-0 z-10 flex-row items-center justify-between px-4 py-2">
          <TouchableOpacity
            className="w-10 h-10 bg-white/80 rounded-full items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#0d141b" />
          </TouchableOpacity>

          <View className="flex-row gap-2">
            <TouchableOpacity
              className="w-10 h-10 bg-white/80 rounded-full items-center justify-center"
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={22}
                color={isFavorite ? "#ef4444" : "#0d141b"}
              />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 bg-white/80 rounded-full items-center justify-center">
              <Ionicons name="share-outline" size={22} color="#0d141b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Gallery */}
        <View className="relative">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
              setCurrentImageIndex(index);
            }}
          >
            {product.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* Image indicators */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
            {product.images.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? "bg-primary" : "bg-white/60"
                }`}
              />
            ))}
          </View>

          {/* Badges */}
          {product.badges.length > 0 && (
            <View className="absolute top-14 left-4 gap-1">
              {product.badges.map((badge) => (
                <Badge
                  key={badge}
                  variant={badge === "best-seller" ? "primary" : badge === "new" ? "new" : "eco"}
                >
                  {badge === "best-seller" ? "BEST SELLER" : badge.toUpperCase()}
                </Badge>
              ))}
            </View>
          )}
        </View>

        {/* Product Info */}
        <View className="px-4 pt-4">
          {/* Name & Price */}
          <View className="flex-row items-start justify-between mb-2">
            <View className="flex-1 mr-4">
              <Text className="text-xl font-bold text-text-main-light">{product.nameTh}</Text>
              {product.series && (
                <Text className="text-sm text-text-sub-light mt-0.5">{product.series}</Text>
              )}
              <Text className="text-xs text-text-sub-light mt-0.5">SKU: {product.sku}</Text>
            </View>
            <View className="items-end">
              <Text className="text-2xl font-bold text-primary">
                {formatPrice(product.basePrice)}
              </Text>
              {product.isConfigurable && (
                <Text className="text-xs text-text-sub-light">เริ่มต้น</Text>
              )}
            </View>
          </View>

          {/* Rating */}
          {product.rating && (
            <Rating
              rating={product.rating}
              reviewCount={product.reviewCount}
              showCount
              className="mb-4"
            />
          )}

          {/* Description */}
          <Text className="text-sm text-text-sub-light leading-5 mb-4">
            {product.descriptionTh || product.description}
          </Text>

          {/* Features */}
          <View className="flex-row flex-wrap gap-2 mb-6">
            {(product.featuresTh || product.features).map((feature, index) => (
              <View
                key={index}
                className="flex-row items-center bg-primary/10 px-3 py-1.5 rounded-full"
              >
                <Ionicons name="checkmark-circle" size={14} color="#137fec" />
                <Text className="text-xs text-primary ml-1 font-medium">{feature}</Text>
              </View>
            ))}
          </View>

          {/* Color Options (ถ้ามี) */}
          {product.constraints?.colors && (
            <View className="mb-6">
              <Text className="text-sm font-semibold text-text-main-light mb-3">สี</Text>
              <View className="flex-row flex-wrap gap-2">
                {product.constraints.colors.map((color) => (
                  <TouchableOpacity
                    key={color.id}
                    className={`w-10 h-10 rounded-full border-2 items-center justify-center ${
                      selectedColor === color.id ? "border-primary" : "border-border-light"
                    }`}
                    onPress={() => setSelectedColor(color.id)}
                  >
                    <View
                      className="w-7 h-7 rounded-full"
                      style={{ backgroundColor: color.hexCode }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Specifications */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-text-main-light mb-3">รายละเอียด</Text>
            <View className="bg-background-light rounded-xl p-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <View
                  key={key}
                  className="flex-row justify-between py-2 border-b border-border-light last:border-b-0"
                >
                  <Text className="text-sm text-text-sub-light capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </Text>
                  <Text className="text-sm font-medium text-text-main-light">{value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Stock Status */}
          <View className="flex-row items-center mb-6">
            <View
              className={`w-2 h-2 rounded-full mr-2 ${
                product.stockStatus === "in-stock"
                  ? "bg-green-500"
                  : product.stockStatus === "pre-order"
                    ? "bg-amber-500"
                    : "bg-red-500"
              }`}
            />
            <Text className="text-sm text-text-sub-light">
              {product.stockStatus === "in-stock"
                ? "มีสินค้า"
                : product.stockStatus === "pre-order"
                  ? `สั่งจอง (ผลิต ${product.leadTimeDays} วัน)`
                  : "สินค้าหมด"}
            </Text>
          </View>
        </View>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <ProductRow
            title="สินค้าที่คล้ายกัน"
            products={similarProducts}
            onProductPress={(p) => router.push(`/(customer)/product/${p.id}`)}
            className="mt-4"
          />
        )}
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-border-light px-4 py-3 pb-8">
        <View className="flex-row gap-3">
          {/* Chat button */}
          <TouchableOpacity className="w-12 h-12 bg-background-light rounded-xl items-center justify-center">
            <Ionicons name="chatbubble-outline" size={22} color="#0d141b" />
          </TouchableOpacity>

          {/* Add to cart / Configure button */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleAddToCart}
            className="flex-1"
          >
            {product.isConfigurable ? "กำหนดขนาด" : "เพิ่มลงตะกร้า"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
