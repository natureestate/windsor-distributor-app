/**
 * Customer Layout - Tab Navigation สำหรับลูกค้า
 * รองรับ Bottom Tab Navigation ตาม design reference
 */

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

// Tab bar icon component
function TabBarIcon({
  name,
  color,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
}) {
  return (
    <Ionicons
      name={focused ? name : (`${name}-outline` as keyof typeof Ionicons.glyphMap)}
      size={24}
      color={color}
    />
  );
}

export default function CustomerLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#137fec",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e2e8f0",
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 24 : 8,
          height: Platform.OS === "ios" ? 84 : 64,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginTop: 4,
        },
      }}
    >
      {/* หน้าแรก */}
      <Tabs.Screen
        name="index"
        options={{
          title: "หน้าแรก",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} focused={focused} />
          ),
        }}
      />

      {/* แคตตาล็อก */}
      <Tabs.Screen
        name="catalog"
        options={{
          title: "สินค้า",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="grid" color={color} focused={focused} />
          ),
        }}
      />

      {/* ตะกร้า */}
      <Tabs.Screen
        name="cart"
        options={{
          title: "ตะกร้า",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="cart" color={color} focused={focused} />
          ),
        }}
      />

      {/* คำสั่งซื้อ */}
      <Tabs.Screen
        name="orders"
        options={{
          title: "คำสั่งซื้อ",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="receipt" color={color} focused={focused} />
          ),
        }}
      />

      {/* โปรไฟล์ */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "บัญชี",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="person" color={color} focused={focused} />
          ),
        }}
      />

      {/* ซ่อน screens ที่ไม่ต้องการแสดงใน tab bar */}
      <Tabs.Screen
        name="product/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="checkout"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
