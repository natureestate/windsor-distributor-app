/**
 * Order Types สำหรับ WINDSOR Distributor App
 * จัดการคำสั่งซื้อ, การชำระเงิน, และการจัดส่ง
 */

import { ProductConfiguration } from "./product";

// สถานะคำสั่งซื้อ
export type OrderStatus =
  | "pending_payment" // รอชำระเงิน
  | "payment_confirmed" // ชำระเงินแล้ว
  | "processing" // กำลังดำเนินการ
  | "manufacturing" // กำลังผลิต (สำหรับ custom-made)
  | "quality_check" // ตรวจสอบคุณภาพ
  | "ready_to_ship" // พร้อมจัดส่ง
  | "shipped" // จัดส่งแล้ว
  | "delivered" // ส่งถึงแล้ว
  | "completed" // เสร็จสิ้น
  | "cancelled" // ยกเลิก
  | "refunded"; // คืนเงินแล้ว

// วิธีการชำระเงิน
export type PaymentMethod =
  | "credit_card" // บัตรเครดิต/เดบิต
  | "promptpay" // QR PromptPay
  | "bank_transfer" // โอนเงินธนาคาร
  | "installment"; // ผ่อนชำระ

// สถานะการชำระเงิน
export type PaymentStatus =
  | "pending" // รอชำระ
  | "processing" // กำลังดำเนินการ
  | "completed" // ชำระแล้ว
  | "failed" // ล้มเหลว
  | "refunded"; // คืนเงินแล้ว

// ที่อยู่จัดส่ง
export interface ShippingAddress {
  id: string;
  label?: string; // ป้ายกำกับ เช่น "บ้าน", "ที่ทำงาน"
  recipientName: string; // ชื่อผู้รับ
  phoneNumber: string;
  addressLine1: string; // ที่อยู่บรรทัด 1
  addressLine2?: string; // ที่อยู่บรรทัด 2
  subDistrict: string; // แขวง/ตำบล
  district: string; // เขต/อำเภอ
  province: string; // จังหวัด
  postalCode: string; // รหัสไปรษณีย์
  country: string; // ประเทศ (default: Thailand)
  isDefault?: boolean;
  notes?: string; // หมายเหตุเพิ่มเติม
}

// รายการสินค้าในคำสั่งซื้อ (Denormalized)
export interface OrderItem {
  id: string;
  productId: string;
  // Snapshot ของสินค้า ณ เวลาสั่งซื้อ (สำคัญมากสำหรับ NoSQL)
  productSnapshot: {
    name: string;
    nameTh: string;
    sku: string;
    thumbnailUrl: string;
    priceAtOrder: number; // ราคา ณ เวลาสั่งซื้อ
  };
  configuration: ProductConfiguration;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// ข้อมูลการชำระเงิน
export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string; // รหัสธุรกรรม
  paidAmount?: number;
  paidAt?: Date;
  cardLast4?: string; // 4 หลักสุดท้ายของบัตร
  bankName?: string; // ชื่อธนาคาร (สำหรับโอนเงิน)
  slipUrl?: string; // URL สลิปการโอนเงิน
}

// ข้อมูลการจัดส่ง
export interface ShippingInfo {
  address: ShippingAddress;
  method: string; // วิธีการจัดส่ง
  trackingNumber?: string; // เลขพัสดุ
  carrier?: string; // บริษัทขนส่ง เช่น "Kerry Express"
  estimatedDelivery?: Date; // วันที่คาดว่าจะได้รับ
  shippedAt?: Date;
  deliveredAt?: Date;
  shippingCost: number;
}

// Timeline event ของคำสั่งซื้อ
export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: Date;
  description?: string;
  updatedBy?: string; // User ID ของผู้อัปเดต
}

// คำสั่งซื้อหลัก
export interface Order {
  id: string;
  orderNumber: string; // เลขที่คำสั่งซื้อ เช่น "ORD-2023-088"
  userId: string;
  // Denormalized user info
  userSnapshot: {
    displayName: string;
    email: string;
    phoneNumber?: string;
  };
  items: OrderItem[];
  status: OrderStatus;
  payment: PaymentInfo;
  shipping: ShippingInfo;
  // สรุปราคา
  pricing: {
    subtotal: number;
    discount: number;
    discountCode?: string;
    shippingCost: number;
    vat: number;
    total: number;
  };
  // Timeline การเปลี่ยนแปลงสถานะ
  timeline: OrderTimelineEvent[];
  notes?: string; // หมายเหตุจากลูกค้า
  adminNotes?: string; // หมายเหตุจาก admin
  // สำหรับสินค้า custom-made
  estimatedProductionDays?: number;
  productionStartDate?: Date;
  productionEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Order สำหรับแสดงในรายการ (ข้อมูลย่อ)
export interface OrderListItem {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  itemCount: number;
  firstItemThumbnail: string; // รูปสินค้าชิ้นแรก
  firstItemName: string;
  carrier?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  createdAt: Date;
}

// Filter สำหรับค้นหาคำสั่งซื้อ
export interface OrderFilter {
  status?: OrderStatus[];
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string; // ค้นหาจาก order number หรือชื่อสินค้า
}
