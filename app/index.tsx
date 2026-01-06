/**
 * Root Index - Redirect ไปยังหน้า Customer Home
 * หน้าแรกของแอปจะเป็น Customer-facing เสมอ
 */

import { Redirect } from "expo-router";

export default function Index() {
  // Redirect ไปยังหน้า Customer Home โดยตรง
  return <Redirect href="/(customer)" />;
}
