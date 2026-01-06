/**
 * Auth Layout - Layout สำหรับหน้า Authentication
 */

import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    />
  );
}

