/**
 * Product Details Screen - หน้ารายละเอียดสินค้า
 * แสดงรูปภาพ, specs, tabs, และปุ่ม add to cart พร้อม quantity selector
 */

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Button, Badge, Rating } from "../../../components/ui";
import { ProductRow } from "../../../components/product";

// Mock Data
import { mockProducts, mockProductListItems } from "../../../data/mockData";
import { formatPrice } from "../../../lib/utils";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Tab types
type TabType = "description" | "specifications" | "installation";

// Feature icons data
const featureIcons = [
  { id: "noise", icon: "volume-mute-outline", label: "Noise Reduction" },
  { id: "uv", icon: "sunny-outline", label: "UV Protection" },
  { id: "security", icon: "shield-checkmark-outline", label: "High Security" },
  { id: "waterproof", icon: "water-outline", label: "Waterproof" },
];

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // หาสินค้าจาก mock data
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];

  // State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.constraints?.colors[0]?.id || "");
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [quantity, setQuantity] = useState(1);

  // Similar products (กรองตาม category)
  const similarProducts = mockProductListItems
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Handle quantity change
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Handle add to cart
  const handleAddToCart = () => {
    if (product.isConfigurable) {
      router.push(`/(customer)/product/${id}/configure`);
    } else {
      alert(`เพิ่ม ${quantity} ชิ้นลงตะกร้าแล้ว!`);
    }
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <View>
            {/* Description Text */}
            <Text className="text-sm text-text-sub-light leading-6 mb-4">
              {product.descriptionTh || product.description}
            </Text>
            <Text className="text-sm text-text-sub-light leading-6 mb-6">
              Perfect for modern homes, the smooth gliding mechanism ensures effortless operation
              while the multi-point locking system provides enhanced security for your peace of
              mind.
            </Text>

            {/* Feature Icons Grid */}
            <View className="flex-row flex-wrap mb-6">
              {featureIcons.map((feature) => (
                <View key={feature.id} className="w-1/2 flex-row items-center py-3 pr-2">
                  <View className="w-10 h-10 bg-background-light rounded-full items-center justify-center mr-3">
                    <Ionicons
                      name={feature.icon as keyof typeof Ionicons.glyphMap}
                      size={20}
                      color="#4c739a"
                    />
                  </View>
                  <Text className="text-sm text-text-main-light">{feature.label}</Text>
                </View>
              ))}
            </View>

            {/* Quick Specs Table */}
            <View className="bg-background-light rounded-xl overflow-hidden">
              <View className="flex-row justify-between px-4 py-3 border-b border-border-light">
                <Text className="text-sm text-text-sub-light">Material</Text>
                <Text className="text-sm font-medium text-text-main-light">Premium uPVC</Text>
              </View>
              <View className="flex-row justify-between px-4 py-3 border-b border-border-light">
                <Text className="text-sm text-text-sub-light">Warranty</Text>
                <Text className="text-sm font-medium text-text-main-light">10 Years Limited</Text>
              </View>
              <View className="flex-row justify-between px-4 py-3">
                <Text className="text-sm text-text-sub-light">Glass Type</Text>
                <Text className="text-sm font-medium text-text-main-light">
                  Double Glazed Tempered
                </Text>
              </View>
            </View>
          </View>
        );

      case "specifications":
        return (
          <View className="bg-background-light rounded-xl overflow-hidden">
            {Object.entries(product.specs).map(([key, value], index, arr) => (
              <View
                key={key}
                className={`flex-row justify-between px-4 py-3 ${
                  index < arr.length - 1 ? "border-b border-border-light" : ""
                }`}
              >
                <Text className="text-sm text-text-sub-light capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </Text>
                <Text className="text-sm font-medium text-text-main-light">{value}</Text>
              </View>
            ))}
            {/* Additional specs */}
            <View className="flex-row justify-between px-4 py-3 border-t border-border-light">
              <Text className="text-sm text-text-sub-light">Frame Material</Text>
              <Text className="text-sm font-medium text-text-main-light">uPVC</Text>
            </View>
            <View className="flex-row justify-between px-4 py-3 border-t border-border-light">
              <Text className="text-sm text-text-sub-light">Glass Thickness</Text>
              <Text className="text-sm font-medium text-text-main-light">5mm + 12mm + 5mm</Text>
            </View>
            <View className="flex-row justify-between px-4 py-3 border-t border-border-light">
              <Text className="text-sm text-text-sub-light">Max Width</Text>
              <Text className="text-sm font-medium text-text-main-light">3000mm</Text>
            </View>
            <View className="flex-row justify-between px-4 py-3 border-t border-border-light">
              <Text className="text-sm text-text-sub-light">Max Height</Text>
              <Text className="text-sm font-medium text-text-main-light">2400mm</Text>
            </View>
          </View>
        );

      case "installation":
        return (
          <View>
            <Text className="text-sm text-text-sub-light leading-6 mb-4">
              Professional installation is recommended for optimal performance and warranty
              coverage.
            </Text>
            <View className="bg-background-light rounded-xl p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center mr-3">
                  <Text className="text-primary font-bold">1</Text>
                </View>
                <Text className="flex-1 text-sm text-text-main-light">
                  Site survey and measurement
                </Text>
              </View>
              <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center mr-3">
                  <Text className="text-primary font-bold">2</Text>
                </View>
                <Text className="flex-1 text-sm text-text-main-light">
                  Frame installation and leveling
                </Text>
              </View>
              <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center mr-3">
                  <Text className="text-primary font-bold">3</Text>
                </View>
                <Text className="flex-1 text-sm text-text-main-light">
                  Glass panel fitting and sealing
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center mr-3">
                  <Text className="text-primary font-bold">4</Text>
                </View>
                <Text className="flex-1 text-sm text-text-main-light">
                  Final inspection and handover
                </Text>
              </View>
            </View>
            <Text className="text-xs text-text-sub-light">
              * Installation time: 1-2 days depending on size and complexity
            </Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header */}
        <View className="absolute top-0 left-0 right-0 z-10 flex-row items-center justify-between px-4 py-2">
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({
              width: 40,
              height: 40,
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.6 : 1,
              cursor: Platform.OS === "web" ? "pointer" : undefined,
            })}
            accessibilityRole="button"
            accessibilityLabel="กลับ"
          >
            <Ionicons name="arrow-back" size={22} color="#0d141b" />
          </Pressable>

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
                style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.8 }}
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
              <Text className="text-2xl font-bold text-primary">{formatPrice(product.basePrice)}</Text>
              {product.isConfigurable && (
                <Text className="text-xs text-text-sub-light">เริ่มต้น</Text>
              )}
            </View>
          </View>

          {/* Rating */}
          {product.rating && (
            <Rating rating={product.rating} reviewCount={product.reviewCount} showCount className="mb-4" />
          )}

          {/* Color Options (ถ้ามี) */}
          {product.constraints?.colors && (
            <View className="mb-4">
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
                    <View className="w-7 h-7 rounded-full" style={{ backgroundColor: color.hexCode }} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Tab Navigation */}
          <View className="flex-row border-b border-border-light mb-4">
            {(["description", "specifications", "installation"] as TabType[]).map((tab) => (
              <TouchableOpacity
                key={tab}
                className={`flex-1 py-3 ${activeTab === tab ? "border-b-2 border-primary" : ""}`}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  className={`text-sm text-center font-medium ${
                    activeTab === tab ? "text-primary" : "text-text-sub-light"
                  }`}
                >
                  {tab === "description"
                    ? "Description"
                    : tab === "specifications"
                      ? "Specifications"
                      : "Installation"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View className="mb-6">{renderTabContent()}</View>

          {/* Stock Status */}
          <View className="flex-row items-center mb-4">
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

      {/* Bottom Action Bar with Quantity Selector */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-border-light px-4 py-3 pb-8">
        {/* Quantity Row */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-sm font-medium text-text-main-light">จำนวน</Text>
          <View className="flex-row items-center bg-background-light rounded-xl">
            <TouchableOpacity
              className="w-10 h-10 items-center justify-center"
              onPress={decrementQuantity}
            >
              <Ionicons name="remove" size={18} color={quantity > 1 ? "#0d141b" : "#d1d5db"} />
            </TouchableOpacity>
            <Text className="w-12 text-center text-base font-semibold text-text-main-light">
              {quantity}
            </Text>
            <TouchableOpacity
              className="w-10 h-10 items-center justify-center"
              onPress={incrementQuantity}
            >
              <Ionicons name="add" size={18} color="#0d141b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View className="flex-row items-center gap-3">
          {/* Configure Button (ถ้าสินค้า configurable) */}
          {product.isConfigurable && (
            <TouchableOpacity
              className="flex-1 h-12 bg-background-light rounded-xl items-center justify-center flex-row"
              onPress={() => router.push(`/(customer)/product/${id}/configure`)}
            >
              <Ionicons name="options-outline" size={20} color="#0d141b" />
              <Text className="text-text-main-light font-semibold ml-2">กำหนดขนาด</Text>
            </TouchableOpacity>
          )}

          {/* Add to Cart Button */}
          <TouchableOpacity
            className="flex-1 h-12 bg-primary rounded-xl items-center justify-center flex-row"
            onPress={() => {
              alert(`เพิ่ม ${quantity} ชิ้นลงตะกร้าแล้ว!`);
            }}
          >
            <Ionicons name="cart-outline" size={20} color="#ffffff" />
            <Text className="text-white font-semibold ml-2">เพิ่มลงตะกร้า</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
