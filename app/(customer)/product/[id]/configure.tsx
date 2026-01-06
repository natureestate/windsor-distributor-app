/**
 * Product Configure Screen - หน้ากำหนดขนาดสินค้า
 * สำหรับสินค้าที่ต้องกำหนดขนาดเอง (ประตู/หน้าต่าง)
 */

import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Button } from "../../../../components/ui";

// Mock Data
import { mockProducts } from "../../../../data/mockData";
import { formatPrice } from "../../../../lib/utils";

// ขนาดมาตรฐานที่แนะนำ
const standardSizes = [
  { width: 80, height: 200, label: "80 x 200 ซม." },
  { width: 90, height: 210, label: "90 x 210 ซม." },
  { width: 100, height: 210, label: "100 x 210 ซม." },
  { width: 120, height: 240, label: "120 x 240 ซม." },
];

export default function ProductConfigureScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // หาสินค้าจาก mock data
  const product = mockProducts.find((p) => p.id === id);

  // State
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedGlass, setSelectedGlass] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // หา glass option ที่เลือก
  const selectedGlassOption = useMemo(() => {
    if (!selectedGlass || !product?.constraints?.glassTypes) return null;
    return product.constraints.glassTypes.find((g) => g.id === selectedGlass);
  }, [selectedGlass, product]);

  // คำนวณราคา
  const calculatedPrice = useMemo(() => {
    if (!product) return 0;

    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;

    if (w === 0 || h === 0) return product.basePrice;

    // คำนวณพื้นที่ (ตร.ม.)
    const area = (w / 100) * (h / 100);

    // ราคาพื้นฐานเฟรมต่อ ตร.ม. (ประมาณ 8,000 บาท/ตร.ม. สำหรับ uPVC)
    const framePrice = 8000;

    // ราคากระจกพื้นฐาน (กระจกใส 5mm ประมาณ 800 บาท/ตร.ม.)
    const baseGlassPrice = 800;

    // ราคากระจกที่เลือก
    const glassModifier = selectedGlassOption?.priceModifier || 0;
    const totalGlassPrice = baseGlassPrice + glassModifier;

    // ราคารวมต่อ ตร.ม.
    const pricePerSqm = framePrice + totalGlassPrice;

    // ราคาตามพื้นที่
    const price = pricePerSqm * area;

    // ราคาขั้นต่ำ (ไม่ต่ำกว่า basePrice)
    return Math.max(Math.round(price), product.basePrice);
  }, [product, width, height, selectedGlassOption]);

  // Validation
  const isValid = useMemo(() => {
    if (!product) return false;

    const w = parseFloat(width);
    const h = parseFloat(height);

    if (!w || !h) return false;

    // ตรวจสอบขนาดขั้นต่ำ-สูงสุด
    const constraints = product.constraints;
    if (constraints) {
      if (constraints.minWidth && w < constraints.minWidth) return false;
      if (constraints.maxWidth && w > constraints.maxWidth) return false;
      if (constraints.minHeight && h < constraints.minHeight) return false;
      if (constraints.maxHeight && h > constraints.maxHeight) return false;
    }

    return true;
  }, [product, width, height]);

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-background-light" edges={["top"]}>
        <View className="flex-1 items-center justify-center">
          <Ionicons name="alert-circle-outline" size={48} color="#d1d5db" />
          <Text className="text-text-sub-light mt-4">ไม่พบสินค้า</Text>
          <Button variant="primary" className="mt-4" onPress={() => router.back()}>
            กลับ
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    if (!isValid) {
      alert("กรุณาระบุขนาดให้ถูกต้อง");
      return;
    }

    alert(
      `เพิ่มลงตะกร้าแล้ว!\n\nสินค้า: ${product.nameTh}\nขนาด: ${width} x ${height} ซม.\nจำนวน: ${quantity}\nราคารวม: ${formatPrice(calculatedPrice * quantity)}`
    );
    router.back();
  };

  const handleSelectStandardSize = (size: { width: number; height: number }) => {
    setWidth(size.width.toString());
    setHeight(size.height.toString());
  };

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
          <Text className="text-lg font-bold text-text-main-light">กำหนดขนาด</Text>
          <Text className="text-xs text-text-sub-light" numberOfLines={1}>
            {product.nameTh}
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 200 }}
      >
        {/* Size Constraints Info */}
        {product.constraints && (
          <View className="bg-primary/10 rounded-xl p-4 mb-4 flex-row items-start">
            <Ionicons name="information-circle-outline" size={20} color="#137fec" />
            <View className="flex-1 ml-2">
              <Text className="text-sm font-medium text-primary">ข้อกำหนดขนาด</Text>
              <Text className="text-xs text-text-sub-light mt-1">
                กว้าง: {product.constraints.minWidth || 30} - {product.constraints.maxWidth || 300}{" "}
                ซม.
              </Text>
              <Text className="text-xs text-text-sub-light">
                สูง: {product.constraints.minHeight || 30} - {product.constraints.maxHeight || 300}{" "}
                ซม.
              </Text>
            </View>
          </View>
        )}

        {/* Standard Sizes */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-sm font-semibold text-text-main-light mb-3">ขนาดมาตรฐาน</Text>
          <View className="flex-row flex-wrap gap-2">
            {standardSizes.map((size) => {
              const isSelected =
                width === size.width.toString() && height === size.height.toString();
              return (
                <TouchableOpacity
                  key={size.label}
                  className={`px-4 py-2 rounded-lg border ${
                    isSelected ? "bg-primary border-primary" : "bg-background-light border-border-light"
                  }`}
                  onPress={() => handleSelectStandardSize(size)}
                >
                  <Text
                    className={`text-sm font-medium ${isSelected ? "text-white" : "text-text-main-light"}`}
                  >
                    {size.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Custom Size Input */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-sm font-semibold text-text-main-light mb-3">กำหนดขนาดเอง</Text>

          <View className="flex-row gap-4">
            {/* Width */}
            <View className="flex-1">
              <Text className="text-xs text-text-sub-light mb-1">กว้าง (ซม.)</Text>
              <View className="flex-row items-center bg-background-light rounded-lg border border-border-light">
                <TextInput
                  className="flex-1 px-3 py-3 text-base text-text-main-light"
                  placeholder="0"
                  keyboardType="numeric"
                  value={width}
                  onChangeText={setWidth}
                />
                <Text className="pr-3 text-text-sub-light">ซม.</Text>
              </View>
            </View>

            {/* Height */}
            <View className="flex-1">
              <Text className="text-xs text-text-sub-light mb-1">สูง (ซม.)</Text>
              <View className="flex-row items-center bg-background-light rounded-lg border border-border-light">
                <TextInput
                  className="flex-1 px-3 py-3 text-base text-text-main-light"
                  placeholder="0"
                  keyboardType="numeric"
                  value={height}
                  onChangeText={setHeight}
                />
                <Text className="pr-3 text-text-sub-light">ซม.</Text>
              </View>
            </View>
          </View>

          {/* Size Preview */}
          {width && height && (
            <View className="mt-4 p-3 bg-background-light rounded-lg">
              <Text className="text-sm text-text-sub-light text-center">
                พื้นที่: {((parseFloat(width) / 100) * (parseFloat(height) / 100)).toFixed(2)} ตร.ม.
              </Text>
            </View>
          )}
        </View>

        {/* Color Selection */}
        {product.constraints?.colors && product.constraints.colors.length > 0 && (
          <View className="bg-white rounded-xl p-4 mb-4">
            <Text className="text-sm font-semibold text-text-main-light mb-3">เลือกสี</Text>
            <View className="flex-row flex-wrap gap-3">
              {product.constraints.colors.map((color) => (
                <TouchableOpacity
                  key={color.id}
                  className={`items-center ${selectedColor === color.id ? "opacity-100" : "opacity-70"}`}
                  onPress={() => setSelectedColor(color.id)}
                >
                  <View
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor === color.id ? "border-primary" : "border-border-light"
                    }`}
                    style={{ backgroundColor: color.hexCode }}
                  />
                  <Text className="text-xs text-text-sub-light mt-1">{color.nameTh}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Glass Type Selection */}
        {product.constraints?.glassTypes && product.constraints.glassTypes.length > 0 && (
          <View className="bg-white rounded-xl p-4 mb-4">
            <Text className="text-sm font-semibold text-text-main-light mb-3">ประเภทกระจก</Text>
            <Text className="text-xs text-text-sub-light mb-3">
              * ราคาเพิ่มต่อตารางเมตร (บาท/ตร.ม.)
            </Text>
            {product.constraints.glassTypes.map((glass) => (
              <TouchableOpacity
                key={glass.id}
                className={`flex-row items-center p-3 rounded-xl mb-2 border-2 ${
                  selectedGlass === glass.id ? "border-primary bg-primary/5" : "border-border-light"
                }`}
                onPress={() => setSelectedGlass(glass.id)}
              >
                <View
                  className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${
                    selectedGlass === glass.id ? "border-primary bg-primary" : "border-border-light"
                  }`}
                >
                  {selectedGlass === glass.id && (
                    <Ionicons name="checkmark" size={12} color="#ffffff" />
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-text-main-light">{glass.nameTh}</Text>
                  <Text className="text-xs text-text-sub-light">{glass.description}</Text>
                </View>
                {glass.priceModifier > 0 ? (
                  <Text className="text-xs text-primary font-medium">
                    +{glass.priceModifier.toLocaleString()} บาท/ตร.ม.
                  </Text>
                ) : (
                  <Text className="text-xs text-green-600 font-medium">รวมในราคา</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Quantity */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-sm font-semibold text-text-main-light mb-3">จำนวน</Text>
          <View className="flex-row items-center justify-center">
            <TouchableOpacity
              className="w-12 h-12 bg-background-light rounded-xl items-center justify-center"
              onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              <Ionicons name="remove" size={24} color="#0d141b" />
            </TouchableOpacity>
            <Text className="mx-8 text-2xl font-bold text-text-main-light">{quantity}</Text>
            <TouchableOpacity
              className="w-12 h-12 bg-background-light rounded-xl items-center justify-center"
              onPress={() => setQuantity((prev) => prev + 1)}
            >
              <Ionicons name="add" size={24} color="#0d141b" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-border-light px-4 py-3 pb-8">
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-xs text-text-sub-light">ราคาต่อชิ้น</Text>
            <Text className="text-lg font-bold text-text-main-light">
              {formatPrice(calculatedPrice)}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-xs text-text-sub-light">ราคารวม ({quantity} ชิ้น)</Text>
            <Text className="text-xl font-bold text-primary">
              {formatPrice(calculatedPrice * quantity)}
            </Text>
          </View>
        </View>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleAddToCart}
          disabled={!isValid}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="cart-outline" size={20} color="#ffffff" />
            <Text className="text-white font-semibold ml-2">เพิ่มลงตะกร้า</Text>
          </View>
        </Button>
      </View>
    </SafeAreaView>
  );
}

