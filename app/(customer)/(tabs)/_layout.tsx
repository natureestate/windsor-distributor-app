/**
 * Customer Tabs Layout - Bottom Tab Navigation
 * แสดง Tab Bar ด้านล่างสำหรับหน้าหลักๆ
 */

import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Tab configuration
const tabs = [
  { name: "index", title: "หน้าแรก", icon: "home" },
  { name: "catalog", title: "สินค้า", icon: "grid" },
  { name: "cart", title: "ตะกร้า", icon: "cart" },
  { name: "orders", title: "คำสั่งซื้อ", icon: "receipt" },
  { name: "profile", title: "บัญชี", icon: "person" },
] as const;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#137fec",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginTop: 2,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? (tab.icon as any) : (`${tab.icon}-outline` as any)}
                size={24}
                color={color}
              />
            ),
            // แสดง badge บนตะกร้า (mock)
            ...(tab.name === "cart" && {
              tabBarBadge: 2,
              tabBarBadgeStyle: {
                backgroundColor: "#ef4444",
                fontSize: 10,
                minWidth: 18,
                height: 18,
              },
            }),
          }}
        />
      ))}
    </Tabs>
  );
}

