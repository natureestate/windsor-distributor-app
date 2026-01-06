/**
 * Admin Dashboard - หน้าหลักสำหรับ Admin
 * แสดงสรุปยอดขาย, คำสั่งซื้อ, และ quick actions
 */

import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Card } from "../../components/ui";

// Mock stats
const dashboardStats = [
  {
    id: "orders",
    label: "คำสั่งซื้อวันนี้",
    value: "24",
    change: "+12%",
    icon: "receipt-outline",
    color: "#137fec",
  },
  {
    id: "revenue",
    label: "รายได้วันนี้",
    value: "฿125,400",
    change: "+8%",
    icon: "cash-outline",
    color: "#22c55e",
  },
  {
    id: "customers",
    label: "ลูกค้าใหม่",
    value: "18",
    change: "+5%",
    icon: "people-outline",
    color: "#f59e0b",
  },
  {
    id: "pending",
    label: "รอดำเนินการ",
    value: "7",
    change: "-2",
    icon: "time-outline",
    color: "#ef4444",
  },
];

export default function AdminDashboard() {
  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-text-main-light">แดชบอร์ด</Text>
          <Text className="text-sm text-text-sub-light mt-1">WINDSOR Distributor Admin</Text>
        </View>

        {/* Stats Grid */}
        <View className="flex-row flex-wrap -mx-1.5 mb-6">
          {dashboardStats.map((stat) => (
            <View key={stat.id} className="w-1/2 px-1.5 mb-3">
              <Card className="p-4">
                <View className="flex-row items-center justify-between mb-2">
                  <View
                    className="w-10 h-10 rounded-xl items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Ionicons
                      name={stat.icon as keyof typeof Ionicons.glyphMap}
                      size={20}
                      color={stat.color}
                    />
                  </View>
                  <Text
                    className={`text-xs font-medium ${
                      stat.change.startsWith("+") ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </Text>
                </View>
                <Text className="text-2xl font-bold text-text-main-light">{stat.value}</Text>
                <Text className="text-xs text-text-sub-light mt-1">{stat.label}</Text>
              </Card>
            </View>
          ))}
        </View>

        {/* Recent Orders */}
        <Card className="mb-6">
          <View className="p-4 border-b border-border-light">
            <Text className="text-lg font-semibold text-text-main-light">คำสั่งซื้อล่าสุด</Text>
          </View>
          <View className="p-4">
            <Text className="text-sm text-text-sub-light text-center py-8">
              ยังไม่มีข้อมูล - กำลังพัฒนา
            </Text>
          </View>
        </Card>

        {/* Quick Actions */}
        <Card>
          <View className="p-4 border-b border-border-light">
            <Text className="text-lg font-semibold text-text-main-light">การดำเนินการด่วน</Text>
          </View>
          <View className="p-4">
            <Text className="text-sm text-text-sub-light text-center py-8">
              ยังไม่มีข้อมูล - กำลังพัฒนา
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
