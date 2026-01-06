/**
 * Product Types สำหรับ WINDSOR Distributor App
 * รองรับทั้งสินค้าสำเร็จรูปและสินค้า custom-made
 */

// ประเภทหมวดหมู่สินค้า
export type ProductCategory =
  | "window" // หน้าต่าง
  | "door" // ประตู
  | "vinyl" // ไวนิล
  | "screen" // มุ้งลวด
  | "accessory"; // อุปกรณ์เสริม

// Badge แสดงสถานะพิเศษของสินค้า
export type ProductBadge = "best-seller" | "new" | "eco" | "promo";

// สถานะสต็อกสินค้า
export type StockStatus = "in-stock" | "pre-order" | "out-of-stock";

// ตัวเลือกสี
export interface ColorOption {
  id: string;
  name: string; // ชื่อภาษาอังกฤษ
  nameTh: string; // ชื่อภาษาไทย
  hexCode: string; // รหัสสี HEX
  imageUrl?: string; // รูปภาพตัวอย่าง (ถ้ามี)
  priceModifier?: number; // ราคาเพิ่ม/ลด (บาท)
}

// ตัวเลือกกระจก
export interface GlassOption {
  id: string;
  name: string;
  nameTh: string;
  description?: string;
  priceModifier: number; // ราคาเพิ่มต่อตารางเมตร
}

// ตัวเลือกวัสดุ
export interface MaterialOption {
  id: string;
  name: string;
  nameTh: string;
  priceModifier: number;
}

// ข้อจำกัดขนาด (สำหรับสินค้า custom-made)
export interface DimensionConstraints {
  min: number; // ค่าต่ำสุด (ซม.)
  max: number; // ค่าสูงสุด (ซม.)
  step?: number; // ขั้นละ (ซม.) default = 1
}

// ช่วงราคาตามขนาด
export interface PriceMatrixEntry {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  pricePerUnit: number; // ราคาต่อหน่วย
}

// Constraints สำหรับสินค้า configurable
export interface ProductConstraints {
  width: DimensionConstraints;
  height: DimensionConstraints;
  priceMatrix?: PriceMatrixEntry[];
  materials?: MaterialOption[];
  colors: ColorOption[];
  glassTypes?: GlassOption[];
}

// Specifications ของสินค้า
export interface ProductSpecs {
  material?: string; // วัสดุ
  warranty?: string; // การรับประกัน
  glassType?: string; // ประเภทกระจก
  frameThickness?: string; // ความหนาเฟรม
  soundReduction?: string; // ลดเสียง (dB)
  uValue?: string; // ค่า U-Value (thermal insulation)
  [key: string]: string | undefined; // รองรับ specs เพิ่มเติม
}

// Product Interface หลัก
export interface Product {
  id: string;
  sku: string; // รหัสสินค้า เช่น WIN-SLD-8842
  name: string; // ชื่อภาษาอังกฤษ
  nameTh: string; // ชื่อภาษาไทย
  category: ProductCategory;
  series?: string; // รุ่น เช่น "Series 500", "Smart Series"
  basePrice: number; // ราคาเริ่มต้น (บาท)
  images: string[]; // URLs รูปภาพ
  rating?: number; // คะแนนรีวิว (0-5)
  reviewCount?: number; // จำนวนรีวิว
  badges: ProductBadge[]; // badges พิเศษ
  description: string; // รายละเอียดสินค้า
  descriptionTh?: string; // รายละเอียดภาษาไทย
  features: string[]; // คุณสมบัติเด่น
  featuresTh?: string[]; // คุณสมบัติเด่น (ไทย)
  specs: ProductSpecs; // specifications
  constraints?: ProductConstraints; // สำหรับสินค้า configurable
  stockStatus: StockStatus;
  leadTimeDays?: number; // ระยะเวลาผลิต (วัน) สำหรับ pre-order
  isConfigurable: boolean; // เป็นสินค้าที่ปรับแต่งได้หรือไม่
  createdAt?: Date;
  updatedAt?: Date;
}

// Product สำหรับแสดงในรายการ (ข้อมูลย่อ)
export interface ProductListItem {
  id: string;
  sku: string;
  name: string;
  nameTh: string;
  category: ProductCategory;
  series?: string;
  basePrice: number;
  thumbnailUrl: string; // รูปภาพหลัก
  rating?: number;
  badges: ProductBadge[];
  stockStatus: StockStatus;
  isConfigurable: boolean;
}

// Configuration ที่ลูกค้าเลือก
export interface ProductConfiguration {
  width?: number; // ความกว้าง (ซม.)
  height?: number; // ความสูง (ซม.)
  colorId: string; // ID ของสีที่เลือก
  glassTypeId?: string; // ID ของกระจกที่เลือก
  materialId?: string; // ID ของวัสดุที่เลือก
  quantity: number; // จำนวน
  additionalOptions?: Record<string, string>; // ตัวเลือกเพิ่มเติม
}

// สินค้าพร้อม configuration (สำหรับตะกร้า/คำสั่งซื้อ)
export interface ConfiguredProduct {
  product: Product;
  configuration: ProductConfiguration;
  calculatedPrice: number; // ราคาหลังคำนวณ
  priceBreakdown?: {
    basePrice: number;
    sizeModifier: number;
    colorModifier: number;
    glassModifier: number;
    total: number;
  };
}
