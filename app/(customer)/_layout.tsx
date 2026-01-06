/**
 * Customer Layout - ใช้ Slot สำหรับ New Architecture compatibility
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
