/**
 * Checkout Screen - หน้าชำระเงิน
 * แสดงที่อยู่จัดส่ง, วิธีชำระเงิน, และยืนยันคำสั่งซื้อ
 * รองรับ Dark Mode และ Modal สำหรับเปลี่ยนที่อยู่/กรอกข้อมูลชำระเงิน
 */

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Button } from "../../components/ui";

// Context
import { useThemeColors } from "../../contexts";

// Mock Data
import { mockUser, mockCartItems } from "../../data/mockData";
import { formatPrice } from "../../lib/utils";
import { PaymentMethod } from "../../types/order";

// Payment methods - ลบผ่อนชำระออก
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
];

// ธนาคารสำหรับโอนเงิน
const bankOptions = [
  { id: "kbank", name: "ธนาคารกสิกรไทย", accountNo: "123-4-56789-0", accountName: "บจก. วินด์เซอร์" },
  { id: "scb", name: "ธนาคารไทยพาณิชย์", accountNo: "234-5-67890-1", accountName: "บจก. วินด์เซอร์" },
  { id: "bbl", name: "ธนาคารกรุงเทพ", accountNo: "345-6-78901-2", accountName: "บจก. วินด์เซอร์" },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const { bgColor, cardBg, textMain, textSub, borderColor, iconMain, iconSub, surfaceBg, isDark, raw } =
    useThemeColors();

  // State
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(
    mockUser.addresses.findIndex((a) => a.isDefault) || 0
  );

  // Modal states
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  // Credit card form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Bank transfer state
  const [selectedBank, setSelectedBank] = useState("kbank");

  // ที่อยู่จัดส่งที่เลือก
  const selectedAddress = mockUser.addresses[selectedAddressIndex];

  // คำนวณราคา
  const subtotal = mockCartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = 0; // ฟรีค่าจัดส่ง
  const vat = Math.round(subtotal * 0.07);
  const total = subtotal + shipping + vat;

  // Format card number (เพิ่ม space ทุก 4 ตัว)
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = cleaned.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : cleaned;
  };

  // Format expiry (MM/YY)
  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  // Validate payment info
  const isPaymentValid = () => {
    if (selectedPayment === "credit_card") {
      return (
        cardNumber.replace(/\s/g, "").length === 16 &&
        cardName.length > 0 &&
        cardExpiry.length === 5 &&
        cardCvv.length === 3
      );
    }
    return true; // promptpay และ bank_transfer ไม่ต้อง validate
  };

  // Handle payment method selection
  const handlePaymentSelect = (methodId: PaymentMethod) => {
    setSelectedPayment(methodId);
    setPaymentModalVisible(true);
  };

  // ยืนยันคำสั่งซื้อ
  const handlePlaceOrder = async () => {
    // ตรวจสอบข้อมูลการชำระเงิน
    if (selectedPayment === "credit_card" && !isPaymentValid()) {
      Alert.alert("ข้อมูลไม่ครบ", "กรุณากรอกข้อมูลบัตรเครดิต/เดบิตให้ครบถ้วน");
      setPaymentModalVisible(true);
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);

    // Navigate to success/orders
    Alert.alert("สั่งซื้อสำเร็จ!", "คำสั่งซื้อของคุณได้รับการยืนยันแล้ว", [
      { text: "ดูคำสั่งซื้อ", onPress: () => router.replace("/(customer)/(tabs)/orders") },
    ]);
  };

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`} edges={["top"]}>
      {/* Header */}
      <View className={`px-4 py-3 ${cardBg} border-b ${borderColor} flex-row items-center`}>
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
          <Ionicons name="arrow-back" size={24} color={iconMain} />
        </Pressable>
        <Text className={`text-xl font-bold ${textMain}`}>ชำระเงิน</Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 200 }}
      >
        {/* Shipping Address */}
        <View className={`${cardBg} rounded-xl p-4 mb-3`}>
          <View className="flex-row items-center justify-between mb-3">
            <Text className={`text-sm font-semibold ${textMain}`}>ที่อยู่จัดส่ง</Text>
            <TouchableOpacity onPress={() => setAddressModalVisible(true)}>
              <Text className="text-sm text-primary font-medium">เปลี่ยน</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-start">
            <Ionicons name="location-outline" size={20} color="#137fec" />
            <View className="flex-1 ml-2">
              <Text className={`text-sm font-medium ${textMain}`}>
                {selectedAddress.recipientName} • {selectedAddress.phoneNumber}
              </Text>
              <Text className={`text-sm ${textSub} mt-1`}>
                {selectedAddress.addressLine1}
                {selectedAddress.addressLine2 && `, ${selectedAddress.addressLine2}`}
              </Text>
              <Text className={`text-sm ${textSub}`}>
                {selectedAddress.subDistrict}, {selectedAddress.district}, {selectedAddress.province}{" "}
                {selectedAddress.postalCode}
              </Text>
            </View>
          </View>
        </View>

        {/* Order Items Summary */}
        <View className={`${cardBg} rounded-xl p-4 mb-3`}>
          <Text className={`text-sm font-semibold ${textMain} mb-3`}>
            รายการสินค้า ({mockCartItems.length})
          </Text>

          {mockCartItems.map((item) => (
            <View
              key={item.id}
              className={`flex-row items-center py-2 border-b ${borderColor} last:border-b-0`}
            >
              <Image
                source={{ uri: item.productSnapshot.thumbnailUrl }}
                className="w-12 h-12 rounded-lg bg-gray-100"
                resizeMode="cover"
              />
              <View className="flex-1 ml-3">
                <Text className={`text-sm ${textMain}`} numberOfLines={1}>
                  {item.productSnapshot.nameTh}
                </Text>
                <Text className="text-xs text-primary">x{item.quantity}</Text>
              </View>
              <Text className={`text-sm font-medium ${textMain}`}>{formatPrice(item.totalPrice)}</Text>
            </View>
          ))}
        </View>

        {/* Payment Methods */}
        <View className={`${cardBg} rounded-xl p-4 mb-3`}>
          <Text className={`text-sm font-semibold ${textMain} mb-3`}>วิธีชำระเงิน</Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              className={`flex-row items-center p-3 rounded-xl mb-2 border-2 ${
                selectedPayment === method.id
                  ? "border-primary bg-primary/5"
                  : isDark
                  ? "border-border-dark"
                  : "border-border-light"
              }`}
              onPress={() => handlePaymentSelect(method.id)}
            >
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  selectedPayment === method.id
                    ? "bg-primary"
                    : isDark
                    ? "bg-background-dark"
                    : "bg-background-light"
                }`}
              >
                <Ionicons
                  name={method.icon}
                  size={20}
                  color={selectedPayment === method.id ? "#ffffff" : iconSub}
                />
              </View>
              <View className="flex-1 ml-3">
                <Text className={`text-sm font-medium ${textMain}`}>{method.nameTh}</Text>
                {method.description && <Text className={`text-xs ${textSub}`}>{method.description}</Text>}
              </View>
              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  selectedPayment === method.id
                    ? "border-primary bg-primary"
                    : isDark
                    ? "border-border-dark"
                    : "border-border-light"
                }`}
              >
                {selectedPayment === method.id && <Ionicons name="checkmark" size={12} color="#ffffff" />}
              </View>
            </TouchableOpacity>
          ))}

          {/* แสดงข้อมูลบัตรที่กรอกแล้ว */}
          {selectedPayment === "credit_card" && cardNumber && (
            <View className={`mt-2 p-3 rounded-lg ${isDark ? "bg-background-dark" : "bg-background-light"}`}>
              <Text className={`text-xs ${textSub}`}>บัตรที่เลือก</Text>
              <Text className={`text-sm font-medium ${textMain}`}>
                **** **** **** {cardNumber.slice(-4)}
              </Text>
            </View>
          )}

          {/* แสดงธนาคารที่เลือก */}
          {selectedPayment === "bank_transfer" && (
            <View className={`mt-2 p-3 rounded-lg ${isDark ? "bg-background-dark" : "bg-background-light"}`}>
              <Text className={`text-xs ${textSub}`}>โอนเงินไปที่</Text>
              <Text className={`text-sm font-medium ${textMain}`}>
                {bankOptions.find((b) => b.id === selectedBank)?.name}
              </Text>
              <Text className={`text-xs ${textSub}`}>
                {bankOptions.find((b) => b.id === selectedBank)?.accountNo}
              </Text>
            </View>
          )}
        </View>

        {/* Order Summary */}
        <View className={`${cardBg} rounded-xl p-4`}>
          <Text className={`text-sm font-semibold ${textMain} mb-3`}>สรุปคำสั่งซื้อ</Text>

          <View className="space-y-2">
            <View className="flex-row justify-between py-1">
              <Text className={`text-sm ${textSub}`}>ยอดรวมสินค้า</Text>
              <Text className={`text-sm ${textMain}`}>{formatPrice(subtotal)}</Text>
            </View>

            <View className="flex-row justify-between py-1">
              <Text className={`text-sm ${textSub}`}>ค่าจัดส่ง</Text>
              <Text className="text-sm text-green-500">ฟรี</Text>
            </View>

            <View className="flex-row justify-between py-1">
              <Text className={`text-sm ${textSub}`}>ภาษี (7%)</Text>
              <Text className={`text-sm ${textMain}`}>{formatPrice(vat)}</Text>
            </View>

            <View className={`border-t ${borderColor} my-2`} />

            <View className="flex-row justify-between py-1">
              <Text className={`text-base font-bold ${textMain}`}>ยอดรวมทั้งสิ้น</Text>
              <Text className="text-xl font-bold text-primary">{formatPrice(total)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View
        className={`absolute bottom-0 left-0 right-0 ${cardBg} border-t ${borderColor} px-4 py-3 pb-8`}
      >
        <View className="flex-row items-center justify-between mb-3">
          <Text className={`text-sm ${textSub}`}>ยอดชำระ</Text>
          <Text className="text-xl font-bold text-primary">{formatPrice(total)}</Text>
        </View>
        <Button variant="primary" size="lg" fullWidth isLoading={isProcessing} onPress={handlePlaceOrder}>
          ยืนยันการสั่งซื้อ
        </Button>
      </View>

      {/* ===== Address Selection Modal ===== */}
      <Modal
        visible={addressModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddressModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setAddressModalVisible(false)}
        >
          <Pressable className={`${surfaceBg} rounded-t-3xl`} onPress={(e) => e.stopPropagation()}>
            {/* Header */}
            <View className={`flex-row items-center justify-between px-4 py-4 border-b ${borderColor}`}>
              <Text className={`text-lg font-bold ${textMain}`}>เลือกที่อยู่จัดส่ง</Text>
              <TouchableOpacity onPress={() => setAddressModalVisible(false)}>
                <Ionicons name="close" size={24} color={iconMain} />
              </TouchableOpacity>
            </View>

            {/* Address List */}
            <ScrollView className="max-h-96 py-2">
              {mockUser.addresses.map((address, index) => (
                <TouchableOpacity
                  key={address.id}
                  className={`mx-4 my-1 p-4 rounded-xl border-2 ${
                    selectedAddressIndex === index
                      ? "border-primary bg-primary/5"
                      : isDark
                      ? "border-border-dark"
                      : "border-border-light"
                  }`}
                  onPress={() => {
                    setSelectedAddressIndex(index);
                    setAddressModalVisible(false);
                  }}
                >
                  <View className="flex-row items-start">
                    <View className="flex-1">
                      <View className="flex-row items-center">
                        <Text className={`text-sm font-medium ${textMain}`}>
                          {address.recipientName}
                        </Text>
                        {address.isDefault && (
                          <View className="ml-2 px-2 py-0.5 bg-primary/10 rounded">
                            <Text className="text-xs text-primary font-medium">ค่าเริ่มต้น</Text>
                          </View>
                        )}
                      </View>
                      <Text className={`text-sm ${textSub} mt-1`}>{address.phoneNumber}</Text>
                      <Text className={`text-sm ${textSub} mt-1`}>
                        {address.addressLine1}, {address.subDistrict}, {address.district},{" "}
                        {address.province} {address.postalCode}
                      </Text>
                    </View>
                    <View
                      className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                        selectedAddressIndex === index
                          ? "border-primary bg-primary"
                          : isDark
                          ? "border-border-dark"
                          : "border-border-light"
                      }`}
                    >
                      {selectedAddressIndex === index && (
                        <Ionicons name="checkmark" size={12} color="#ffffff" />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}

              {/* Add new address button */}
              <TouchableOpacity
                className={`mx-4 my-2 p-4 rounded-xl border-2 border-dashed ${
                  isDark ? "border-border-dark" : "border-border-light"
                } items-center`}
                onPress={() => {
                  setAddressModalVisible(false);
                  Alert.alert("เพิ่มที่อยู่", "ฟีเจอร์นี้จะพร้อมใช้งานเร็วๆ นี้");
                }}
              >
                <Ionicons name="add-circle-outline" size={24} color={iconSub} />
                <Text className={`text-sm ${textSub} mt-1`}>เพิ่มที่อยู่ใหม่</Text>
              </TouchableOpacity>
            </ScrollView>

            <View className="h-8" />
          </Pressable>
        </Pressable>
      </Modal>

      {/* ===== Payment Method Modal ===== */}
      <Modal
        visible={paymentModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setPaymentModalVisible(false)}
        >
          <Pressable className={`${surfaceBg} rounded-t-3xl`} onPress={(e) => e.stopPropagation()}>
            {/* Header */}
            <View className={`flex-row items-center justify-between px-4 py-4 border-b ${borderColor}`}>
              <Text className={`text-lg font-bold ${textMain}`}>
                {selectedPayment === "credit_card" && "กรอกข้อมูลบัตร"}
                {selectedPayment === "promptpay" && "ชำระผ่านพร้อมเพย์"}
                {selectedPayment === "bank_transfer" && "เลือกธนาคาร"}
              </Text>
              <TouchableOpacity onPress={() => setPaymentModalVisible(false)}>
                <Ionicons name="close" size={24} color={iconMain} />
              </TouchableOpacity>
            </View>

            <ScrollView className="max-h-[70%]">
              {/* Credit Card Form */}
              {selectedPayment === "credit_card" && (
                <View className="p-4">
                  {/* Card Number */}
                  <View className="mb-4">
                    <Text className={`text-sm font-medium ${textMain} mb-2`}>หมายเลขบัตร</Text>
                    <TextInput
                      className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3 text-base`}
                      style={{ color: raw.textMain }}
                      placeholder="0000 0000 0000 0000"
                      placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                      value={cardNumber}
                      onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                      keyboardType="numeric"
                      maxLength={19}
                    />
                  </View>

                  {/* Card Name */}
                  <View className="mb-4">
                    <Text className={`text-sm font-medium ${textMain} mb-2`}>ชื่อบนบัตร</Text>
                    <TextInput
                      className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3 text-base`}
                      style={{ color: raw.textMain }}
                      placeholder="SOMCHAI JAIDEE"
                      placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                      value={cardName}
                      onChangeText={setCardName}
                      autoCapitalize="characters"
                    />
                  </View>

                  {/* Expiry & CVV */}
                  <View className="flex-row gap-4 mb-4">
                    <View className="flex-1">
                      <Text className={`text-sm font-medium ${textMain} mb-2`}>วันหมดอายุ</Text>
                      <TextInput
                        className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3 text-base`}
                        style={{ color: raw.textMain }}
                        placeholder="MM/YY"
                        placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                        value={cardExpiry}
                        onChangeText={(text) => setCardExpiry(formatExpiry(text))}
                        keyboardType="numeric"
                        maxLength={5}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className={`text-sm font-medium ${textMain} mb-2`}>CVV</Text>
                      <TextInput
                        className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3 text-base`}
                        style={{ color: raw.textMain }}
                        placeholder="123"
                        placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                        value={cardCvv}
                        onChangeText={setCardCvv}
                        keyboardType="numeric"
                        maxLength={3}
                        secureTextEntry
                      />
                    </View>
                  </View>

                  {/* Security Note */}
                  <View className="flex-row items-center mt-2">
                    <Ionicons name="shield-checkmark-outline" size={16} color="#22c55e" />
                    <Text className={`text-xs ${textSub} ml-2`}>
                      ข้อมูลบัตรของคุณได้รับการเข้ารหัสอย่างปลอดภัย
                    </Text>
                  </View>
                </View>
              )}

              {/* PromptPay */}
              {selectedPayment === "promptpay" && (
                <View className="p-4 items-center">
                  {/* QR Code placeholder */}
                  <View
                    className={`w-48 h-48 ${
                      isDark ? "bg-white" : "bg-gray-100"
                    } rounded-xl items-center justify-center mb-4`}
                  >
                    <Ionicons name="qr-code" size={120} color="#137fec" />
                  </View>
                  <Text className={`text-lg font-bold ${textMain}`}>{formatPrice(total)}</Text>
                  <Text className={`text-sm ${textSub} mt-2 text-center`}>
                    สแกน QR Code ด้วยแอปธนาคารของคุณ{"\n"}เพื่อชำระเงิน
                  </Text>

                  {/* Timer */}
                  <View className="flex-row items-center mt-4">
                    <Ionicons name="time-outline" size={16} color={iconSub} />
                    <Text className={`text-sm ${textSub} ml-1`}>QR Code หมดอายุใน 15:00 นาที</Text>
                  </View>
                </View>
              )}

              {/* Bank Transfer */}
              {selectedPayment === "bank_transfer" && (
                <View className="p-4">
                  <Text className={`text-sm ${textSub} mb-4`}>
                    เลือกธนาคารที่ต้องการโอนเงิน
                  </Text>

                  {bankOptions.map((bank) => (
                    <TouchableOpacity
                      key={bank.id}
                      className={`p-4 rounded-xl mb-2 border-2 ${
                        selectedBank === bank.id
                          ? "border-primary bg-primary/5"
                          : isDark
                          ? "border-border-dark"
                          : "border-border-light"
                      }`}
                      onPress={() => setSelectedBank(bank.id)}
                    >
                      <View className="flex-row items-center justify-between">
                        <View>
                          <Text className={`text-sm font-medium ${textMain}`}>{bank.name}</Text>
                          <Text className={`text-xs ${textSub} mt-1`}>
                            เลขบัญชี: {bank.accountNo}
                          </Text>
                          <Text className={`text-xs ${textSub}`}>ชื่อบัญชี: {bank.accountName}</Text>
                        </View>
                        <View
                          className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                            selectedBank === bank.id
                              ? "border-primary bg-primary"
                              : isDark
                              ? "border-border-dark"
                              : "border-border-light"
                          }`}
                        >
                          {selectedBank === bank.id && (
                            <Ionicons name="checkmark" size={12} color="#ffffff" />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}

                  {/* Note */}
                  <View
                    className={`mt-4 p-3 rounded-lg ${
                      isDark ? "bg-yellow-900/30" : "bg-yellow-50"
                    }`}
                  >
                    <View className="flex-row items-start">
                      <Ionicons name="information-circle" size={18} color="#f59e0b" />
                      <Text className={`text-xs ${textSub} ml-2 flex-1`}>
                        กรุณาโอนเงินภายใน 24 ชั่วโมง และแนบหลักฐานการโอนเงิน
                        คำสั่งซื้อจะถูกยืนยันหลังตรวจสอบการชำระเงิน
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Confirm Button */}
            <View className={`px-4 py-4 border-t ${borderColor}`}>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onPress={() => setPaymentModalVisible(false)}
                disabled={selectedPayment === "credit_card" && !isPaymentValid()}
              >
                {selectedPayment === "credit_card" && "บันทึกข้อมูลบัตร"}
                {selectedPayment === "promptpay" && "ฉันสแกนแล้ว"}
                {selectedPayment === "bank_transfer" && "เลือกธนาคารนี้"}
              </Button>
            </View>

            <View className="h-4" />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
