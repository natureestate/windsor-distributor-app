/**
 * Catalog Screen - หน้ารายการสินค้า
 * แสดงสินค้าทั้งหมดพร้อม filter และ search
 * รองรับ Dark Mode
 * มี Sort Modal และ Filter Modal
 */

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Components
import { SearchInput, Chip } from "../../../components/ui";
import { ProductCard } from "../../../components/product";

// Context
import { useThemeColors } from "../../../contexts";

// Mock Data
import { mockProductListItems, mockCategories } from "../../../data/mockData";
import { ProductCategory, ProductListItem } from "../../../types/product";

// Sort options - ตัวเลือกการเรียงลำดับ
const sortOptions = [
  { id: "popular", label: "ยอดนิยม", icon: "flame-outline" as const },
  { id: "price-low", label: "ราคาต่ำ-สูง", icon: "arrow-up-outline" as const },
  { id: "price-high", label: "ราคาสูง-ต่ำ", icon: "arrow-down-outline" as const },
  { id: "newest", label: "ใหม่ล่าสุด", icon: "time-outline" as const },
  { id: "rating", label: "คะแนนสูงสุด", icon: "star-outline" as const },
];

// Price range options - ช่วงราคา
const priceRanges = [
  { id: "all", label: "ทุกราคา", min: 0, max: Infinity },
  { id: "under-5k", label: "ต่ำกว่า ฿5,000", min: 0, max: 5000 },
  { id: "5k-10k", label: "฿5,000 - ฿10,000", min: 5000, max: 10000 },
  { id: "10k-20k", label: "฿10,000 - ฿20,000", min: 10000, max: 20000 },
  { id: "over-20k", label: "มากกว่า ฿20,000", min: 20000, max: Infinity },
];

// Badge filter options - ตัวเลือก badge
const badgeOptions = [
  { id: "best-seller", label: "ขายดี" },
  { id: "new", label: "สินค้าใหม่" },
  { id: "promo", label: "โปรโมชั่น" },
];

