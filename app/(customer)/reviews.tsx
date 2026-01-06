/**
 * Reviews Screen - หน้ารีวิวของฉัน
 * แสดงรีวิวที่ผู้ใช้เคยเขียน
 * รองรับ Dark Mode
 */

import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Context
import { useThemeColors } from "../../contexts";

// Mock reviews
interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  createdAt: Date;
  images?: string[];
}

const mockMyReviews: Review[] = [
  {
    id: "review-1",
    productId: "prod-1",
    productName: "หน้าต่าง WINDSOR Signature",
    productImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCsWjXREw1JBxTV8WZYUlkjf-5m5Nml6LHD5J-PE7PaHg_ngqbPznjQj6CuyvVFKJaeG5GBPMmXZAbqCM5sw0-CbSYHbTIeoL1ehJkLR0Eo8HSELqSMqgOaGgIJzjcSqqXjt61TnNbsLYJLT-PZrjOAHSu3PQ5vOg_h8gPLifripZRmIUcsNpZcmJq7wjwfjoey_aI_wXR5rk4tRKr5SrBO1KwWh2YB66XjImug7eoKc70CIcwxGGZ4aFDAetIApcc1EH4ApxWTxLE",
    rating: 5,
    comment: "สินค้าคุณภาพดีมาก ติดตั้งง่าย ช่างมาติดตั้งให้ตรงเวลา ประทับใจมากครับ",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "review-2",
    productId: "prod-2",
    productName: "ประตูบานเลื่อน Smart Series",
    productImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAD9Rjp_3n9OQtvVS6ziit2Ac05lJR7Mo9BpxbH9p8ZyfX8Qi8t447NjyNgMrewcmAyoAxdkRT9swjWUEs9-J4yO0UGb0xmtuahoUJQjom_Mg7NMW6k0A8lm9W-ptXFTl4QBanSr9V-tkAzEvj3m3-ovqUfG0TydkgfRsp8YrfpOiaSBYaPFiF1TZyzIfJz42Ko9pyAPgmyUhPeI_DicOI8-VzA1f9BFzoKXjLyqme8VB1aJo1fGcTlwK5JGf3h6QG8dvvKq_XR3j1R",
    rating: 4,
    comment: "ประตูสวย ใช้งานได้ดี แต่รอนานหน่อย",
    createdAt: new Date("2024-01-10"),
  },
];

export default function ReviewsScreen() {
  const router = useRouter();
  const { bgColor, cardBg, textMain, textSub, borderColor, iconMain, iconSub, isDark } =
    useThemeColors();

  const [reviews, setReviews] = useState<Review[]>(mockMyReviews);

  // ลบรีวิว
  const handleDeleteReview = (reviewId: string) => {
    Alert.alert("ลบรีวิว", "คุณต้องการลบรีวิวนี้หรือไม่?", [
      { text: "ยกเลิก", style: "cancel" },
      {
        text: "ลบ",
        style: "destructive",
        onPress: () => {
          setReviews((prev) => prev.filter((r) => r.id !== reviewId));
          Alert.alert("สำเร็จ", "ลบรีวิวเรียบร้อยแล้ว");
        },
      },
    ]);
  };

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={14}
            color={star <= rating ? "#f59e0b" : iconSub}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`} edges={["top"]}>
      {/* Header */}
      <View className={`px-4 py-3 ${cardBg} border-b ${borderColor} flex-row items-center`}>
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color={iconMain} />
        </TouchableOpacity>
        <Text className={`text-xl font-bold ${textMain} flex-1`}>รีวิวของฉัน</Text>
        <Text className={`text-sm ${textSub}`}>{reviews.length} รีวิว</Text>
      </View>

      {reviews.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="chatbubble-outline" size={64} color={iconSub} />
          <Text className={`${textSub} text-base mt-4`}>ยังไม่มีรีวิว</Text>
          <Text className={`${textSub} text-sm mt-1 text-center px-8`}>
            สั่งซื้อสินค้าและเขียนรีวิวเพื่อช่วยผู้ซื้อคนอื่น
          </Text>
          <TouchableOpacity
            className="mt-4 px-6 py-3 bg-primary rounded-xl"
            onPress={() => router.push("/(customer)/(tabs)/orders")}
          >
            <Text className="text-white font-medium">ดูคำสั่งซื้อ</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
        >
          {reviews.map((review) => (
            <View key={review.id} className={`${cardBg} rounded-xl p-4 mb-3`}>
              {/* Product Info */}
              <TouchableOpacity
                className="flex-row items-center mb-3"
                onPress={() => router.push(`/(customer)/product/${review.productId}`)}
              >
                <Image
                  source={{ uri: review.productImage }}
                  className="w-12 h-12 rounded-lg bg-gray-100"
                  resizeMode="cover"
                />
                <View className="flex-1 ml-3">
                  <Text className={`text-sm font-medium ${textMain}`} numberOfLines={1}>
                    {review.productName}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    {renderStars(review.rating)}
                    <Text className={`text-xs ${textSub} ml-2`}>
                      {review.createdAt.toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Review Comment */}
              <Text className={`text-sm ${textMain}`}>{review.comment}</Text>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <View className="flex-row mt-3 gap-2">
                  {review.images.map((img, idx) => (
                    <Image
                      key={idx}
                      source={{ uri: img }}
                      className="w-16 h-16 rounded-lg"
                      resizeMode="cover"
                    />
                  ))}
                </View>
              )}

              {/* Actions */}
              <View className={`flex-row mt-3 pt-3 border-t ${borderColor}`}>
                <TouchableOpacity
                  className="flex-row items-center mr-4"
                  onPress={() => Alert.alert("แก้ไขรีวิว", "ฟีเจอร์นี้จะพร้อมใช้งานเร็วๆ นี้")}
                >
                  <Ionicons name="pencil-outline" size={16} color={iconSub} />
                  <Text className={`text-sm ${textSub} ml-1`}>แก้ไข</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => handleDeleteReview(review.id)}
                >
                  <Ionicons name="trash-outline" size={16} color="#ef4444" />
                  <Text className="text-sm text-red-500 ml-1">ลบ</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

