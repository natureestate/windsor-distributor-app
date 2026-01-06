/**
 * Profile Screen - หน้าโปรไฟล์ผู้ใช้
 * แสดงข้อมูลผู้ใช้และการตั้งค่า
 */

import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Mock Data
import { mockUser } from "../../data/mockData";

// Menu items
const menuSections = [
  {
    title: "บัญชีของฉัน",
    items: [
      { id: "profile", icon: "person-outline", label: "ข้อมูลส่วนตัว" },
      { id: "addresses", icon: "location-outline", label: "ที่อยู่จัดส่ง" },
      { id: "payment", icon: "card-outline", label: "วิธีชำระเงิน" },
    ],
  },
  {
    title: "คำสั่งซื้อ",
    items: [
      { id: "orders", icon: "receipt-outline", label: "ประวัติคำสั่งซื้อ" },
      { id: "favorites", icon: "heart-outline", label: "สินค้าที่ชอบ" },
      { id: "reviews", icon: "star-outline", label: "รีวิวของฉัน" },
    ],
  },
  {
    title: "การตั้งค่า",
    items: [
      { id: "notifications", icon: "notifications-outline", label: "การแจ้งเตือน" },
      { id: "language", icon: "language-outline", label: "ภาษา" },
      { id: "help", icon: "help-circle-outline", label: "ช่วยเหลือ" },
      { id: "about", icon: "information-circle-outline", label: "เกี่ยวกับแอป" },
    ],
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleMenuPress = (id: string) => {
    switch (id) {
      case "orders":
        router.push("/(customer)/orders");
        break;
      default:
        alert(`เปิดหน้า ${id}`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header */}
        <View className="bg-primary px-4 pt-4 pb-8">
          <View className="flex-row items-center">
            {/* Avatar */}
            <View className="w-16 h-16 rounded-full border-2 border-white overflow-hidden">
              <Image source={{ uri: mockUser.avatarUrl }} className="w-full h-full" />
            </View>

            {/* User info */}
            <View className="flex-1 ml-4">
              <Text className="text-lg font-bold text-white">{mockUser.displayName}</Text>
              <Text className="text-sm text-white/80">{mockUser.email}</Text>
              <Text className="text-sm text-white/80">{mockUser.phoneNumber}</Text>
            </View>

            {/* Edit button */}
            <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
              <Ionicons name="pencil-outline" size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="mx-4 -mt-4 bg-white rounded-xl p-4 shadow-sm flex-row">
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-primary">
              {mockUser.recentOrdersSummary?.length || 0}
            </Text>
            <Text className="text-xs text-text-sub-light mt-1">คำสั่งซื้อ</Text>
          </View>
          <View className="w-px bg-border-light" />
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-primary">0</Text>
            <Text className="text-xs text-text-sub-light mt-1">คูปอง</Text>
          </View>
          <View className="w-px bg-border-light" />
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-primary">0</Text>
            <Text className="text-xs text-text-sub-light mt-1">แต้มสะสม</Text>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <View key={section.title} className="mt-6">
            <Text className="text-sm font-semibold text-text-sub-light px-4 mb-2">
              {section.title}
            </Text>
            <View className="bg-white mx-4 rounded-xl overflow-hidden">
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  className={`flex-row items-center px-4 py-3 ${
                    index < section.items.length - 1 ? "border-b border-border-light" : ""
                  }`}
                  onPress={() => handleMenuPress(item.id)}
                >
                  <View className="w-8 h-8 bg-background-light rounded-full items-center justify-center">
                    <Ionicons
                      name={item.icon as keyof typeof Ionicons.glyphMap}
                      size={18}
                      color="#4c739a"
                    />
                  </View>
                  <Text className="flex-1 ml-3 text-sm text-text-main-light">{item.label}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#d1d5db" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity className="mx-4 mt-6 bg-white rounded-xl p-4 flex-row items-center justify-center">
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text className="ml-2 text-red-500 font-medium">ออกจากระบบ</Text>
        </TouchableOpacity>

        {/* App version */}
        <Text className="text-center text-xs text-text-sub-light mt-6">
          WINDSOR Distributor v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
