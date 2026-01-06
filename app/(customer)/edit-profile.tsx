/**
 * Edit Profile Screen - หน้าแก้ไขข้อมูลส่วนตัว
 * แก้ไขชื่อ, อีเมล, เบอร์โทร, รูปโปรไฟล์
 */

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Mock Data
import { mockUser } from "../../data/mockData";
import { useTheme } from "../../contexts";

export default function EditProfileScreen() {
  const router = useRouter();
  const { isDark } = useTheme();

  // State สำหรับ form
  const [displayName, setDisplayName] = useState(mockUser.displayName);
  const [email, setEmail] = useState(mockUser.email);
  const [phoneNumber, setPhoneNumber] = useState(mockUser.phoneNumber);
  const [isLoading, setIsLoading] = useState(false);

  // สี dynamic ตาม theme
  const bgColor = isDark ? "bg-background-dark" : "bg-background-light";
  const cardBg = isDark ? "bg-surface-dark" : "bg-white";
  const textMain = isDark ? "text-text-main-dark" : "text-text-main-light";
  const textSub = isDark ? "text-text-sub-dark" : "text-text-sub-light";
  const borderColor = isDark ? "border-border-dark" : "border-border-light";
  const inputBg = isDark ? "bg-background-dark" : "bg-background-light";

  // บันทึกข้อมูล
  const handleSave = async () => {
    // Validate
    if (!displayName.trim()) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกชื่อ-นามสกุล");
      return;
    }
    if (!email.trim()) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกอีเมล");
      return;
    }
    if (!phoneNumber.trim()) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกเบอร์โทรศัพท์");
      return;
    }

    setIsLoading(true);

    // จำลองการบันทึก (TODO: เชื่อมต่อ API จริง)
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("สำเร็จ", "บันทึกข้อมูลเรียบร้อยแล้ว", [
        { text: "ตกลง", onPress: () => router.back() },
      ]);
    }, 1000);
  };

  // เปลี่ยนรูปโปรไฟล์
  const handleChangeAvatar = () => {
    Alert.alert("เปลี่ยนรูปโปรไฟล์", "เลือกแหล่งที่มาของรูปภาพ", [
      { text: "ถ่ายรูป", onPress: () => console.log("Open camera") },
      { text: "เลือกจากคลัง", onPress: () => console.log("Open gallery") },
      { text: "ยกเลิก", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className={`flex-row items-center px-4 py-3 border-b ${borderColor}`}>
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center -ml-2"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={isDark ? "#e2e8f0" : "#0d141b"} />
          </TouchableOpacity>
          <Text className={`flex-1 text-lg font-semibold ${textMain} ml-2`}>
            แก้ไขข้อมูลส่วนตัว
          </Text>
          <TouchableOpacity
            className={`px-4 py-2 rounded-lg ${isLoading ? "bg-gray-400" : "bg-primary"}`}
            onPress={handleSave}
            disabled={isLoading}
          >
            <Text className="text-white font-medium">{isLoading ? "กำลังบันทึก..." : "บันทึก"}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {/* Avatar Section */}
          <View className="items-center py-6">
            <TouchableOpacity onPress={handleChangeAvatar} className="relative">
              {/* Avatar */}
              <View className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary">
                <Image source={{ uri: mockUser.avatarUrl }} className="w-full h-full" />
              </View>
              {/* Camera Icon */}
              <View className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full items-center justify-center border-2 border-white">
                <Ionicons name="camera" size={16} color="#ffffff" />
              </View>
            </TouchableOpacity>
            <Text className={`mt-2 text-sm ${textSub}`}>แตะเพื่อเปลี่ยนรูปโปรไฟล์</Text>
          </View>

          {/* Form Section */}
          <View className="px-4">
            {/* ชื่อ-นามสกุล */}
            <View className="mb-4">
              <Text className={`text-sm font-medium ${textMain} mb-2`}>ชื่อ-นามสกุล</Text>
              <View
                className={`${cardBg} rounded-xl px-4 py-3 border ${borderColor} flex-row items-center`}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={isDark ? "#94a3b8" : "#4c739a"}
                  style={{ marginRight: 12 }}
                />
                <TextInput
                  className={`flex-1 text-base ${textMain}`}
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="กรอกชื่อ-นามสกุล"
                  placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                />
              </View>
            </View>

            {/* อีเมล */}
            <View className="mb-4">
              <Text className={`text-sm font-medium ${textMain} mb-2`}>อีเมล</Text>
              <View
                className={`${cardBg} rounded-xl px-4 py-3 border ${borderColor} flex-row items-center`}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={isDark ? "#94a3b8" : "#4c739a"}
                  style={{ marginRight: 12 }}
                />
                <TextInput
                  className={`flex-1 text-base ${textMain}`}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="กรอกอีเมล"
                  placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* เบอร์โทรศัพท์ */}
            <View className="mb-4">
              <Text className={`text-sm font-medium ${textMain} mb-2`}>เบอร์โทรศัพท์</Text>
              <View
                className={`${cardBg} rounded-xl px-4 py-3 border ${borderColor} flex-row items-center`}
              >
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={isDark ? "#94a3b8" : "#4c739a"}
                  style={{ marginRight: 12 }}
                />
                <TextInput
                  className={`flex-1 text-base ${textMain}`}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="กรอกเบอร์โทรศัพท์"
                  placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* UID (อ่านอย่างเดียว) */}
            <View className="mb-4">
              <Text className={`text-sm font-medium ${textMain} mb-2`}>รหัสผู้ใช้ (UID)</Text>
              <View
                className={`${inputBg} rounded-xl px-4 py-3 border ${borderColor} flex-row items-center`}
              >
                <Ionicons
                  name="finger-print-outline"
                  size={20}
                  color={isDark ? "#64748b" : "#94a3b8"}
                  style={{ marginRight: 12 }}
                />
                <Text className={`flex-1 text-base ${textSub}`}>{mockUser.uid}</Text>
                <TouchableOpacity
                  onPress={() => {
                    // TODO: Copy to clipboard
                    Alert.alert("คัดลอกแล้ว", "คัดลอกรหัสผู้ใช้แล้ว");
                  }}
                >
                  <Ionicons name="copy-outline" size={20} color="#137fec" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Additional Info */}
          <View className={`mx-4 mt-4 ${cardBg} rounded-xl p-4`}>
            <Text className={`text-sm font-medium ${textMain} mb-3`}>ข้อมูลบัญชี</Text>

            {/* สมาชิกตั้งแต่ */}
            <View className="flex-row items-center justify-between py-2">
              <Text className={`text-sm ${textSub}`}>สมาชิกตั้งแต่</Text>
              <Text className={`text-sm ${textMain}`}>
                {mockUser.createdAt.toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>

            {/* เข้าสู่ระบบล่าสุด */}
            <View className={`flex-row items-center justify-between py-2 border-t ${borderColor}`}>
              <Text className={`text-sm ${textSub}`}>เข้าสู่ระบบล่าสุด</Text>
              <Text className={`text-sm ${textMain}`}>
                {mockUser.lastLoginAt?.toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>

            {/* สถานะบัญชี */}
            <View className={`flex-row items-center justify-between py-2 border-t ${borderColor}`}>
              <Text className={`text-sm ${textSub}`}>สถานะบัญชี</Text>
              <View className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                <Text className="text-sm text-green-600">ใช้งานปกติ</Text>
              </View>
            </View>
          </View>

          {/* Danger Zone */}
          <View className="mx-4 mt-6">
            <Text className={`text-sm font-medium text-red-500 mb-3`}>โซนอันตราย</Text>
            <TouchableOpacity
              className="bg-red-50 rounded-xl p-4 flex-row items-center border border-red-200"
              onPress={() => {
                Alert.alert(
                  "ลบบัญชี",
                  "คุณแน่ใจหรือไม่ที่จะลบบัญชี? การกระทำนี้ไม่สามารถย้อนกลับได้",
                  [
                    { text: "ยกเลิก", style: "cancel" },
                    { text: "ลบบัญชี", style: "destructive", onPress: () => console.log("Delete account") },
                  ]
                );
              }}
            >
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
              <Text className="ml-3 text-red-500 font-medium">ลบบัญชีของฉัน</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

