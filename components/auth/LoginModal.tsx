/**
 * LoginModal - Modal สำหรับ Login/สมัครสมาชิก
 * แสดงเป็น Popup เมื่อ Guest พยายามทำ action ที่ต้อง Login
 * รองรับ Dark Mode
 */

import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Context
import { useAuth } from "../../contexts/AuthContext";
import { useThemeColors } from "../../contexts";

type AuthMode = "login" | "register";

export function LoginModal() {
  const { showLoginModal, setShowLoginModal, loginModalMessage, login, register, isLoading } =
    useAuth();
  const { bgColor, cardBg, textMain, textSub, borderColor, iconSub, surfaceBg, isDark, raw } =
    useThemeColors();

  // State
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Reset form
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setShowPassword(false);
  };

  // Handle close
  const handleClose = () => {
    setShowLoginModal(false);
    resetForm();
    setMode("login");
  };

  // Handle login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("ข้อมูลไม่ครบ", "กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    const success = await login(email, password);
    if (success) {
      resetForm();
    } else {
      Alert.alert("เข้าสู่ระบบไม่สำเร็จ", "กรุณาตรวจสอบอีเมลและรหัสผ่าน");
    }
  };

  // Handle register
  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("ข้อมูลไม่ครบ", "กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("รหัสผ่านไม่ตรงกัน", "กรุณากรอกรหัสผ่านให้ตรงกัน");
      return;
    }
    if (password.length < 6) {
      Alert.alert("รหัสผ่านสั้นเกินไป", "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    const success = await register(email, password, name);
    if (success) {
      resetForm();
      Alert.alert("สมัครสมาชิกสำเร็จ", "ยินดีต้อนรับ!");
    } else {
      Alert.alert("สมัครสมาชิกไม่สำเร็จ", "กรุณาลองใหม่อีกครั้ง");
    }
  };

  // Handle social login (Mock)
  const handleSocialLogin = (provider: string) => {
    Alert.alert("Coming Soon", `การเข้าสู่ระบบด้วย ${provider} จะพร้อมใช้งานเร็วๆ นี้`);
  };

  return (
    <Modal
      visible={showLoginModal}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <Pressable className="flex-1 bg-black/50 justify-end" onPress={handleClose}>
          <Pressable
            className={`${surfaceBg} rounded-t-3xl max-h-[90%]`}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View
              className={`flex-row items-center justify-between px-4 py-4 border-b ${borderColor}`}
            >
              <View className="w-8" />
              <Text className={`text-lg font-bold ${textMain}`}>
                {mode === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
              </Text>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close" size={24} color={raw.textMain} />
              </TouchableOpacity>
            </View>

            <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
              {/* Message */}
              {loginModalMessage && (
                <View
                  className={`mb-4 p-3 rounded-xl ${isDark ? "bg-primary/20" : "bg-primary/10"}`}
                >
                  <View className="flex-row items-center">
                    <Ionicons name="information-circle" size={20} color="#137fec" />
                    <Text className={`flex-1 ml-2 text-sm ${textMain}`}>{loginModalMessage}</Text>
                  </View>
                </View>
              )}

              {/* Register: Name Input */}
              {mode === "register" && (
                <View className="mb-4">
                  <Text className={`text-sm font-medium ${textMain} mb-2`}>ชื่อ-นามสกุล</Text>
                  <View
                    className={`flex-row items-center ${cardBg} border ${borderColor} rounded-xl px-4`}
                  >
                    <Ionicons name="person-outline" size={20} color={iconSub} />
                    <TextInput
                      className="flex-1 py-3 px-3 text-base"
                      style={{ color: raw.textMain }}
                      placeholder="ชื่อ นามสกุล"
                      placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                </View>
              )}

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

              {/* Register: Confirm Password */}
              {mode === "register" && (
                <View className="mb-4">
                  <Text className={`text-sm font-medium ${textMain} mb-2`}>ยืนยันรหัสผ่าน</Text>
                  <View
                    className={`flex-row items-center ${cardBg} border ${borderColor} rounded-xl px-4`}
                  >
                    <Ionicons name="lock-closed-outline" size={20} color={iconSub} />
                    <TextInput
                      className="flex-1 py-3 px-3 text-base"
                      style={{ color: raw.textMain }}
                      placeholder="••••••••"
                      placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showPassword}
                    />
                  </View>
                </View>
              )}

              {/* Forgot Password (Login only) */}
              {mode === "login" && (
                <TouchableOpacity
                  className="self-end mb-4"
                  onPress={() => Alert.alert("ลืมรหัสผ่าน", "ฟีเจอร์นี้จะพร้อมใช้งานเร็วๆ นี้")}
                >
                  <Text className="text-sm text-primary font-medium">ลืมรหัสผ่าน?</Text>
                </TouchableOpacity>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                className={`bg-primary py-4 rounded-xl items-center mb-4 ${
                  isLoading ? "opacity-70" : ""
                }`}
                onPress={mode === "login" ? handleLogin : handleRegister}
                disabled={isLoading}
              >
                <Text className="text-white font-semibold">
                  {isLoading
                    ? "กำลังดำเนินการ..."
                    : mode === "login"
                    ? "เข้าสู่ระบบ"
                    : "สมัครสมาชิก"}
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center mb-4">
                <View className={`flex-1 h-px ${isDark ? "bg-border-dark" : "bg-border-light"}`} />
                <Text className={`mx-4 text-sm ${textSub}`}>หรือ</Text>
                <View className={`flex-1 h-px ${isDark ? "bg-border-dark" : "bg-border-light"}`} />
              </View>

              {/* Social Login */}
              <View className="flex-row justify-center gap-4 mb-6">
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

              {/* Switch Mode */}
              <View className="flex-row justify-center mb-4">
                <Text className={`text-sm ${textSub}`}>
                  {mode === "login" ? "ยังไม่มีบัญชี? " : "มีบัญชีอยู่แล้ว? "}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setMode(mode === "login" ? "register" : "login");
                    resetForm();
                  }}
                >
                  <Text className="text-sm text-primary font-medium">
                    {mode === "login" ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Continue as Guest */}
              <TouchableOpacity className="items-center py-2 mb-4" onPress={handleClose}>
                <Text className={`text-sm ${textSub}`}>ดูสินค้าต่อโดยไม่เข้าสู่ระบบ</Text>
              </TouchableOpacity>
            </ScrollView>

            {/* Safe area padding */}
            <View className="h-4" />
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default LoginModal;

