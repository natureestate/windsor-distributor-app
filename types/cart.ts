/**
 * Cart Types สำหรับ WINDSOR Distributor App
 * จัดการตะกร้าสินค้าและรายการสั่งซื้อ
 */

import { Product, ProductConfiguration, ConfiguredProduct } from "./product";

// รายการในตะกร้า
export interface CartItem {
  id: string; // unique ID ของรายการในตะกร้า
  productId: string; // ID ของสินค้า
  productSnapshot: {
    // Snapshot ของสินค้า ณ เวลาที่เพิ่มลงตะกร้า
    name: string;
    nameTh: string;
    sku: string;
    thumbnailUrl: string;
    basePrice: number;
  };
  configuration: ProductConfiguration;
  quantity: number;
  unitPrice: number; // ราคาต่อหน่วย (หลังคำนวณ)
  totalPrice: number; // ราคารวม (unitPrice * quantity)
  addedAt: Date;
  updatedAt: Date;
}

// สรุปราคาตะกร้า
export interface CartSummary {
  subtotal: number; // ยอดรวมก่อนส่วนลด
  discount: number; // ส่วนลด
  discountCode?: string; // รหัสส่วนลดที่ใช้
  shipping: number; // ค่าจัดส่ง (0 = คำนวณภายหลัง)
  vat: number; // ภาษีมูลค่าเพิ่ม 7%
  total: number; // ยอดรวมสุทธิ
  itemCount: number; // จำนวนรายการ
  totalQuantity: number; // จำนวนสินค้าทั้งหมด
}

// ตะกร้าสินค้า
export interface Cart {
  id: string;
  userId?: string; // อาจเป็น guest cart
  items: CartItem[];
  summary: CartSummary;
  appliedDiscountCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

// รหัสส่วนลด
export interface DiscountCode {
  code: string;
  type: "percentage" | "fixed"; // ส่วนลดเป็น % หรือจำนวนเงิน
  value: number; // ค่าส่วนลด
  minOrderAmount?: number; // ยอดขั้นต่ำที่ใช้ได้
  maxDiscount?: number; // ส่วนลดสูงสุด (สำหรับ percentage)
  validFrom: Date;
  validTo: Date;
  usageLimit?: number; // จำกัดจำนวนครั้งที่ใช้ได้
  usedCount: number; // จำนวนครั้งที่ใช้แล้ว
  isActive: boolean;
}

// Actions สำหรับจัดการตะกร้า
export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { itemId: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { itemId: string; quantity: number };
    }
  | { type: "APPLY_DISCOUNT"; payload: { code: string; discount: number } }
  | { type: "REMOVE_DISCOUNT" }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: Cart };
