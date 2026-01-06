/**
 * Profile Screen - หน้าโปรไฟล์ผู้ใช้
 * แสดงข้อมูลผู้ใช้และการตั้งค่า
 * รองรับ Dark Mode
 */

import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Context
import { useThemeColors } from "../../../contexts";

// Mock Data
import { mockUser } from "../../../data/mockData";

// Menu items - ลบ "การตั้งค่า" ออกเพราะมีหน้า Settings แยกแล้ว (กดปุ่มเฟือง)
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
];

export default function ProfileScreen() {
  const router = useRouter();
  const { bgColor, cardBg, textMain, textSub, borderColor, iconSub, isDark } = useThemeColors();

  // ฟังก์ชันกดเมนู
  const handleMenuPress = (id: string) => {
    switch (id) {
      case "profile":
        // ไปหน้าแก้ไขข้อมูลส่วนตัว
        router.push("/(customer)/edit-profile");
        break;
      case "orders":
        router.push("/(customer)/(tabs)/orders");
        break;
      case "addresses":
        // ไปหน้าจัดการที่อยู่
        router.push("/(customer)/addresses");
        break;
      case "payment":
        // ไปหน้าวิธีชำระเงิน
        router.push("/(customer)/payment-methods");
        break;
      case "favorites":
        // ไปหน้าสินค้าที่ชอบ
        router.push("/(customer)/favorites");
        break;
      case "reviews":
        // ไปหน้ารีวิวของฉัน
        router.push("/(customer)/reviews");
        break;
      default:
        Alert.alert("Coming Soon", `หน้า ${id} จะพร้อมใช้งานเร็วๆ นี้`);
    }
  };

  // ฟังก์ชัน Logout
  const handleLogout = () => {
    Alert.alert("ออกจากระบบ", "คุณต้องการออกจากระบบหรือไม่?", [
      { text: "ยกเลิก", style: "cancel" },
      {
        text: "ออกจากระบบ",
        style: "destructive",
        onPress: () => {
          // Mock logout - ไปหน้า Login
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary" edges={["top"]}>
      <ScrollView
        className={`flex-1 ${bgColor}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header */}
        <View className="bg-primary px-4 pt-2 pb-8">
          {/* Top Bar */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="w-10 h-10" />
            <Text className="text-lg font-semibold text-white">บัญชีของฉัน</Text>
            {/* ปุ่มเฟือง - ไปหน้า Settings */}
            <TouchableOpacity
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
              onPress={() => router.push("/(customer)/settings")}
            >
              <Ionicons name="settings-outline" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* User Info */}
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

            {/* ปุ่มดินสอ - แก้ไขโปรไฟล์ */}
            <TouchableOpacity
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
              onPress={() => handleMenuPress("profile")}
            >
              <Ionicons name="pencil-outline" size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View className={`mx-4 -mt-4 ${cardBg} rounded-xl p-4 shadow-sm flex-row`}>
          <TouchableOpacity className="flex-1 items-center" onPress={() => router.push("/(customer)/(tabs)/orders")}>
            <Text className="text-xl font-bold text-primary">
              {mockUser.recentOrdersSummary?.length || 0}
            </Text>
            <Text className={`text-xs ${textSub} mt-1`}>คำสั่งซื้อ</Text>
          </TouchableOpacity>
          <View className={`w-px ${isDark ? "bg-border-dark" : "bg-border-light"}`} />
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-primary">0</Text>
            <Text className={`text-xs ${textSub} mt-1`}>คูปอง</Text>
          </View>
          <View className={`w-px ${isDark ? "bg-border-dark" : "bg-border-light"}`} />
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-primary">0</Text>
            <Text className={`text-xs ${textSub} mt-1`}>แต้มสะสม</Text>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <View key={section.title} className="mt-6">
            <Text className={`text-sm font-semibold ${textSub} px-4 mb-2`}>
              {section.title}
            </Text>
            <View className={`${cardBg} mx-4 rounded-xl overflow-hidden`}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  className={`flex-row items-center px-4 py-3 ${
                    index < section.items.length - 1 ? `border-b ${borderColor}` : ""
                  }`}
                  onPress={() => handleMenuPress(item.id)}
                >
                  <View className={`w-8 h-8 ${bgColor} rounded-full items-center justify-center`}>
                    <Ionicons
                      name={item.icon as keyof typeof Ionicons.glyphMap}
                      size={18}
                      color={iconSub}
                    />
                  </View>
                  <Text className={`flex-1 ml-3 text-sm ${textMain}`}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={18} color={isDark ? "#64748b" : "#d1d5db"} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity
          className={`mx-4 mt-6 ${cardBg} rounded-xl p-4 flex-row items-center justify-center`}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text className="ml-2 text-red-500 font-medium">ออกจากระบบ</Text>
        </TouchableOpacity>

        {/* App version */}
        <Text className={`text-center text-xs ${textSub} mt-6`}>
          WINDSOR Distributor v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

