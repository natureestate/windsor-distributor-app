/**
 * Catalog Screen - หน้ารายการสินค้า
 * แสดงสินค้าทั้งหมดพร้อม filter และ search
 */

import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Components
import { SearchInput, Chip } from "../../../components/ui";
import { ProductCard } from "../../../components/product";

// Mock Data
import { mockProductListItems, mockCategories } from "../../../data/mockData";
import { ProductCategory, ProductListItem } from "../../../types/product";

// Filter options
const sortOptions = [
  { id: "popular", label: "ยอดนิยม" },
  { id: "price-low", label: "ราคาต่ำ-สูง" },
  { id: "price-high", label: "ราคาสูง-ต่ำ" },
  { id: "newest", label: "ใหม่ล่าสุด" },
];

export default function CatalogScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string; filter?: string }>();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">(
    (params.category as ProductCategory) || "all"
  );
  const [selectedSort, setSelectedSort] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = [...mockProductListItems];

    // Filter by category
    if (selectedCategory !== "all") {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameTh.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query)
      );
    }

    // Sort
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
      default:
        break;
    }

    return products;
  }, [selectedCategory, searchQuery, selectedSort]);

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
    <SafeAreaView className="flex-1 bg-background-light" edges={["top"]}>
      {/* Header */}
      <View className="px-4 pt-2 pb-3 bg-white border-b border-border-light">
        <View className="flex-row items-center mb-3">
          <Text className="text-xl font-bold text-text-main-light flex-1">สินค้าทั้งหมด</Text>
          <TouchableOpacity
            className="ml-2"
            onPress={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            <Ionicons
              name={viewMode === "grid" ? "list-outline" : "grid-outline"}
              size={22}
              color="#0d141b"
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
      <View className="bg-white py-3 border-b border-border-light">
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
      <View className="flex-row items-center justify-between px-4 py-2 bg-white border-b border-border-light">
        <Text className="text-sm text-text-sub-light">{filteredProducts.length} รายการ</Text>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="swap-vertical-outline" size={16} color="#4c739a" />
            <Text className="text-sm text-text-sub-light ml-1">
              {sortOptions.find((s) => s.id === selectedSort)?.label}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="filter-outline" size={16} color="#4c739a" />
            <Text className="text-sm text-text-sub-light ml-1">กรอง</Text>
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
            <Ionicons name="search-outline" size={48} color="#d1d5db" />
            <Text className="text-text-sub-light text-base mt-4">ไม่พบสินค้าที่ค้นหา</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

