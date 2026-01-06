/**
 * Root Layout สำหรับ WINDSOR Distributor App
 * จัดการ global providers และ navigation structure
 * รองรับ Guest Mode - ผู้ใช้ดูสินค้าได้โดยไม่ต้อง Login
 */
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import "../global.css";
import { ThemeProvider, useTheme, AuthProvider } from "../contexts";
import { LoginModal } from "../components/auth";

// Inner component ที่ใช้ theme context
function RootLayoutInner() {
  const { isDark } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? "#101922" : "#f6f7f8" }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Slot />
      {/* Login Modal - แสดงเมื่อ Guest พยายามทำ action ที่ต้อง Login */}
      <LoginModal />
    </View>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <RootLayoutInner />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
