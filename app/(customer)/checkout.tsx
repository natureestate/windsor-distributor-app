/**
 * Checkout Screen - หน้าชำระเงิน
 * แสดงที่อยู่จัดส่ง, วิธีชำระเงิน, และยืนยันคำสั่งซื้อ
 */

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Button, Card } from "../../components/ui";

// Mock Data
import { mockUser, mockCartItems } from "../../data/mockData";
import { formatPrice } from "../../lib/utils";
import { PaymentMethod } from "../../types/order";

// Payment methods
const paymentMethods: {
  id: PaymentMethod;
  name: string;
  nameTh: string;
  icon: keyof typeof Ionicons.glyphMap;
  description?: string;
}[] = [
  {
    id: "credit_card",
    name: "Credit/Debit Card",
    nameTh: "บัตรเครดิต/เดบิต",
    icon: "card-outline",
    description: "Visa, Mastercard, JCB",
  },
  {
    id: "promptpay",
    name: "PromptPay",
    nameTh: "พร้อมเพย์",
    icon: "qr-code-outline",
    description: "สแกน QR Code",
  },
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    nameTh: "โอนเงินธนาคาร",
    icon: "business-outline",
    description: "โอนเข้าบัญชีธนาคาร",
  },
  {
    id: "installment",
    name: "Installment",
    nameTh: "ผ่อนชำระ",
    icon: "calendar-outline",
    description: "ผ่อน 0% นาน 10 เดือน",
  },
];

export default function CheckoutScreen() {
  const router = useRouter();

  // State
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);

  // ที่อยู่จัดส่งเริ่มต้น
  const defaultAddress = mockUser.addresses.find((a) => a.isDefault) || mockUser.addresses[0];

  // คำนวณราคา
  const subtotal = mockCartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = 0; // ฟรีค่าจัดส่ง
  const vat = Math.round(subtotal * 0.07);
  const total = subtotal + shipping + vat;

  // ยืนยันคำสั่งซื้อ
  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    
    // Navigate to success/orders
    alert("สั่งซื้อสำเร็จ!");
    router.replace("/(customer)/orders");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={["top"]}>
      {/* Header */}
      <View className="px-4 py-3 bg-white border-b border-border-light flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#0d141b" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-main-light">
          ชำระเงิน
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 200 }}
      >
        {/* Shipping Address */}
        <View className="bg-white rounded-xl p-4 mb-3">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm font-semibold text-text-main-light">
              ที่อยู่จัดส่ง
            </Text>
            <TouchableOpacity>
              <Text className="text-sm text-primary font-medium">เปลี่ยน</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-start">
            <Ionicons name="location-outline" size={20} color="#137fec" />
            <View className="flex-1 ml-2">
              <Text className="text-sm font-medium text-text-main-light">
                {defaultAddress.recipientName} • {defaultAddress.phoneNumber}
              </Text>
              <Text className="text-sm text-text-sub-light mt-1">
                {defaultAddress.addressLine1}
                {defaultAddress.addressLine2 && `, ${defaultAddress.addressLine2}`}
              </Text>
              <Text className="text-sm text-text-sub-light">
                {defaultAddress.subDistrict}, {defaultAddress.district},{" "}
                {defaultAddress.province} {defaultAddress.postalCode}
              </Text>
            </View>
          </View>
        </View>

        {/* Order Items Summary */}
        <View className="bg-white rounded-xl p-4 mb-3">
          <Text className="text-sm font-semibold text-text-main-light mb-3">
            รายการสินค้า ({mockCartItems.length})
          </Text>

          {mockCartItems.map((item) => (
            <View key={item.id} className="flex-row items-center py-2 border-b border-border-light last:border-b-0">
              <Image
                source={{ uri: item.productSnapshot.thumbnailUrl }}
                className="w-12 h-12 rounded-lg bg-gray-100"
                resizeMode="cover"
              />
              <View className="flex-1 ml-3">
                <Text className="text-sm text-text-main-light" numberOfLines={1}>
                  {item.productSnapshot.nameTh}
                </Text>
                <Text className="text-xs text-text-sub-light">
                  x{item.quantity}
                </Text>
              </View>
              <Text className="text-sm font-medium text-text-main-light">
                {formatPrice(item.totalPrice)}
              </Text>
            </View>
          ))}
        </View>

        {/* Payment Methods */}
        <View className="bg-white rounded-xl p-4 mb-3">
          <Text className="text-sm font-semibold text-text-main-light mb-3">
            วิธีชำระเงิน
          </Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              className={`flex-row items-center p-3 rounded-xl mb-2 border-2 ${
                selectedPayment === method.id
                  ? "border-primary bg-primary/5"
                  : "border-border-light"
              }`}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  selectedPayment === method.id ? "bg-primary" : "bg-background-light"
                }`}
              >
                <Ionicons
                  name={method.icon}
                  size={20}
                  color={selectedPayment === method.id ? "#ffffff" : "#4c739a"}
                />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-sm font-medium text-text-main-light">
                  {method.nameTh}
                </Text>
                {method.description && (
                  <Text className="text-xs text-text-sub-light">
                    {method.description}
                  </Text>
                )}
              </View>
              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  selectedPayment === method.id
                    ? "border-primary bg-primary"
                    : "border-border-light"
                }`}
              >
                {selectedPayment === method.id && (
                  <Ionicons name="checkmark" size={12} color="#ffffff" />
                )}
              </View>
            </TouchableOpacity>
          ))}
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

            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-text-sub-light">ค่าจัดส่ง</Text>
              <Text className="text-sm text-green-600">ฟรี</Text>
            </View>

            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-text-sub-light">ภาษี (7%)</Text>
              <Text className="text-sm text-text-main-light">
                {formatPrice(vat)}
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
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-sm text-text-sub-light">ยอดชำระ</Text>
          <Text className="text-xl font-bold text-primary">
            {formatPrice(total)}
          </Text>
        </View>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isProcessing}
          onPress={handlePlaceOrder}
        >
          ยืนยันการสั่งซื้อ
        </Button>
      </View>
    </SafeAreaView>
  );
}

