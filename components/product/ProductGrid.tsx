/**
 * ProductGrid Component สำหรับ WINDSOR Distributor App
 * แสดงรายการสินค้าในรูปแบบ grid
 * รองรับ Dark Mode
 */

import React from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { ProductListItem } from "../../types/product";
import { ProductCard } from "./ProductCard";
import { cn } from "../../lib/utils";
import { useThemeColors } from "../../contexts";

interface ProductGridProps {
  products: ProductListItem[];
  numColumns?: 2 | 3;
  isLoading?: boolean;
  onEndReached?: () => void;
  onProductPress?: (product: ProductListItem) => void;
  onAddToCart?: (product: ProductListItem) => void;
  ListHeaderComponent?: React.ReactElement;
  ListEmptyComponent?: React.ReactElement;
  contentContainerClassName?: string;
  className?: string;
}

export function ProductGrid({
  products,
  numColumns = 2,
  isLoading = false,
  onEndReached,
  onProductPress,
  onAddToCart,
  ListHeaderComponent,
  ListEmptyComponent,
  contentContainerClassName,
  className,
}: ProductGridProps) {
  // Render item
  const renderItem = ({ item, index }: { item: ProductListItem; index: number }) => {
    const isLastInRow = (index + 1) % numColumns === 0;

    return (
      <View
        className={cn(
          "flex-1",
          !isLastInRow && "mr-3", // gap ระหว่าง columns
          "mb-3" // gap ระหว่าง rows
        )}
        style={{ maxWidth: `${100 / numColumns}%` }}
      >
        <ProductCard
          product={item}
          variant="grid"
          onPress={() => onProductPress?.(item)}
          onAddToCart={onAddToCart ? () => onAddToCart(item) : undefined}
        />
      </View>
    );
  };

  // Empty state
  const defaultEmptyComponent = (
    <View className="flex-1 items-center justify-center py-12">
      <Text className="text-text-sub-light text-base">ไม่พบสินค้า</Text>
    </View>
  );

  // Loading footer
  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="small" color="#137fec" />
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent || defaultEmptyComponent}
      ListFooterComponent={renderFooter}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      className={cn(className)}
    />
  );
}

/**
 * ProductRow - แสดงสินค้าแบบ horizontal scroll (สำหรับ Featured Products)
 */
interface ProductRowProps {
  products: ProductListItem[];
  title?: string;
  onSeeAll?: () => void;
  onProductPress?: (product: ProductListItem) => void;
  onAddToCart?: (product: ProductListItem) => void;
  className?: string;
}

export function ProductRow({
  products,
  title,
  onSeeAll,
  onProductPress,
  onAddToCart,
  className,
}: ProductRowProps) {
  const { textMain } = useThemeColors();

  return (
    <View className={cn(className)}>
      {/* Header */}
      {title && (
        <View className="flex-row items-center justify-between px-4 mb-3">
          <Text className={`text-lg font-bold ${textMain}`}>{title}</Text>
          {onSeeAll && (
            <Text className="text-sm text-primary font-medium" onPress={onSeeAll}>
              ดูทั้งหมด
            </Text>
          )}
        </View>
      )}

      {/* Horizontal scroll */}
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View className="w-3" />}
        renderItem={({ item }) => (
          <View style={{ width: 160 }}>
            <ProductCard
              product={item}
              variant="grid"
              onPress={() => onProductPress?.(item)}
              onAddToCart={onAddToCart ? () => onAddToCart(item) : undefined}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default ProductGrid;
