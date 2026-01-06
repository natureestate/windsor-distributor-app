/**
 * Cart Screen - หน้าตะกร้าสินค้า
 * แสดงรายการสินค้าในตะกร้า, ส่วนลด, และสรุปราคา
 */

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Button, Input } from "../../components/ui";

// Mock Data
import { mockCart, mockCartItems } from "../../data/mockData";
import { formatPrice } from "../../lib/utils";
import { CartItem } from "../../types/cart";

export default function CartScreen() {
  const router = useRouter();

  // State
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // คำนวณยอดรวม
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const vat = Math.round(subtotal * 0.07);
  const total = subtotal + vat - appliedDiscount;

  // อัปเดตจำนวนสินค้า
  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQty = Math.max(1, item.quantity + delta);
          return {
            ...item,
            quantity: newQty,
            totalPrice: item.unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  // ลบสินค้า
  const removeItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // ใช้รหัสส่วนลด
  const applyDiscount = () => {
    if (discountCode.toUpperCase() === "SUMMER15") {
      const discount = Math.min(subtotal * 0.15, 3000);
      setAppliedDiscount(discount);
      alert(`ใช้รหัสส่วนลดสำเร็จ! ลด ${formatPrice(discount)}`);
    } else if (discountCode.toUpperCase() === "WELCOME500") {
      setAppliedDiscount(500);
      alert("ใช้รหัสส่วนลดสำเร็จ! ลด ฿500");
    } else {
      alert("รหัสส่วนลดไม่ถูกต้อง");
    }
  };

  // Render cart item
  const renderCartItem = (item: CartItem) => (
    <View
      key={item.id}
      className="bg-white rounded-xl p-4 mb-3 flex-row"
    >
      {/* รูปภาพ */}
      <Image
        source={{ uri: item.productSnapshot.thumbnailUrl }}
        className="w-20 h-20 rounded-lg bg-gray-100"
        resizeMode="cover"
      />

      {/* รายละเอียด */}
      <View className="flex-1 ml-3">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 mr-2">
            <Text
              className="text-sm font-medium text-text-main-light"
              numberOfLines={2}
            >
              {item.productSnapshot.nameTh}
            </Text>
            <Text className="text-xs text-text-sub-light mt-0.5">
              SKU: {item.productSnapshot.sku}
            </Text>
          </View>

          {/* ปุ่มลบ */}
          <TouchableOpacity
            onPress={() => removeItem(item.id)}
            hitSlop={8}
          >
            <Ionicons name="trash-outline" size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>

        {/* Configuration (ถ้ามี) */}
        {item.configuration.width && (
          <Text className="text-xs text-text-sub-light mt-1">
            ขนาด: {item.configuration.width} x {item.configuration.height} ซม.
          </Text>
        )}

        {/* ราคาและจำนวน */}
        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-base font-bold text-primary">
            {formatPrice(item.totalPrice)}
          </Text>

          {/* Quantity controls */}
          <View className="flex-row items-center bg-background-light rounded-lg">
            <TouchableOpacity
              className="w-8 h-8 items-center justify-center"
              onPress={() => updateQuantity(item.id, -1)}
            >
              <Ionicons name="remove" size={18} color="#0d141b" />
            </TouchableOpacity>
            <Text className="w-8 text-center font-medium text-text-main-light">
              {item.quantity}
            </Text>
            <TouchableOpacity
              className="w-8 h-8 items-center justify-center"
              onPress={() => updateQuantity(item.id, 1)}
            >
              <Ionicons name="add" size={18} color="#0d141b" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-background-light" edges={["top"]}>
        <View className="flex-1 items-center justify-center px-4">
          <Ionicons name="cart-outline" size={64} color="#d1d5db" />
          <Text className="text-lg font-medium text-text-main-light mt-4">
            ตะกร้าว่างเปล่า
          </Text>
          <Text className="text-sm text-text-sub-light mt-1 text-center">
            เพิ่มสินค้าลงตะกร้าเพื่อเริ่มช้อปปิ้ง
          </Text>
          <Button
            variant="primary"
            className="mt-6"
            onPress={() => router.push("/(customer)/catalog")}
          >
            เลือกซื้อสินค้า
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={["top"]}>
      {/* Header */}
      <View className="px-4 py-3 bg-white border-b border-border-light">
        <Text className="text-xl font-bold text-text-main-light">
          ตะกร้าสินค้า
        </Text>
        <Text className="text-sm text-text-sub-light">
          {cartItems.length} รายการ
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 200 }}
      >
        {/* Cart Items */}
        {cartItems.map(renderCartItem)}

        {/* Discount Code */}
        <View className="bg-white rounded-xl p-4 mb-3">
          <Text className="text-sm font-semibold text-text-main-light mb-3">
            รหัสส่วนลด
          </Text>
          <View className="flex-row gap-2">
            <View className="flex-1">
              <Input
                placeholder="กรอกรหัสส่วนลด"
                value={discountCode}
                onChangeText={setDiscountCode}
                autoCapitalize="characters"
              />
            </View>
            <Button
              variant="outline"
              onPress={applyDiscount}
              disabled={!discountCode}
            >
              ใช้
            </Button>
          </View>
          {appliedDiscount > 0 && (
            <View className="flex-row items-center mt-2">
              <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
              <Text className="text-sm text-green-600 ml-1">
                ใช้รหัส {discountCode.toUpperCase()} แล้ว
              </Text>
            </View>
          )}
        </View>

        {/* Order Summary */}
        <View className="bg-white rounded-xl p-4">
          <Text className="text-sm font-semibold text-text-main-light mb-3">
            สรุปคำสั่งซื้อ
          </Text>

          <View className="space-y-2">
            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-text-sub-light">ยอดรวมสินค้า</Text>
              <Text className="text-sm text-text-main-light">
                {formatPrice(subtotal)}
              </Text>
            </View>

            {appliedDiscount > 0 && (
              <View className="flex-row justify-between py-1">
                <Text className="text-sm text-green-600">ส่วนลด</Text>
                <Text className="text-sm text-green-600">
                  -{formatPrice(appliedDiscount)}
                </Text>
              </View>
            )}

            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-text-sub-light">ภาษี (7%)</Text>
              <Text className="text-sm text-text-main-light">
                {formatPrice(vat)}
              </Text>
            </View>

            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-text-sub-light">ค่าจัดส่ง</Text>
              <Text className="text-sm text-text-main-light">
                คำนวณในขั้นตอนถัดไป
              </Text>
            </View>

            <View className="border-t border-border-light my-2" />

            <View className="flex-row justify-between py-1">
              <Text className="text-base font-bold text-text-main-light">
                ยอดรวมทั้งสิ้น
              </Text>
              <Text className="text-xl font-bold text-primary">
                {formatPrice(total)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-border-light px-4 py-3 pb-8">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => router.push("/(customer)/checkout")}
        >
          ดำเนินการสั่งซื้อ
        </Button>
      </View>
    </SafeAreaView>
  );
}

