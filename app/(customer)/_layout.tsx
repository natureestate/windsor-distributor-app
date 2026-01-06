/**
 * Customer Layout - รวม Tabs และหน้าอื่นๆ
 * ใช้ Slot แทน Stack เพื่อรองรับ New Architecture ใน Expo Go
 * - (tabs) = หน้าที่มี Bottom Tab Navigation
 * - product/[id] = หน้ารายละเอียดสินค้า
 * - checkout = หน้าชำระเงิน
 * - orders/[id] = หน้ารายละเอียดคำสั่งซื้อ
 */

import { Slot } from "expo-router";
import { View } from "react-native";

export default function CustomerLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}
