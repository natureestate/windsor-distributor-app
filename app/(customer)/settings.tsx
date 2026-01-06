/**
 * Settings Screen - หน้าการตั้งค่า
 * รวม Dark Mode Toggle และการตั้งค่าอื่นๆ
 */

import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, ThemeMode } from "../../contexts";

// ตัวเลือก Theme
const themeOptions: { mode: ThemeMode; label: string; icon: string }[] = [
  { mode: "light", label: "สว่าง", icon: "sunny-outline" },
  { mode: "dark", label: "มืด", icon: "moon-outline" },
  { mode: "system", label: "ตามระบบ", icon: "phone-portrait-outline" },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { themeMode, setThemeMode, isDark } = useTheme();

  // สี dynamic ตาม theme
  const bgColor = isDark ? "bg-background-dark" : "bg-background-light";
  const cardBg = isDark ? "bg-surface-dark" : "bg-white";
  const textMain = isDark ? "text-text-main-dark" : "text-text-main-light";
  const textSub = isDark ? "text-text-sub-dark" : "text-text-sub-light";
  const borderColor = isDark ? "border-border-dark" : "border-border-light";

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`} edges={["top"]}>
      {/* Header */}
      <View className={`flex-row items-center px-4 py-3 border-b ${borderColor}`}>
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center -ml-2"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={isDark ? "#e2e8f0" : "#0d141b"} />
        </TouchableOpacity>
        <Text className={`flex-1 text-lg font-semibold ${textMain} ml-2`}>การตั้งค่า</Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Theme Section */}
        <View className="mt-6">
          <Text className={`text-sm font-semibold ${textSub} px-4 mb-2`}>ธีม</Text>
          <View className={`${cardBg} mx-4 rounded-xl overflow-hidden`}>
            {themeOptions.map((option, index) => (
              <TouchableOpacity
                key={option.mode}
                className={`flex-row items-center px-4 py-4 ${
                  index < themeOptions.length - 1 ? `border-b ${borderColor}` : ""
                }`}
                onPress={() => setThemeMode(option.mode)}
              >
                {/* Icon */}
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center ${
                    isDark ? "bg-background-dark" : "bg-background-light"
                  }`}
                >
                  <Ionicons
                    name={option.icon as keyof typeof Ionicons.glyphMap}
                    size={20}
                    color={isDark ? "#94a3b8" : "#4c739a"}
                  />
                </View>

                {/* Label */}
                <Text className={`flex-1 ml-3 text-base ${textMain}`}>{option.label}</Text>

                {/* Check mark if selected */}
                {themeMode === option.mode && (
                  <Ionicons name="checkmark-circle" size={24} color="#137fec" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Toggle */}
        <View className="mt-6">
          <Text className={`text-sm font-semibold ${textSub} px-4 mb-2`}>สลับด่วน</Text>
          <View className={`${cardBg} mx-4 rounded-xl px-4 py-4 flex-row items-center`}>
            <View
              className={`w-10 h-10 rounded-full items-center justify-center ${
                isDark ? "bg-background-dark" : "bg-background-light"
              }`}
            >
              <Ionicons
                name={isDark ? "moon" : "sunny"}
                size={20}
                color={isDark ? "#fbbf24" : "#f59e0b"}
              />
            </View>
            <Text className={`flex-1 ml-3 text-base ${textMain}`}>โหมดมืด</Text>
            <Switch
              value={isDark}
              onValueChange={(value) => setThemeMode(value ? "dark" : "light")}
              trackColor={{ false: "#d1d5db", true: "#137fec" }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        {/* Notifications Section */}
        <View className="mt-6">
          <Text className={`text-sm font-semibold ${textSub} px-4 mb-2`}>การแจ้งเตือน</Text>
          <View className={`${cardBg} mx-4 rounded-xl overflow-hidden`}>
            {/* Push Notifications */}
            <View className={`flex-row items-center px-4 py-4 border-b ${borderColor}`}>
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  isDark ? "bg-background-dark" : "bg-background-light"
                }`}
              >
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={isDark ? "#94a3b8" : "#4c739a"}
                />
              </View>
              <Text className={`flex-1 ml-3 text-base ${textMain}`}>การแจ้งเตือน Push</Text>
              <Switch
                value={true}
                trackColor={{ false: "#d1d5db", true: "#137fec" }}
                thumbColor="#ffffff"
              />
            </View>

            {/* Email Notifications */}
            <View className={`flex-row items-center px-4 py-4 border-b ${borderColor}`}>
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  isDark ? "bg-background-dark" : "bg-background-light"
                }`}
              >
                <Ionicons name="mail-outline" size={20} color={isDark ? "#94a3b8" : "#4c739a"} />
              </View>
              <Text className={`flex-1 ml-3 text-base ${textMain}`}>แจ้งเตือนทางอีเมล</Text>
              <Switch
                value={true}
                trackColor={{ false: "#d1d5db", true: "#137fec" }}
                thumbColor="#ffffff"
              />
            </View>

            {/* SMS Notifications */}
            <View className="flex-row items-center px-4 py-4">
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  isDark ? "bg-background-dark" : "bg-background-light"
                }`}
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={20}
                  color={isDark ? "#94a3b8" : "#4c739a"}
                />
              </View>
              <Text className={`flex-1 ml-3 text-base ${textMain}`}>แจ้งเตือนทาง SMS</Text>
              <Switch
                value={false}
                trackColor={{ false: "#d1d5db", true: "#137fec" }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </View>

        {/* Language Section */}
        <View className="mt-6">
          <Text className={`text-sm font-semibold ${textSub} px-4 mb-2`}>ภาษา</Text>
          <TouchableOpacity
            className={`${cardBg} mx-4 rounded-xl px-4 py-4 flex-row items-center`}
          >
            <View
              className={`w-10 h-10 rounded-full items-center justify-center ${
                isDark ? "bg-background-dark" : "bg-background-light"
              }`}
            >
              <Ionicons name="language-outline" size={20} color={isDark ? "#94a3b8" : "#4c739a"} />
            </View>
            <Text className={`flex-1 ml-3 text-base ${textMain}`}>ภาษา</Text>
            <Text className={`text-sm ${textSub} mr-2`}>ไทย</Text>
            <Ionicons name="chevron-forward" size={18} color={isDark ? "#64748b" : "#d1d5db"} />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View className="mt-6">
          <Text className={`text-sm font-semibold ${textSub} px-4 mb-2`}>เกี่ยวกับ</Text>
          <View className={`${cardBg} mx-4 rounded-xl overflow-hidden`}>
            {/* Help */}
            <TouchableOpacity
              className={`flex-row items-center px-4 py-4 border-b ${borderColor}`}
            >
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  isDark ? "bg-background-dark" : "bg-background-light"
                }`}
              >
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color={isDark ? "#94a3b8" : "#4c739a"}
                />
              </View>
              <Text className={`flex-1 ml-3 text-base ${textMain}`}>ช่วยเหลือ</Text>
              <Ionicons name="chevron-forward" size={18} color={isDark ? "#64748b" : "#d1d5db"} />
            </TouchableOpacity>

            {/* Privacy Policy */}
            <TouchableOpacity
              className={`flex-row items-center px-4 py-4 border-b ${borderColor}`}
            >
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  isDark ? "bg-background-dark" : "bg-background-light"
                }`}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color={isDark ? "#94a3b8" : "#4c739a"}
                />
              </View>
              <Text className={`flex-1 ml-3 text-base ${textMain}`}>นโยบายความเป็นส่วนตัว</Text>
              <Ionicons name="chevron-forward" size={18} color={isDark ? "#64748b" : "#d1d5db"} />
            </TouchableOpacity>

            {/* Terms */}
            <TouchableOpacity
              className={`flex-row items-center px-4 py-4 border-b ${borderColor}`}
            >
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  isDark ? "bg-background-dark" : "bg-background-light"
                }`}
              >
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color={isDark ? "#94a3b8" : "#4c739a"}
                />
              </View>
              <Text className={`flex-1 ml-3 text-base ${textMain}`}>ข้อกำหนดการใช้งาน</Text>
              <Ionicons name="chevron-forward" size={18} color={isDark ? "#64748b" : "#d1d5db"} />
            </TouchableOpacity>

            {/* About App */}
            <TouchableOpacity className="flex-row items-center px-4 py-4">
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  isDark ? "bg-background-dark" : "bg-background-light"
                }`}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color={isDark ? "#94a3b8" : "#4c739a"}
                />
              </View>
              <Text className={`flex-1 ml-3 text-base ${textMain}`}>เกี่ยวกับแอป</Text>
              <Text className={`text-sm ${textSub} mr-2`}>v1.0.0</Text>
              <Ionicons name="chevron-forward" size={18} color={isDark ? "#64748b" : "#d1d5db"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

