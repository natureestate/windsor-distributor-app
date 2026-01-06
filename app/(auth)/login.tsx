/**
 * Login Screen - หน้าเข้าสู่ระบบ
 * Mock login สำหรับทดสอบ
 * รองรับ Dark Mode
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Context
import { useThemeColors } from "../../contexts";

export default function LoginScreen() {
  const router = useRouter();
  const { bgColor, cardBg, textMain, textSub, borderColor, iconSub, isDark, raw } = useThemeColors();

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("ข้อมูลไม่ครบ", "กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);

    // Mock successful login - ไปหน้าหลัก
    router.replace("/(customer)/(tabs)");
  };

  // Mock social login
  const handleSocialLogin = (provider: string) => {
    Alert.alert("Coming Soon", `การเข้าสู่ระบบด้วย ${provider} จะพร้อมใช้งานเร็วๆ นี้`);
  };

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-primary rounded-2xl items-center justify-center mb-4">
              <Text className="text-white text-3xl font-bold">W</Text>
            </View>
            <Text className={`text-2xl font-bold ${textMain}`}>WINDSOR</Text>
            <Text className={`text-sm ${textSub} mt-1`}>Distributor App</Text>
          </View>

          {/* Welcome Text */}
          <View className="mb-8">
            <Text className={`text-2xl font-bold ${textMain} text-center`}>ยินดีต้อนรับ</Text>
            <Text className={`text-sm ${textSub} text-center mt-2`}>
              เข้าสู่ระบบเพื่อจัดการคำสั่งซื้อและดูสินค้า
            </Text>
          </View>

          {/* Login Form */}
          <View className="mb-6">
            {/* Email Input */}
            <View className="mb-4">
              <Text className={`text-sm font-medium ${textMain} mb-2`}>อีเมล</Text>
              <View
                className={`flex-row items-center ${cardBg} border ${borderColor} rounded-xl px-4`}
              >
                <Ionicons name="mail-outline" size={20} color={iconSub} />
                <TextInput
                  className="flex-1 py-3 px-3 text-base"
                  style={{ color: raw.textMain }}
                  placeholder="example@email.com"
                  placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className={`text-sm font-medium ${textMain} mb-2`}>รหัสผ่าน</Text>
              <View
                className={`flex-row items-center ${cardBg} border ${borderColor} rounded-xl px-4`}
              >
                <Ionicons name="lock-closed-outline" size={20} color={iconSub} />
                <TextInput
                  className="flex-1 py-3 px-3 text-base"
                  style={{ color: raw.textMain }}
                  placeholder="••••••••"
                  placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={iconSub}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              className="self-end mb-6"
              onPress={() => Alert.alert("ลืมรหัสผ่าน", "ฟีเจอร์นี้จะพร้อมใช้งานเร็วๆ นี้")}
            >
              <Text className="text-sm text-primary font-medium">ลืมรหัสผ่าน?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              className={`bg-primary py-4 rounded-xl items-center ${isLoading ? "opacity-70" : ""}`}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text className="text-white font-semibold">กำลังเข้าสู่ระบบ...</Text>
              ) : (
                <Text className="text-white font-semibold">เข้าสู่ระบบ</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className={`flex-1 h-px ${isDark ? "bg-border-dark" : "bg-border-light"}`} />
            <Text className={`mx-4 text-sm ${textSub}`}>หรือ</Text>
            <View className={`flex-1 h-px ${isDark ? "bg-border-dark" : "bg-border-light"}`} />
          </View>

          {/* Social Login */}
          <View className="flex-row justify-center gap-4 mb-8">
            <TouchableOpacity
              className={`w-14 h-14 ${cardBg} border ${borderColor} rounded-full items-center justify-center`}
              onPress={() => handleSocialLogin("Google")}
            >
              <Ionicons name="logo-google" size={24} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-14 h-14 ${cardBg} border ${borderColor} rounded-full items-center justify-center`}
              onPress={() => handleSocialLogin("Facebook")}
            >
              <Ionicons name="logo-facebook" size={24} color="#4267B2" />
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-14 h-14 ${cardBg} border ${borderColor} rounded-full items-center justify-center`}
              onPress={() => handleSocialLogin("Apple")}
            >
              <Ionicons name="logo-apple" size={24} color={isDark ? "#ffffff" : "#000000"} />
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <View className="flex-row justify-center">
            <Text className={`text-sm ${textSub}`}>ยังไม่มีบัญชี? </Text>
            <TouchableOpacity
              onPress={() => Alert.alert("สมัครสมาชิก", "ฟีเจอร์นี้จะพร้อมใช้งานเร็วๆ นี้")}
            >
              <Text className="text-sm text-primary font-medium">สมัครสมาชิก</Text>
            </TouchableOpacity>
          </View>

          {/* Demo Hint */}
          <View
            className={`mt-8 p-4 rounded-xl ${isDark ? "bg-yellow-900/30" : "bg-yellow-50"}`}
          >
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#f59e0b" />
              <View className="flex-1 ml-2">
                <Text className={`text-sm font-medium ${textMain}`}>Demo Mode</Text>
                <Text className={`text-xs ${textSub} mt-1`}>
                  กรอกอีเมลและรหัสผ่านใดก็ได้เพื่อเข้าสู่ระบบ (Mock)
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

