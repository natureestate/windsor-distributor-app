/**
 * Favorites Screen - หน้าสินค้าที่ชอบ
 * แสดงรายการสินค้าที่ผู้ใช้กดถูกใจ
 * รองรับ Dark Mode
 */

import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Components
import { ProductCard } from "../../components/product";

// Context
import { useThemeColors } from "../../contexts";

// Mock Data
import { mockProductListItems } from "../../data/mockData";
import { ProductListItem } from "../../types/product";

export default function FavoritesScreen() {
  const router = useRouter();
  const { bgColor, cardBg, textMain, textSub, borderColor, iconMain, iconSub, isDark } =
    useThemeColors();

  // Mock favorites - สมมติว่าสินค้า 3 ตัวแรกเป็น favorites
  const [favorites, setFavorites] = useState<ProductListItem[]>(
    mockProductListItems.slice(0, 3)
  );

  // ลบออกจาก favorites
  const handleRemoveFavorite = (productId: string) => {
    Alert.alert("ลบออกจากรายการโปรด", "คุณต้องการลบสินค้านี้ออกจากรายการโปรดหรือไม่?", [
      { text: "ยกเลิก", style: "cancel" },
      {
        text: "ลบ",
        style: "destructive",
        onPress: () => {
          setFavorites((prev) => prev.filter((p) => p.id !== productId));
        },
      },
    ]);
  };

  // Render product item
  const renderProduct = ({ item, index }: { item: ProductListItem; index: number }) => {
    const isEven = index % 2 === 0;

    return (
      <View className={`flex-1 ${isEven ? "pr-1.5" : "pl-1.5"} mb-3`} style={{ maxWidth: "50%" }}>
        <View className="relative">
          <ProductCard
            product={item}
            variant="grid"
            onPress={() => router.push(`/(customer)/product/${item.id}`)}
          />
          {/* Remove button */}
          <TouchableOpacity
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm"
            onPress={() => handleRemoveFavorite(item.id)}
          >
            <Ionicons name="heart" size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`} edges={["top"]}>
      {/* Header */}
      <View className={`px-4 py-3 ${cardBg} border-b ${borderColor} flex-row items-center`}>
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color={iconMain} />
        </TouchableOpacity>
        <Text className={`text-xl font-bold ${textMain} flex-1`}>สินค้าที่ชอบ</Text>
        <Text className={`text-sm ${textSub}`}>{favorites.length} รายการ</Text>
      </View>

      {favorites.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="heart-outline" size={64} color={iconSub} />
          <Text className={`${textSub} text-base mt-4`}>ยังไม่มีสินค้าที่ชอบ</Text>
          <TouchableOpacity
            className="mt-4 px-6 py-3 bg-primary rounded-xl"
            onPress={() => router.push("/(customer)/(tabs)/catalog")}
          >
            <Text className="text-white font-medium">ดูสินค้าทั้งหมด</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </SafeAreaView>
  );
}

