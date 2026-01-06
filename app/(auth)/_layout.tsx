/**
 * Auth Layout - Layout สำหรับหน้า Authentication
 * ใช้ Slot แทน Stack เพื่อรองรับ New Architecture ใน Expo Go
 */

import { Slot } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}

