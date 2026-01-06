/**
 * Customer Tabs Layout - Custom Bottom Tab Navigation
 * ใช้ Slot + Custom Tab Bar แทน Tabs component เพื่อรองรับ New Architecture
 * รองรับ Dark Mode
 */

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Slot, usePathname, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "../../../contexts";

// Tab configuration
const tabs = [
  { name: "index", path: "/(customer)/(tabs)", title: "หน้าแรก", icon: "home" },
  { name: "catalog", path: "/(customer)/(tabs)/catalog", title: "สินค้า", icon: "grid" },
  { name: "cart", path: "/(customer)/(tabs)/cart", title: "ตะกร้า", icon: "cart", badge: 2 },
  { name: "orders", path: "/(customer)/(tabs)/orders", title: "คำสั่งซื้อ", icon: "receipt" },
  { name: "profile", path: "/(customer)/(tabs)/profile", title: "บัญชี", icon: "person" },
] as const;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();
  const { isDark, raw } = useThemeColors();

  // หา active tab จาก pathname
  const getActiveTab = () => {
    if (pathname === "/" || pathname === "/(customer)/(tabs)" || pathname === "/index") {
      return "index";
    }
    const match = tabs.find(
      (tab) => tab.name !== "index" && pathname.includes(`/${tab.name}`)
    );
    return match?.name || "index";
  };

  const activeTab = getActiveTab();

  return (
    <View style={{ flex: 1 }}>
      {/* Content */}
      <View style={{ flex: 1 }}>
        <Slot />
      </View>

      {/* Custom Tab Bar - รองรับ Dark Mode */}
      <View
        style={{
          backgroundColor: isDark ? "#1e2936" : "#ffffff",
          borderTopWidth: 1,
          borderTopColor: isDark ? "#334155" : "#e5e7eb",
          paddingBottom: insets.bottom,
          paddingTop: 8,
          flexDirection: "row",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          const inactiveColor = isDark ? "#64748b" : "#94a3b8";

          return (
            <TouchableOpacity
              key={tab.name}
              style={{
                flex: 1,
                alignItems: "center",
                paddingVertical: 4,
              }}
              onPress={() => router.push(tab.path as any)}
            >
              {/* Icon Container with Badge */}
              <View style={{ position: "relative" }}>
                <Ionicons
                  name={isActive ? (tab.icon as any) : (`${tab.icon}-outline` as any)}
                  size={24}
                  color={isActive ? "#137fec" : inactiveColor}
                />

                {/* Badge */}
                {tab.badge && tab.badge > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -8,
                      backgroundColor: "#ef4444",
                      borderRadius: 9,
                      minWidth: 18,
                      height: 18,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingHorizontal: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 10,
                        fontWeight: "600",
                      }}
                    >
                      {tab.badge}
                    </Text>
                  </View>
                )}
              </View>

              {/* Label */}
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "500",
                  marginTop: 2,
                  color: isActive ? "#137fec" : inactiveColor,
                }}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
