/**
 * BannerCarousel Component สำหรับ WINDSOR Distributor App
 * แสดง Promo Banners แบบ Carousel เลื่อน auto พร้อม indicators
 */

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { cn } from "../../lib/utils";
import { Badge } from "./Badge";
import { PromoBanner } from "../../data/mockData";

// ดึงความกว้างหน้าจอ
const { width: SCREEN_WIDTH } = Dimensions.get("window");
// ความกว้าง banner (หักขอบซ้าย-ขวา px-4 = 32px)
const BANNER_WIDTH = SCREEN_WIDTH - 32;

interface BannerCarouselProps {
  banners: PromoBanner[];
  autoPlayInterval?: number; // ระยะเวลาเลื่อน auto (ms)
  height?: number; // ความสูง banner
  onBannerPress?: (banner: PromoBanner) => void;
  className?: string;
}

export function BannerCarousel({
  banners,
  autoPlayInterval = 4000, // เลื่อนทุก 4 วินาที
  height = 176, // h-44 = 176px
  onBannerPress,
  className,
}: BannerCarouselProps) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // จำนวน banner ทั้งหมด
  const totalBanners = banners.length;

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying || totalBanners <= 1) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % totalBanners;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying, autoPlayInterval, totalBanners]);

  // จัดการเมื่อ scroll เสร็จ
  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / BANNER_WIDTH);
      setCurrentIndex(index);
    },
    []
  );

  // หยุด auto-play เมื่อผู้ใช้เริ่ม scroll
  const handleScrollBeginDrag = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  // เริ่ม auto-play ใหม่หลัง scroll เสร็จ
  const handleScrollEndDrag = useCallback(() => {
    // รอ 2 วินาทีก่อนเริ่ม auto-play ใหม่
    setTimeout(() => setIsAutoPlaying(true), 2000);
  }, []);

  // กดที่ indicator เพื่อไปยัง banner นั้น
  const handleIndicatorPress = useCallback((index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
    setCurrentIndex(index);
  }, []);

  // Render แต่ละ banner item
  const renderBannerItem = useCallback(
    ({ item }: { item: PromoBanner }) => (
      <TouchableOpacity
        className="relative rounded-2xl overflow-hidden"
        style={{ width: BANNER_WIDTH, height }}
        activeOpacity={0.95}
        onPress={() => onBannerPress?.(item)}
      >
        {/* รูปภาพ banner */}
        <Image
          source={{ uri: item.imageUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Overlay content */}
        <View className="absolute inset-0 bg-black/30 p-4 justify-end">
          {/* Badge */}
          {item.badge && (
            <Badge
              variant={item.badgeColor === "white" ? "white" : "promo"}
              className="mb-2"
            >
              {item.badge}
            </Badge>
          )}
          {/* Title */}
          <Text className="text-xl font-bold text-white mb-1">
            {item.title}
          </Text>
          {/* Subtitle */}
          <Text className="text-sm text-white/90">{item.subtitle}</Text>
        </View>
      </TouchableOpacity>
    ),
    [height, onBannerPress]
  );

  // Key extractor สำหรับ FlatList
  const keyExtractor = useCallback((item: PromoBanner) => item.id, []);

  // getItemLayout สำหรับ performance
  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: BANNER_WIDTH,
      offset: BANNER_WIDTH * index,
      index,
    }),
    []
  );

  return (
    <View className={cn("px-4", className)}>
      {/* Banner FlatList */}
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderBannerItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        getItemLayout={getItemLayout}
        snapToInterval={BANNER_WIDTH}
        decelerationRate="fast"
        bounces={false}
        scrollEventThrottle={16}
      />

      {/* Indicators (จุดแสดงตำแหน่ง) */}
      {totalBanners > 1 && (
        <View className="flex-row justify-center items-center mt-3 gap-2">
          {banners.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleIndicatorPress(index)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {/* ใช้ style แยกเพื่อหลีกเลี่ยง transition-all ที่ทำให้เกิด error */}
              <View
                className="rounded-full"
                style={{
                  width: index === currentIndex ? 24 : 8,
                  height: 8,
                  backgroundColor: index === currentIndex ? "#0066CC" : "#D1D5DB",
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default BannerCarousel;

