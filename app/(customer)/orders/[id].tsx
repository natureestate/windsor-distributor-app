/**
 * Order Details Screen - หน้ารายละเอียดคำสั่งซื้อ
 * แสดงรายละเอียดคำสั่งซื้อ, สถานะ, การจัดส่ง
 */

import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Badge, Button } from "../../../components/ui";

// Mock Data
import { mockOrders } from "../../../data/mockData";
import { formatPrice, formatDate, getOrderStatusText, getOrderStatusColor } from "../../../lib/utils";

// Order status timeline
const statusTimeline = [
  { status: "pending_payment", label: "รอชำระเงิน", icon: "time-outline" },
  { status: "processing", label: "กำลังดำเนินการ", icon: "cog-outline" },
  { status: "shipped", label: "จัดส่งแล้ว", icon: "cube-outline" },
  { status: "delivered", label: "ได้รับสินค้าแล้ว", icon: "checkmark-circle-outline" },
];

export default function OrderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // หา order จาก mock data
  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-background-light" edges={["top"]}>
        <View className="flex-1 items-center justify-center">
          <Ionicons name="alert-circle-outline" size={48} color="#d1d5db" />
          <Text className="text-text-sub-light mt-4">ไม่พบคำสั่งซื้อ</Text>
          <Button variant="primary" className="mt-4" onPress={() => router.back()}>
            กลับ
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  // หา index ของ status ปัจจุบัน
  const currentStatusIndex = statusTimeline.findIndex((s) => s.status === order.status);

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={["top"]}>
      {/* Header */}
      <View className="px-4 py-3 bg-white border-b border-border-light flex-row items-center">
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({
            marginRight: 12,
            opacity: pressed ? 0.6 : 1,
            cursor: Platform.OS === "web" ? "pointer" : undefined,
          })}
          accessibilityRole="button"
          accessibilityLabel="กลับ"
        >
          <Ionicons name="arrow-back" size={24} color="#0d141b" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-lg font-bold text-text-main-light">
            คำสั่งซื้อ #{order.orderNumber}
          </Text>
          <Text className="text-xs text-text-sub-light">{formatDate(order.createdAt)}</Text>
        </View>
        <Badge variant={getOrderStatusColor(order.status)}>
          {getOrderStatusText(order.status)}
        </Badge>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      >
        {/* Status Timeline */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-sm font-semibold text-text-main-light mb-4">สถานะคำสั่งซื้อ</Text>

          <View className="flex-row justify-between">
            {statusTimeline.map((step, index) => {
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;

              return (
                <View key={step.status} className="items-center flex-1">
                  {/* Line connector */}
                  {index > 0 && (
                    <View
                      className={`absolute top-4 right-1/2 left-0 h-0.5 -z-10 ${
                        index <= currentStatusIndex ? "bg-primary" : "bg-border-light"
                      }`}
                      style={{ width: "100%", left: "-50%" }}
                    />
                  )}

                  {/* Icon */}
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center ${
                      isCompleted ? "bg-primary" : "bg-background-light"
                    }`}
                  >
                    <Ionicons
                      name={step.icon as keyof typeof Ionicons.glyphMap}
                      size={16}
                      color={isCompleted ? "#ffffff" : "#94a3b8"}
                    />
                  </View>

                  {/* Label */}
                  <Text
                    className={`text-xs mt-2 text-center ${
                      isCurrent ? "text-primary font-semibold" : "text-text-sub-light"
                    }`}
                    numberOfLines={2}
                  >
                    {step.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Shipping Info */}
        {order.shipping.trackingNumber && (
          <View className="bg-white rounded-xl p-4 mb-4">
            <Text className="text-sm font-semibold text-text-main-light mb-3">ข้อมูลการจัดส่ง</Text>

            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
                <Ionicons name="cube-outline" size={20} color="#137fec" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-xs text-text-sub-light">{order.shipping.carrier}</Text>
                <Text className="text-sm font-medium text-text-main-light">
                  {order.shipping.trackingNumber}
                </Text>
              </View>
              <TouchableOpacity className="px-4 py-2 bg-primary rounded-lg">
                <Text className="text-sm text-white font-medium">ติดตามพัสดุ</Text>
              </TouchableOpacity>
            </View>

            {order.shipping.estimatedDelivery && (
              <View className="flex-row items-center mt-3 pt-3 border-t border-border-light">
                <Ionicons name="calendar-outline" size={16} color="#4c739a" />
                <Text className="text-sm text-text-sub-light ml-2">
                  คาดว่าจะได้รับ: {formatDate(order.shipping.estimatedDelivery)}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Delivery Address */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-sm font-semibold text-text-main-light mb-3">ที่อยู่จัดส่ง</Text>

          <View className="flex-row items-start">
            <Ionicons name="location-outline" size={20} color="#137fec" />
            <View className="flex-1 ml-2">
              <Text className="text-sm font-medium text-text-main-light">
                {order.shipping.address.recipientName} • {order.shipping.address.phoneNumber}
              </Text>
              <Text className="text-sm text-text-sub-light mt-1">
                {order.shipping.address.addressLine1}
                {order.shipping.address.addressLine2 && `, ${order.shipping.address.addressLine2}`}
              </Text>
              <Text className="text-sm text-text-sub-light">
                {order.shipping.address.subDistrict}, {order.shipping.address.district},{" "}
                {order.shipping.address.province} {order.shipping.address.postalCode}
              </Text>
            </View>
          </View>
        </View>

        {/* Order Items */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-sm font-semibold text-text-main-light mb-3">
            รายการสินค้า ({order.items.length})
          </Text>

          {order.items.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row py-3 ${
                index < order.items.length - 1 ? "border-b border-border-light" : ""
              }`}
              onPress={() => router.push(`/(customer)/product/${item.productId}`)}
            >
              <Image
                source={{ uri: item.productSnapshot.thumbnailUrl }}
                className="w-16 h-16 rounded-lg bg-gray-100"
                resizeMode="cover"
              />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-medium text-text-main-light" numberOfLines={2}>
                  {item.productSnapshot.nameTh}
                </Text>
                <Text className="text-xs text-text-sub-light mt-0.5">
                  SKU: {item.productSnapshot.sku}
                </Text>
                {item.configuration.width && (
                  <Text className="text-xs text-text-sub-light">
                    ขนาด: {item.configuration.width} x {item.configuration.height} ซม.
                  </Text>
                )}
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="text-xs text-text-sub-light">x{item.quantity}</Text>
                  <Text className="text-sm font-semibold text-primary">
                    {formatPrice(item.totalPrice)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Summary */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-sm font-semibold text-text-main-light mb-3">สรุปการชำระเงิน</Text>

          <View className="space-y-2">
            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-text-sub-light">ยอดรวมสินค้า</Text>
              <Text className="text-sm text-text-main-light">
                {formatPrice(order.pricing.subtotal)}
              </Text>
            </View>

            {order.pricing.discount > 0 && (
              <View className="flex-row justify-between py-1">
                <Text className="text-sm text-green-600">ส่วนลด</Text>
                <Text className="text-sm text-green-600">
                  -{formatPrice(order.pricing.discount)}
                </Text>
              </View>
            )}

            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-text-sub-light">ค่าจัดส่ง</Text>
              <Text className="text-sm text-text-main-light">
                {order.pricing.shipping > 0 ? formatPrice(order.pricing.shipping) : "ฟรี"}
              </Text>
            </View>

            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-text-sub-light">ภาษี (7%)</Text>
              <Text className="text-sm text-text-main-light">{formatPrice(order.pricing.vat)}</Text>
            </View>

            <View className="border-t border-border-light my-2" />

            <View className="flex-row justify-between py-1">
              <Text className="text-base font-bold text-text-main-light">ยอดรวมทั้งสิ้น</Text>
              <Text className="text-xl font-bold text-primary">
                {formatPrice(order.pricing.total)}
              </Text>
            </View>
          </View>

          {/* Payment Method */}
          <View className="flex-row items-center mt-4 pt-3 border-t border-border-light">
            <Ionicons name="card-outline" size={18} color="#4c739a" />
            <Text className="text-sm text-text-sub-light ml-2">
              ชำระผ่าน:{" "}
              {order.payment.method === "credit_card"
                ? "บัตรเครดิต/เดบิต"
                : order.payment.method === "promptpay"
                  ? "พร้อมเพย์"
                  : order.payment.method === "bank_transfer"
                    ? "โอนเงินธนาคาร"
                    : "ผ่อนชำระ"}
            </Text>
          </View>
        </View>

        {/* Notes */}
        {order.notes && (
          <View className="bg-white rounded-xl p-4 mb-4">
            <Text className="text-sm font-semibold text-text-main-light mb-2">หมายเหตุ</Text>
            <Text className="text-sm text-text-sub-light">{order.notes}</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-border-light px-4 py-3 pb-8">
        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-1 h-12 border border-border-light rounded-xl items-center justify-center flex-row">
            <Ionicons name="chatbubble-outline" size={18} color="#0d141b" />
            <Text className="text-text-main-light font-medium ml-2">ติดต่อร้านค้า</Text>
          </TouchableOpacity>

          {order.status === "pending_payment" && (
            <Button variant="primary" size="lg" className="flex-1">
              ชำระเงิน
            </Button>
          )}

          {order.status === "delivered" && (
            <Button variant="primary" size="lg" className="flex-1">
              สั่งซื้ออีกครั้ง
            </Button>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

