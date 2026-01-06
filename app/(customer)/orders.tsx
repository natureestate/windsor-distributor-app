/**
 * Orders Screen - หน้าคำสั่งซื้อ
 * แสดงรายการคำสั่งซื้อทั้งหมดและติดตามสถานะ
 */

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Badge, Chip, Button } from "../../components/ui";

// Mock Data
import { mockOrders, mockOrderListItems } from "../../data/mockData";
import {
  formatPrice,
  formatDate,
  getOrderStatusText,
  getOrderStatusColor,
} from "../../lib/utils";
import { OrderStatus, Order } from "../../types/order";

// Tab filters
const orderTabs = [
  { id: "all", label: "ทั้งหมด" },
  { id: "pending_payment", label: "รอชำระ" },
  { id: "processing", label: "กำลังดำเนินการ" },
  { id: "shipped", label: "จัดส่งแล้ว" },
  { id: "completed", label: "สำเร็จ" },
];

export default function OrdersScreen() {
  const router = useRouter();

  // State
  const [selectedTab, setSelectedTab] = useState("all");

  // Filter orders
  const filteredOrders =
    selectedTab === "all"
      ? mockOrders
      : mockOrders.filter((o) => o.status === selectedTab);

  // Render order card
  const renderOrderCard = (order: Order) => {
    const firstItem = order.items[0];

    return (
      <TouchableOpacity
        key={order.id}
        className="bg-white rounded-xl p-4 mb-3"
        onPress={() => router.push(`/(customer)/orders/${order.id}`)}
        activeOpacity={0.9}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-sm font-semibold text-text-main-light">
              คำสั่งซื้อ #{order.orderNumber}
            </Text>
            <Text className="text-xs text-text-sub-light">
              {formatDate(order.createdAt)}
            </Text>
          </View>
          <Badge variant={getOrderStatusColor(order.status)}>
            {getOrderStatusText(order.status)}
          </Badge>
        </View>

        {/* Items preview */}
        <View className="flex-row items-center py-3 border-t border-b border-border-light">
          <Image
            source={{ uri: firstItem.productSnapshot.thumbnailUrl }}
            className="w-16 h-16 rounded-lg bg-gray-100"
            resizeMode="cover"
          />
          <View className="flex-1 ml-3">
            <Text
              className="text-sm text-text-main-light font-medium"
              numberOfLines={2}
            >
              {firstItem.productSnapshot.nameTh}
            </Text>
            <Text className="text-xs text-text-sub-light mt-0.5">
              x{firstItem.quantity}
              {order.items.length > 1 &&
                ` และอีก ${order.items.length - 1} รายการ`}
            </Text>
          </View>
        </View>

        {/* Tracking info (if shipped) */}
        {order.status === "shipped" && order.shipping.trackingNumber && (
          <View className="flex-row items-center py-3 border-b border-border-light">
            <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center">
              <Ionicons name="cube-outline" size={16} color="#137fec" />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-xs text-text-sub-light">
                {order.shipping.carrier}
              </Text>
              <Text className="text-sm font-medium text-text-main-light">
                {order.shipping.trackingNumber}
              </Text>
            </View>
            <TouchableOpacity className="px-3 py-1.5 bg-primary/10 rounded-lg">
              <Text className="text-xs text-primary font-medium">ติดตาม</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Footer */}
        <View className="flex-row items-center justify-between pt-3">
          <Text className="text-sm text-text-sub-light">ยอดรวม</Text>
          <Text className="text-base font-bold text-primary">
            {formatPrice(order.pricing.total)}
          </Text>
        </View>

        {/* Actions based on status */}
        {order.status === "pending_payment" && (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            className="mt-3"
            onPress={() => {}}
          >
            ชำระเงิน
          </Button>
        )}

        {order.status === "delivered" && (
          <View className="flex-row gap-2 mt-3">
            <Button variant="outline" size="sm" className="flex-1">
              รีวิว
            </Button>
            <Button variant="primary" size="sm" className="flex-1">
              สั่งซื้ออีกครั้ง
            </Button>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={["top"]}>
      {/* Header */}
      <View className="px-4 py-3 bg-white border-b border-border-light">
        <Text className="text-xl font-bold text-text-main-light">
          คำสั่งซื้อของฉัน
        </Text>
      </View>

      {/* Tabs */}
      <View className="bg-white border-b border-border-light">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
        >
          {orderTabs.map((tab) => (
            <Chip
              key={tab.id}
              label={tab.label}
              selected={selectedTab === tab.id}
              onPress={() => setSelectedTab(tab.id)}
              className="mr-2"
            />
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        {filteredOrders.length > 0 ? (
          filteredOrders.map(renderOrderCard)
        ) : (
          <View className="flex-1 items-center justify-center py-12">
            <Ionicons name="receipt-outline" size={48} color="#d1d5db" />
            <Text className="text-text-sub-light text-base mt-4">
              ไม่มีคำสั่งซื้อ
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

