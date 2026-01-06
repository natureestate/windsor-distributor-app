/**
 * Addresses Screen - หน้าจัดการที่อยู่จัดส่ง
 * แสดงรายการที่อยู่และเพิ่ม/แก้ไข/ลบที่อยู่
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

// Mock Data
import { mockUser, Address } from "../../data/mockData";

export default function AddressesScreen() {
  const router = useRouter();
  const { bgColor, cardBg, textMain, textSub, borderColor, iconMain, iconSub, surfaceBg, isDark, raw } =
    useThemeColors();

  // State - ใช้ mock addresses
  const [addresses, setAddresses] = useState<Address[]>(mockUser.addresses);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    recipientName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
    isDefault: false,
  });

  // เปิด Modal เพิ่ม/แก้ไขที่อยู่
  const openEditModal = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        recipientName: address.recipientName,
        phoneNumber: address.phoneNumber,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || "",
        subDistrict: address.subDistrict,
        district: address.district,
        province: address.province,
        postalCode: address.postalCode,
        isDefault: address.isDefault,
      });
    } else {
      setEditingAddress(null);
      setFormData({
        recipientName: "",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        subDistrict: "",
        district: "",
        province: "",
        postalCode: "",
        isDefault: false,
      });
    }
    setEditModalVisible(true);
  };

  // บันทึกที่อยู่
  const handleSaveAddress = () => {
    if (!formData.recipientName || !formData.phoneNumber || !formData.addressLine1) {
      Alert.alert("ข้อมูลไม่ครบ", "กรุณากรอกข้อมูลที่จำเป็น");
      return;
    }

    if (editingAddress) {
      // แก้ไขที่อยู่
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id
            ? {
                ...addr,
                ...formData,
                isDefault: formData.isDefault
                  ? true
                  : prev.filter((a) => a.id !== editingAddress.id).some((a) => a.isDefault)
                  ? addr.isDefault
                  : true,
              }
            : formData.isDefault
            ? { ...addr, isDefault: false }
            : addr
        )
      );
      Alert.alert("สำเร็จ", "แก้ไขที่อยู่เรียบร้อยแล้ว");
    } else {
      // เพิ่มที่อยู่ใหม่
      const newAddress: Address = {
        id: `addr-${Date.now()}`,
        ...formData,
        isDefault: addresses.length === 0 ? true : formData.isDefault,
      };

      if (formData.isDefault) {
        setAddresses((prev) => [...prev.map((a) => ({ ...a, isDefault: false })), newAddress]);
      } else {
        setAddresses((prev) => [...prev, newAddress]);
      }
      Alert.alert("สำเร็จ", "เพิ่มที่อยู่ใหม่เรียบร้อยแล้ว");
    }

    setEditModalVisible(false);
  };

  // ลบที่อยู่
  const handleDeleteAddress = (addressId: string) => {
    Alert.alert("ยืนยันการลบ", "คุณต้องการลบที่อยู่นี้หรือไม่?", [
      { text: "ยกเลิก", style: "cancel" },
      {
        text: "ลบ",
        style: "destructive",
        onPress: () => {
          setAddresses((prev) => {
            const filtered = prev.filter((a) => a.id !== addressId);
            // ถ้าลบที่อยู่ default ให้ตั้งอันแรกเป็น default
            if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
              filtered[0].isDefault = true;
            }
            return filtered;
          });
          Alert.alert("สำเร็จ", "ลบที่อยู่เรียบร้อยแล้ว");
        },
      },
    ]);
  };

  // ตั้งเป็นที่อยู่หลัก
  const setAsDefault = (addressId: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
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
        <Text className={`text-xl font-bold ${textMain} flex-1`}>ที่อยู่จัดส่ง</Text>
        <TouchableOpacity onPress={() => openEditModal()}>
          <Ionicons name="add-circle-outline" size={24} color="#137fec" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        {addresses.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Ionicons name="location-outline" size={64} color={iconSub} />
            <Text className={`${textSub} text-base mt-4`}>ยังไม่มีที่อยู่จัดส่ง</Text>
            <TouchableOpacity
              className="mt-4 px-6 py-3 bg-primary rounded-xl"
              onPress={() => openEditModal()}
            >
              <Text className="text-white font-medium">เพิ่มที่อยู่ใหม่</Text>
            </TouchableOpacity>
          </View>
        ) : (
          addresses.map((address) => (
            <View key={address.id} className={`${cardBg} rounded-xl p-4 mb-3`}>
              <View className="flex-row items-start">
                <Ionicons name="location" size={20} color="#137fec" />
                <View className="flex-1 ml-3">
                  <View className="flex-row items-center">
                    <Text className={`text-sm font-semibold ${textMain}`}>
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
                    {address.addressLine1}
                    {address.addressLine2 && `, ${address.addressLine2}`}
                  </Text>
                  <Text className={`text-sm ${textSub}`}>
                    {address.subDistrict}, {address.district}, {address.province} {address.postalCode}
                  </Text>
                </View>
              </View>

              {/* Actions */}
              <View className={`flex-row mt-3 pt-3 border-t ${borderColor}`}>
                {!address.isDefault && (
                  <TouchableOpacity
                    className="flex-row items-center mr-4"
                    onPress={() => setAsDefault(address.id)}
                  >
                    <Ionicons name="star-outline" size={16} color="#137fec" />
                    <Text className="text-sm text-primary ml-1">ตั้งเป็นหลัก</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  className="flex-row items-center mr-4"
                  onPress={() => openEditModal(address)}
                >
                  <Ionicons name="pencil-outline" size={16} color={iconSub} />
                  <Text className={`text-sm ${textSub} ml-1`}>แก้ไข</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => handleDeleteAddress(address.id)}
                >
                  <Ionicons name="trash-outline" size={16} color="#ef4444" />
                  <Text className="text-sm text-red-500 ml-1">ลบ</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Edit/Add Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setEditModalVisible(false)}
        >
          <Pressable className={`${surfaceBg} rounded-t-3xl`} onPress={(e) => e.stopPropagation()}>
            {/* Header */}
            <View
              className={`flex-row items-center justify-between px-4 py-4 border-b ${borderColor}`}
            >
              <Text className={`text-lg font-bold ${textMain}`}>
                {editingAddress ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่"}
              </Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={24} color={iconMain} />
              </TouchableOpacity>
            </View>

            <ScrollView className="max-h-[70%] p-4">
              {/* ชื่อผู้รับ */}
              <View className="mb-4">
                <Text className={`text-sm font-medium ${textMain} mb-2`}>ชื่อผู้รับ *</Text>
                <TextInput
                  className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3`}
                  style={{ color: raw.textMain }}
                  placeholder="ชื่อ-นามสกุล"
                  placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                  value={formData.recipientName}
                  onChangeText={(text) => setFormData({ ...formData, recipientName: text })}
                />
              </View>

              {/* เบอร์โทร */}
              <View className="mb-4">
                <Text className={`text-sm font-medium ${textMain} mb-2`}>เบอร์โทรศัพท์ *</Text>
                <TextInput
                  className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3`}
                  style={{ color: raw.textMain }}
                  placeholder="0XX-XXX-XXXX"
                  placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                  value={formData.phoneNumber}
                  onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                  keyboardType="phone-pad"
                />
              </View>

              {/* ที่อยู่ */}
              <View className="mb-4">
                <Text className={`text-sm font-medium ${textMain} mb-2`}>ที่อยู่ *</Text>
                <TextInput
                  className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3`}
                  style={{ color: raw.textMain }}
                  placeholder="บ้านเลขที่ ซอย ถนน"
                  placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                  value={formData.addressLine1}
                  onChangeText={(text) => setFormData({ ...formData, addressLine1: text })}
                />
              </View>

              {/* ที่อยู่เพิ่มเติม */}
              <View className="mb-4">
                <Text className={`text-sm font-medium ${textMain} mb-2`}>ที่อยู่เพิ่มเติม</Text>
                <TextInput
                  className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3`}
                  style={{ color: raw.textMain }}
                  placeholder="หมู่บ้าน อาคาร ชั้น"
                  placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                  value={formData.addressLine2}
                  onChangeText={(text) => setFormData({ ...formData, addressLine2: text })}
                />
              </View>

              {/* แถว 2 คอลัมน์ */}
              <View className="flex-row gap-3 mb-4">
                <View className="flex-1">
                  <Text className={`text-sm font-medium ${textMain} mb-2`}>แขวง/ตำบล</Text>
                  <TextInput
                    className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3`}
                    style={{ color: raw.textMain }}
                    placeholder="แขวง/ตำบล"
                    placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                    value={formData.subDistrict}
                    onChangeText={(text) => setFormData({ ...formData, subDistrict: text })}
                  />
                </View>
                <View className="flex-1">
                  <Text className={`text-sm font-medium ${textMain} mb-2`}>เขต/อำเภอ</Text>
                  <TextInput
                    className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3`}
                    style={{ color: raw.textMain }}
                    placeholder="เขต/อำเภอ"
                    placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                    value={formData.district}
                    onChangeText={(text) => setFormData({ ...formData, district: text })}
                  />
                </View>
              </View>

              <View className="flex-row gap-3 mb-4">
                <View className="flex-1">
                  <Text className={`text-sm font-medium ${textMain} mb-2`}>จังหวัด</Text>
                  <TextInput
                    className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3`}
                    style={{ color: raw.textMain }}
                    placeholder="จังหวัด"
                    placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                    value={formData.province}
                    onChangeText={(text) => setFormData({ ...formData, province: text })}
                  />
                </View>
                <View className="flex-1">
                  <Text className={`text-sm font-medium ${textMain} mb-2`}>รหัสไปรษณีย์</Text>
                  <TextInput
                    className={`${cardBg} border ${borderColor} rounded-xl px-4 py-3`}
                    style={{ color: raw.textMain }}
                    placeholder="XXXXX"
                    placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                    value={formData.postalCode}
                    onChangeText={(text) => setFormData({ ...formData, postalCode: text })}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
              </View>

              {/* ตั้งเป็นค่าเริ่มต้น */}
              <TouchableOpacity
                className="flex-row items-center mb-4"
                onPress={() => setFormData({ ...formData, isDefault: !formData.isDefault })}
              >
                <View
                  className={`w-5 h-5 rounded border-2 items-center justify-center mr-2 ${
                    formData.isDefault ? "bg-primary border-primary" : borderColor
                  }`}
                >
                  {formData.isDefault && <Ionicons name="checkmark" size={14} color="#fff" />}
                </View>
                <Text className={`text-sm ${textMain}`}>ตั้งเป็นที่อยู่หลัก</Text>
              </TouchableOpacity>
            </ScrollView>

            {/* Save Button */}
            <View className={`px-4 py-4 border-t ${borderColor}`}>
              <TouchableOpacity
                className="bg-primary py-3 rounded-xl items-center"
                onPress={handleSaveAddress}
              >
                <Text className="text-white font-semibold">บันทึก</Text>
              </TouchableOpacity>
            </View>

            <View className="h-4" />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

