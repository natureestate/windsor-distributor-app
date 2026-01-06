/**
 * Customer Layout - รวม Tabs และหน้าอื่นๆ
 * - (tabs) = หน้าที่มี Bottom Tab Navigation
 * - product/[id] = หน้ารายละเอียดสินค้า
 * - checkout = หน้าชำระเงิน
 * - orders/[id] = หน้ารายละเอียดคำสั่งซื้อ
 */

import { Stack } from "expo-router";

export default function CustomerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="product/[id]" />
      <Stack.Screen name="product/[id]/configure" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="orders/[id]" />
    </Stack>
  );
}
