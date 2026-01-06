/**
 * Home Screen - หน้าแรกสำหรับลูกค้า
 * แสดง Promo Banners, Categories, Featured Products, Active Order
 */

import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Badge, IconButton } from "../../../components/ui";
import { ProductRow, CategoryRow } from "../../../components/product";

// Mock Data
import {
  mockCategories,
  mockProductListItems,
  mockPromoBanners,
  mockActiveOrder,
  mockUser,
} from "../../../data/mockData";

export default function HomeScreen() {
  const router = useRouter();

  // กรองสินค้า featured (best-seller)
  const featuredProducts = mockProductListItems.filter((p) => p.badges.includes("best-seller"));

  // สินค้าใหม่
  const newProducts = mockProductListItems.filter((p) => p.badges.includes("new"));

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header */}
        <View className="px-4 pt-2 pb-4">
          <View className="flex-row items-center justify-between">
            {/* Logo & Greeting */}
            <View>
              <Text className="text-2xl font-bold text-text-main-light">WINDSOR</Text>
              <Text className="text-sm text-text-sub-light">สวัสดี, {mockUser.displayName}</Text>
            </View>

            {/* Action buttons */}
            <View className="flex-row items-center gap-2">
              <IconButton
                icon={<Ionicons name="notifications-outline" size={22} color="#0d141b" />}
                variant="ghost"
                badge={3}
              />
              <TouchableOpacity
                className="w-10 h-10 rounded-full overflow-hidden"
                onPress={() => router.push("/(customer)/(tabs)/profile")}
              >
                <Image source={{ uri: mockUser.avatarUrl }} className="w-full h-full" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <TouchableOpacity
            className="flex-row items-center bg-white rounded-xl px-4 py-3 mt-4 border border-border-light"
            onPress={() => router.push("/(customer)/(tabs)/catalog")}
          >
            <Ionicons name="search-outline" size={20} color="#94a3b8" />
            <Text className="flex-1 ml-3 text-text-sub-light">ค้นหาสินค้า...</Text>
            <Ionicons name="options-outline" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Promo Banner */}
        <View className="px-4 mb-6">
          <TouchableOpacity className="relative rounded-2xl overflow-hidden" activeOpacity={0.95}>
            <Image
              source={{ uri: mockPromoBanners[0].imageUrl }}
              className="w-full h-44"
              resizeMode="cover"
            />
            {/* Overlay content */}
            <View className="absolute inset-0 bg-black/30 p-4 justify-end">
              <Badge variant="promo" className="mb-2">
                {mockPromoBanners[0].badge}
              </Badge>
              <Text className="text-xl font-bold text-white mb-1">{mockPromoBanners[0].title}</Text>
              <Text className="text-sm text-white/90">{mockPromoBanners[0].subtitle}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-4 mb-3">
            <Text className="text-lg font-bold text-text-main-light">หมวดหมู่</Text>
            <TouchableOpacity onPress={() => router.push("/(customer)/(tabs)/catalog")}>
              <Text className="text-sm text-primary font-medium">ดูทั้งหมด</Text>
            </TouchableOpacity>
          </View>
          <CategoryRow
            categories={mockCategories}
            onCategoryPress={(category) =>
              router.push(`/(customer)/(tabs)/catalog?category=${category.id}`)
            }
          />
        </View>

        {/* Active Order Widget */}
        {mockActiveOrder && (
          <View className="px-4 mb-6">
            <TouchableOpacity
              className="bg-primary rounded-xl p-4 flex-row items-center"
              onPress={() => router.push("/(customer)/(tabs)/orders")}
            >
              <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
                <Ionicons name="cube-outline" size={22} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">
                  คำสั่งซื้อ #{mockActiveOrder.orderNumber}
                </Text>
                <Text className="text-white/80 text-sm">{mockActiveOrder.statusTh}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        )}

        {/* Featured Products */}
        <ProductRow
          title="สินค้าขายดี"
          products={
            featuredProducts.length > 0 ? featuredProducts : mockProductListItems.slice(0, 4)
          }
          onSeeAll={() => router.push("/(customer)/(tabs)/catalog?filter=best-seller")}
          onProductPress={(product) => router.push(`/(customer)/product/${product.id}`)}
          className="mb-6"
        />

        {/* New Arrivals */}
        <ProductRow
          title="สินค้าใหม่"
          products={newProducts.length > 0 ? newProducts : mockProductListItems.slice(2, 6)}
          onSeeAll={() => router.push("/(customer)/(tabs)/catalog?filter=new")}
          onProductPress={(product) => router.push(`/(customer)/product/${product.id}`)}
          className="mb-6"
        />

        {/* Second Promo Banner */}
        {mockPromoBanners[1] && (
          <View className="px-4">
            <TouchableOpacity className="relative rounded-2xl overflow-hidden" activeOpacity={0.95}>
              <Image
                source={{ uri: mockPromoBanners[1].imageUrl }}
                className="w-full h-36"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-black/30 p-4 justify-end">
                <Badge variant="white" className="mb-2">
                  {mockPromoBanners[1].badge}
                </Badge>
                <Text className="text-lg font-bold text-white">{mockPromoBanners[1].title}</Text>
                <Text className="text-xs text-white/90">{mockPromoBanners[1].subtitle}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

