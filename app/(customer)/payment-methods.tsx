/**
 * Payment Methods Screen - หน้าจัดการวิธีชำระเงิน
 * แสดงบัตรเครดิต/เดบิตที่บันทึกไว้
 * รองรับ Dark Mode
 */

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Context
import { useThemeColors } from "../../contexts";

// Mock saved cards
interface SavedCard {
  id: string;
  cardNumber: string; // เก็บแค่ 4 ตัวท้าย
  cardName: string;
  cardType: "visa" | "mastercard" | "jcb";
  expiry: string;
  isDefault: boolean;
}

const mockSavedCards: SavedCard[] = [
  {
    id: "card-1",
    cardNumber: "4532",
    cardName: "SOMCHAI JAIDEE",
    cardType: "visa",
    expiry: "12/26",
    isDefault: true,
  },
  {
    id: "card-2",
    cardNumber: "8821",
    cardName: "SOMCHAI JAIDEE",
    cardType: "mastercard",
    expiry: "06/25",
    isDefault: false,
  },
];

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const { bgColor, cardBg, textMain, textSub, borderColor, iconMain, iconSub, surfaceBg, isDark, raw } =
    useThemeColors();

  // State
  const [cards, setCards] = useState<SavedCard[]>(mockSavedCards);
  const [addModalVisible, setAddModalVisible] = useState(false);

  // Form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Format card number
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

  // Format expiry
  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  // Detect card type
  const getCardType = (number: string): "visa" | "mastercard" | "jcb" => {
    const cleaned = number.replace(/\s/g, "");
    if (cleaned.startsWith("4")) return "visa";
    if (cleaned.startsWith("5")) return "mastercard";
    return "jcb";
  };

  // Get card icon
  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "card";
      case "mastercard":
        return "card";
      default:
        return "card-outline";
    }
  };

  // Add new card
  const handleAddCard = () => {
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณากรอกหมายเลขบัตร 16 หลัก");
      return;
    }
    if (!cardName) {
      Alert.alert("ข้อมูลไม่ครบ", "กรุณากรอกชื่อบนบัตร");
      return;
    }
    if (cardExpiry.length !== 5) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณากรอกวันหมดอายุให้ถูกต้อง (MM/YY)");
      return;
    }
    if (cardCvv.length !== 3) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณากรอก CVV 3 หลัก");
      return;
    }

    const newCard: SavedCard = {
      id: `card-${Date.now()}`,
      cardNumber: cardNumber.slice(-4),
      cardName: cardName.toUpperCase(),
      cardType: getCardType(cardNumber),
      expiry: cardExpiry,
      isDefault: cards.length === 0,
    };

    setCards((prev) => [...prev, newCard]);
    setAddModalVisible(false);
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvv("");
    Alert.alert("สำเร็จ", "เพิ่มบัตรใหม่เรียบร้อยแล้ว");
  };

  // Delete card
  const handleDeleteCard = (cardId: string) => {
    Alert.alert("ยืนยันการลบ", "คุณต้องการลบบัตรนี้หรือไม่?", [
      { text: "ยกเลิก", style: "cancel" },
      {
        text: "ลบ",
        style: "destructive",
        onPress: () => {
          setCards((prev) => {
            const filtered = prev.filter((c) => c.id !== cardId);
            if (filtered.length > 0 && !filtered.some((c) => c.isDefault)) {
              filtered[0].isDefault = true;
            }
            return filtered;
          });
        },
      },
    ]);
  };

  // Set as default
  const setAsDefault = (cardId: string) => {
    setCards((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      }))
    );
  };

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`} edges={["top"]}>
      {/* Header */}
      <View className={`px-4 py-3 ${cardBg} border-b ${borderColor} flex-row items-center`}>
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color={iconMain} />
        </TouchableOpacity>
        <Text className={`text-xl font-bold ${textMain} flex-1`}>วิธีชำระเงิน</Text>
        <TouchableOpacity onPress={() => setAddModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={24} color="#137fec" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        {/* Saved Cards */}
        <Text className={`text-sm font-semibold ${textSub} mb-3`}>บัตรที่บันทึกไว้</Text>

        {cards.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Ionicons name="card-outline" size={64} color={iconSub} />
            <Text className={`${textSub} text-base mt-4`}>ยังไม่มีบัตรที่บันทึกไว้</Text>
            <TouchableOpacity
              className="mt-4 px-6 py-3 bg-primary rounded-xl"
              onPress={() => setAddModalVisible(true)}
            >
              <Text className="text-white font-medium">เพิ่มบัตรใหม่</Text>
            </TouchableOpacity>
          </View>
        ) : (
          cards.map((card) => (
            <View key={card.id} className={`${cardBg} rounded-xl p-4 mb-3`}>
              <View className="flex-row items-center">
                <View
                  className={`w-12 h-8 rounded ${
                    card.cardType === "visa" ? "bg-blue-600" : "bg-orange-500"
                  } items-center justify-center`}
                >
                  <Text className="text-white text-xs font-bold">
                    {card.cardType.toUpperCase()}
                  </Text>
                </View>
                <View className="flex-1 ml-3">
                  <View className="flex-row items-center">
                    <Text className={`text-sm font-medium ${textMain}`}>
                      •••• •••• •••• {card.cardNumber}
                    </Text>
                    {card.isDefault && (
                      <View className="ml-2 px-2 py-0.5 bg-primary/10 rounded">
                        <Text className="text-xs text-primary font-medium">หลัก</Text>
                      </View>
                    )}
                  </View>
                  <Text className={`text-xs ${textSub} mt-1`}>
                    {card.cardName} • หมดอายุ {card.expiry}
                  </Text>
                </View>
              </View>

              {/* Actions */}
              <View className={`flex-row mt-3 pt-3 border-t ${borderColor}`}>
                {!card.isDefault && (
                  <TouchableOpacity
                    className="flex-row items-center mr-4"
                    onPress={() => setAsDefault(card.id)}
                  >
                    <Ionicons name="star-outline" size={16} color="#137fec" />
                    <Text className="text-sm text-primary ml-1">ตั้งเป็นหลัก</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => handleDeleteCard(card.id)}
                >
                  <Ionicons name="trash-outline" size={16} color="#ef4444" />
                  <Text className="text-sm text-red-500 ml-1">ลบ</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Other Payment Methods */}
        <Text className={`text-sm font-semibold ${textSub} mt-6 mb-3`}>วิธีชำระเงินอื่นๆ</Text>

        <View className={`${cardBg} rounded-xl overflow-hidden`}>
          <View className={`flex-row items-center p-4 border-b ${borderColor}`}>
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
              <Ionicons name="qr-code" size={20} color="#137fec" />
            </View>
            <View className="flex-1 ml-3">
              <Text className={`text-sm font-medium ${textMain}`}>พร้อมเพย์</Text>
              <Text className={`text-xs ${textSub}`}>สแกน QR Code เพื่อชำระเงิน</Text>
            </View>
            <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
          </View>

          <View className="flex-row items-center p-4">
            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
              <Ionicons name="business" size={20} color="#22c55e" />
            </View>
            <View className="flex-1 ml-3">
              <Text className={`text-sm font-medium ${textMain}`}>โอนเงินธนาคาร</Text>
              <Text className={`text-xs ${textSub}`}>โอนเงินเข้าบัญชีธนาคาร</Text>
            </View>
            <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
          </View>
        </View>
      </ScrollView>

      {/* Add Card Modal */}
      <Modal
        visible={addModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setAddModalVisible(false)}
        >
          <Pressable className={`${surfaceBg} rounded-t-3xl`} onPress={(e) => e.stopPropagation()}>
            {/* Header */}
            <View
              className={`flex-row items-center justify-between px-4 py-4 border-b ${borderColor}`}
            >
              <Text className={`text-lg font-bold ${textMain}`}>เพิ่มบัตรใหม่</Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <Ionicons name="close" size={24} color={iconMain} />
              </TouchableOpacity>
            </View>

            <ScrollView className="p-4">
              {/* Card Number */}
              <View className="mb-4">
                <Text className={`text-sm font-medium ${textMain} mb-2`}>หมายเลขบัตร</Text>
                <TextInput
                  className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3`}
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
                  className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3`}
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
                    className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3`}
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
                    className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3`}
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
              <View className="flex-row items-center">
                <Ionicons name="shield-checkmark-outline" size={16} color="#22c55e" />
                <Text className={`text-xs ${textSub} ml-2`}>
                  ข้อมูลบัตรของคุณได้รับการเข้ารหัสอย่างปลอดภัย
                </Text>
              </View>
            </ScrollView>

            {/* Save Button */}
            <View className={`px-4 py-4 border-t ${borderColor}`}>
              <TouchableOpacity
                className="bg-primary py-3 rounded-xl items-center"
                onPress={handleAddCard}
              >
                <Text className="text-white font-semibold">บันทึกบัตร</Text>
              </TouchableOpacity>
            </View>

            <View className="h-4" />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