export default function CatalogScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string; filter?: string }>();
  const { bgColor, cardBg, textMain, textSub, borderColor, iconMain, iconSub, isDark, surfaceBg } =
    useThemeColors();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">(
    (params.category as ProductCategory) || "all"
  );
  const [selectedSort, setSelectedSort] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modal states - สถานะ Modal
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Filter states - สถานะตัวกรอง
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // นับจำนวน filter ที่เลือก
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedPriceRange !== "all") count++;
    if (selectedBadges.length > 0) count += selectedBadges.length;
    if (inStockOnly) count++;
    return count;
  }, [selectedPriceRange, selectedBadges, inStockOnly]);

  // Filter products - กรองสินค้าตามเงื่อนไขทั้งหมด
  const filteredProducts = useMemo(() => {
    let products = [...mockProductListItems];

    // Filter by category - กรองตามหมวดหมู่
    if (selectedCategory !== "all") {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query - กรองตามคำค้นหา
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameTh.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query)
      );
    }

    // Filter by price range - กรองตามช่วงราคา
    if (selectedPriceRange !== "all") {
      const range = priceRanges.find((r) => r.id === selectedPriceRange);
      if (range) {
        products = products.filter((p) => p.basePrice >= range.min && p.basePrice <= range.max);
      }
    }

    // Filter by badges - กรองตาม badge
    if (selectedBadges.length > 0) {
      products = products.filter((p) => selectedBadges.some((badge) => p.badges.includes(badge as any)));
    }

    // Filter by stock - กรองเฉพาะสินค้าในสต็อก
    if (inStockOnly) {
      products = products.filter((p) => p.inStock);
    }

    // Sort - เรียงลำดับ
    switch (selectedSort) {
      case "price-low":
        products.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-high":
        products.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "newest":
        products.reverse();
        break;
      case "rating":
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return products;
  }, [selectedCategory, searchQuery, selectedSort, selectedPriceRange, selectedBadges, inStockOnly]);

  // Reset filters - รีเซ็ตตัวกรองทั้งหมด
  const resetFilters = () => {
    setSelectedPriceRange("all");
    setSelectedBadges([]);
    setInStockOnly(false);
  };

  // Toggle badge selection - สลับเลือก badge
  const toggleBadge = (badgeId: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badgeId) ? prev.filter((b) => b !== badgeId) : [...prev, badgeId]
    );
  };

  // Render product item
  const renderProduct = ({ item, index }: { item: ProductListItem; index: number }) => {
    const isEven = index % 2 === 0;

    return (
      <View className={`flex-1 ${isEven ? "pr-1.5" : "pl-1.5"} mb-3`} style={{ maxWidth: "50%" }}>
        <ProductCard
          product={item}
          variant={viewMode}
          onPress={() => router.push(`/(customer)/product/${item.id}`)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`} edges={["top"]}>
      {/* Header */}
      <View className={`px-4 pt-2 pb-3 ${cardBg} border-b ${borderColor}`}>
        <View className="flex-row items-center mb-3">
          <Text className={`text-xl font-bold ${textMain} flex-1`}>สินค้าทั้งหมด</Text>
          <TouchableOpacity
            className="ml-2"
            onPress={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            <Ionicons
              name={viewMode === "grid" ? "list-outline" : "grid-outline"}
              size={22}
              color={iconMain}
            />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <SearchInput
          placeholder="ค้นหาสินค้า..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />
      </View>

      {/* Category Chips */}
      <View className={`${cardBg} py-3 border-b ${borderColor}`}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          <Chip
            label="ทั้งหมด"
            selected={selectedCategory === "all"}
            onPress={() => setSelectedCategory("all")}
          />
          {mockCategories.map((cat) => (
            <Chip
              key={cat.id}
              label={cat.nameTh}
              selected={selectedCategory === cat.id}
              onPress={() => setSelectedCategory(cat.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Sort & Filter Bar */}
      <View className={`flex-row items-center justify-between px-4 py-2 ${cardBg} border-b ${borderColor}`}>
        <Text className={`text-sm ${textSub}`}>{filteredProducts.length} รายการ</Text>

        <View className="flex-row items-center gap-3">
          {/* ปุ่มเรียงลำดับ */}
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setSortModalVisible(true)}
          >
            <Ionicons name="swap-vertical-outline" size={16} color={iconSub} />
            <Text className={`text-sm ${textSub} ml-1`}>
              {sortOptions.find((s) => s.id === selectedSort)?.label}
            </Text>
          </TouchableOpacity>

          {/* ปุ่มกรอง */}
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setFilterModalVisible(true)}
          >
            <Ionicons name="filter-outline" size={16} color={iconSub} />
            <Text className={`text-sm ${textSub} ml-1`}>กรอง</Text>
            {/* แสดงจำนวน filter ที่เลือก */}
            {activeFilterCount > 0 && (
              <View className="ml-1 w-5 h-5 bg-primary rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">{activeFilterCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Ionicons name="search-outline" size={48} color={isDark ? "#64748b" : "#d1d5db"} />
            <Text className={`${textSub} text-base mt-4`}>ไม่พบสินค้าที่ค้นหา</Text>
            {activeFilterCount > 0 && (
              <TouchableOpacity
                className="mt-3 px-4 py-2 bg-primary rounded-lg"
                onPress={resetFilters}
              >
                <Text className="text-white text-sm font-medium">ล้างตัวกรอง</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      {/* ===== Sort Modal - เลือกการเรียงลำดับ ===== */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setSortModalVisible(false)}
        >
          <Pressable
            className={`${surfaceBg} rounded-t-3xl`}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View className={`flex-row items-center justify-between px-4 py-4 border-b ${borderColor}`}>
              <Text className={`text-lg font-bold ${textMain}`}>เรียงลำดับ</Text>
              <TouchableOpacity onPress={() => setSortModalVisible(false)}>
                <Ionicons name="close" size={24} color={iconMain} />
              </TouchableOpacity>
            </View>

            {/* Sort Options */}
            <View className="py-2">
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  className={`flex-row items-center px-4 py-3 ${
                    selectedSort === option.id ? "bg-primary/10" : ""
                  }`}
                  onPress={() => {
                    setSelectedSort(option.id);
                    setSortModalVisible(false);
                  }}
                >
                  <Ionicons
                    name={option.icon}
                    size={20}
                    color={selectedSort === option.id ? "#137fec" : iconSub}
                  />
                  <Text
                    className={`flex-1 ml-3 text-base ${
                      selectedSort === option.id ? "text-primary font-semibold" : textMain
                    }`}
                  >
                    {option.label}
                  </Text>
                  {selectedSort === option.id && (
                    <Ionicons name="checkmark" size={20} color="#137fec" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Safe area padding */}
            <View className="h-8" />
          </Pressable>
        </Pressable>
      </Modal>

      {/* ===== Filter Modal - ตัวกรองสินค้า ===== */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setFilterModalVisible(false)}
        >
          <Pressable
            className={`${surfaceBg} rounded-t-3xl max-h-[80%]`}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View className={`flex-row items-center justify-between px-4 py-4 border-b ${borderColor}`}>
              <Text className={`text-lg font-bold ${textMain}`}>กรองสินค้า</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Ionicons name="close" size={24} color={iconMain} />
              </TouchableOpacity>
            </View>

            <ScrollView className="max-h-96">
              {/* Price Range Section - ช่วงราคา */}
              <View className={`px-4 py-4 border-b ${borderColor}`}>
                <Text className={`text-sm font-semibold ${textMain} mb-3`}>ช่วงราคา</Text>
                <View className="flex-row flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <TouchableOpacity
                      key={range.id}
                      className={`px-3 py-2 rounded-full border ${
                        selectedPriceRange === range.id
                          ? "bg-primary border-primary"
                          : `${cardBg} ${borderColor}`
                      }`}
                      onPress={() => setSelectedPriceRange(range.id)}
                    >
                      <Text
                        className={`text-sm ${
                          selectedPriceRange === range.id ? "text-white font-medium" : textMain
                        }`}
                      >
                        {range.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Badge Section - ประเภทสินค้า */}
              <View className={`px-4 py-4 border-b ${borderColor}`}>
                <Text className={`text-sm font-semibold ${textMain} mb-3`}>ประเภทสินค้า</Text>
                <View className="flex-row flex-wrap gap-2">
                  {badgeOptions.map((badge) => (
                    <TouchableOpacity
                      key={badge.id}
                      className={`px-3 py-2 rounded-full border ${
                        selectedBadges.includes(badge.id)
                          ? "bg-primary border-primary"
                          : `${cardBg} ${borderColor}`
                      }`}
                      onPress={() => toggleBadge(badge.id)}
                    >
                      <Text
                        className={`text-sm ${
                          selectedBadges.includes(badge.id) ? "text-white font-medium" : textMain
                        }`}
                      >
                        {badge.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Stock Filter - เฉพาะสินค้าในสต็อก */}
              <View className={`px-4 py-4 border-b ${borderColor}`}>
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className={`text-sm font-semibold ${textMain}`}>เฉพาะสินค้าในสต็อก</Text>
                    <Text className={`text-xs ${textSub} mt-1`}>
                      แสดงเฉพาะสินค้าที่พร้อมจัดส่ง
                    </Text>
                  </View>
                  <Switch
                    value={inStockOnly}
                    onValueChange={setInStockOnly}
                    trackColor={{ false: isDark ? "#374151" : "#e2e8f0", true: "#137fec" }}
                    thumbColor="#ffffff"
                  />
                </View>
              </View>
            </ScrollView>

            {/* Action Buttons - ปุ่มดำเนินการ */}
            <View className={`flex-row px-4 py-4 border-t ${borderColor} gap-3`}>
              <TouchableOpacity
                className={`flex-1 py-3 rounded-xl border ${borderColor}`}
                onPress={resetFilters}
              >
                <Text className={`text-center font-semibold ${textMain}`}>ล้างทั้งหมด</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-3 rounded-xl bg-primary"
                onPress={() => setFilterModalVisible(false)}
              >
                <Text className="text-center font-semibold text-white">
                  ดูผลลัพธ์ ({filteredProducts.length})
                </Text>
              </TouchableOpacity>
            </View>

            {/* Safe area padding */}
            <View className="h-4" />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

