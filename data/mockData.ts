/**
 * Mock Data สำหรับ WINDSOR Distributor App
 * ข้อมูลตัวอย่างครบทุกหน้าจอตาม design reference
 */

import {
  Product,
  ProductListItem,
  ColorOption,
  GlassOption,
  ProductCategory,
} from "../types/product";
import { Cart, CartItem, DiscountCode } from "../types/cart";
import { Order, OrderListItem, ShippingAddress } from "../types/order";
import { UserProfile } from "../types/user";

// =============================================================================
// CATEGORIES - หมวดหมู่สินค้า
// =============================================================================

export interface Category {
  id: ProductCategory;
  name: string;
  nameTh: string;
  icon: string; // Material Symbols icon name
  productCount: number;
}

export const mockCategories: Category[] = [
  {
    id: "window",
    name: "Windows",
    nameTh: "หน้าต่าง",
    icon: "window",
    productCount: 24,
  },
  {
    id: "door",
    name: "Doors",
    nameTh: "ประตู",
    icon: "door_sliding",
    productCount: 18,
  },
  {
    id: "vinyl",
    name: "Vinyl",
    nameTh: "ไวนิล",
    icon: "grid_view",
    productCount: 12,
  },
  {
    id: "screen",
    name: "Screens",
    nameTh: "มุ้งลวด",
    icon: "pest_control",
    productCount: 8,
  },
  {
    id: "accessory",
    name: "Accessories",
    nameTh: "อุปกรณ์เสริม",
    icon: "handyman",
    productCount: 32,
  },
];

// =============================================================================
// COLOR OPTIONS - ตัวเลือกสี
// =============================================================================

export const mockColorOptions: ColorOption[] = [
  {
    id: "white",
    name: "White",
    nameTh: "ขาว",
    hexCode: "#FFFFFF",
    priceModifier: 0,
  },
  {
    id: "black",
    name: "Black",
    nameTh: "ดำ",
    hexCode: "#1a1a1a",
    priceModifier: 500,
  },
  {
    id: "teak",
    name: "Teak Wood",
    nameTh: "ไม้สัก",
    hexCode: "#8D6E63",
    priceModifier: 1500,
  },
  {
    id: "silver",
    name: "Silver",
    nameTh: "เงิน",
    hexCode: "#C0C0C0",
    priceModifier: 300,
  },
  {
    id: "bronze",
    name: "Bronze",
    nameTh: "บรอนซ์",
    hexCode: "#CD7F32",
    priceModifier: 800,
  },
];

// =============================================================================
// GLASS OPTIONS - ตัวเลือกกระจก
// priceModifier = ราคาเพิ่มต่อตารางเมตร (บาท/ตร.ม.)
// =============================================================================

export const mockGlassOptions: GlassOption[] = [
  {
    id: "clear-5mm",
    name: "Clear Glass 5mm",
    nameTh: "กระจกใส 5 มม.",
    description: "กระจกใสมาตรฐาน ความหนา 5 มม.",
    priceModifier: 0, // ราคาพื้นฐาน
  },
  {
    id: "clear-6mm",
    name: "Clear Glass 6mm",
    nameTh: "กระจกใส 6 มม.",
    description: "กระจกใสมาตรฐาน ความหนา 6 มม.",
    priceModifier: 150, // +150 บาท/ตร.ม.
  },
  {
    id: "frosted",
    name: "Frosted Glass",
    nameTh: "กระจกฝ้า",
    description: "กระจกฝ้าพ่นทราย กันการมองทะลุ",
    priceModifier: 350, // +350 บาท/ตร.ม.
  },
  {
    id: "tinted-green",
    name: "Tinted Glass - Green",
    nameTh: "กระจกสีเขียว",
    description: "กระจกสีเขียวตัดแสง ลดความร้อน 30%",
    priceModifier: 400, // +400 บาท/ตร.ม.
  },
  {
    id: "tinted-grey",
    name: "Tinted Glass - Grey",
    nameTh: "กระจกสีเทา",
    description: "กระจกสีเทาควัน ลดความร้อน 35%",
    priceModifier: 400, // +400 บาท/ตร.ม.
  },
  {
    id: "tinted-bronze",
    name: "Tinted Glass - Bronze",
    nameTh: "กระจกสีชา",
    description: "กระจกสีชาบรอนซ์ ลดความร้อน 40%",
    priceModifier: 450, // +450 บาท/ตร.ม.
  },
  {
    id: "tinted-blue",
    name: "Tinted Glass - Blue",
    nameTh: "กระจกสีฟ้า",
    description: "กระจกสีฟ้าน้ำทะเล สวยงามทันสมัย",
    priceModifier: 500, // +500 บาท/ตร.ม.
  },
  {
    id: "tempered-5mm",
    name: "Tempered Glass 5mm",
    nameTh: "กระจกเทมเปอร์ 5 มม.",
    description: "กระจกนิรภัย แข็งแรงกว่าปกติ 5 เท่า",
    priceModifier: 650, // +650 บาท/ตร.ม.
  },
  {
    id: "tempered-6mm",
    name: "Tempered Glass 6mm",
    nameTh: "กระจกเทมเปอร์ 6 มม.",
    description: "กระจกนิรภัย แข็งแรงกว่าปกติ 5 เท่า หนา 6 มม.",
    priceModifier: 800, // +800 บาท/ตร.ม.
  },
  {
    id: "laminated",
    name: "Laminated Glass",
    nameTh: "กระจกลามิเนต",
    description: "กระจกลามิเนต 2 ชั้น ปลอดภัยสูงสุด ไม่แตกกระจาย",
    priceModifier: 1200, // +1,200 บาท/ตร.ม.
  },
  {
    id: "double-glazed",
    name: "Double Glazed (IGU)",
    nameTh: "กระจก 2 ชั้น (IGU)",
    description: "กระจก 2 ชั้นสุญญากาศ กันเสียง กันความร้อนดีเยี่ยม",
    priceModifier: 1800, // +1,800 บาท/ตร.ม.
  },
  {
    id: "low-e",
    name: "Low-E Glass",
    nameTh: "กระจก Low-E",
    description: "กระจกเคลือบ Low-E กันความร้อนสูงสุด ประหยัดพลังงาน",
    priceModifier: 2500, // +2,500 บาท/ตร.ม.
  },
];

// =============================================================================
// PRODUCTS - สินค้าทั้งหมด
// =============================================================================

export const mockProducts: Product[] = [
  // 1. Signature Sliding Door - Best Seller
  {
    id: "prod-001",
    sku: "WIN-SLD-8842",
    name: "Signature Sliding Door",
    nameTh: "ประตูบานเลื่อน Signature",
    category: "door",
    series: "Series 500",
    basePrice: 12500,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBohsAl5AJFSyOXenWneWa8G4zeKD-bYQiOsT6IVFTyb099-gax8rCUIfM_HNQ2H2Z4KnBXmQ6g2hPgX5_ZmgcQWt84mHn8PPmcaInb92QPB51_p9awuQQw7UU2klFGP859Ucub3nBbTTXYt8-XVK_Mj67KNYrwMZsjZm5ke2d6j9i1bpe0SAtjyHBjH4wV6kX1GlabkbqTjvfNavJ4au4Wkdh7Dog2SZx2Zsl54vEofrTcHPdkH1nvaG7bABIeLW3s6ZMhZ9O8ibop",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2_jGzVP0pQi-ZBH-mqceYgA15z3HsiPahBVgpNOcqa9NW02MZvUlxN17ekSXT5kgME2Q3BSXyZf9WG8in5oXzAnWI3kDdxjrBpszXAuRSe9ZVzvqUlK5-XeXwrM8hfHe2FPWMaHRR1_IRvzYui7U7982ln2l5pVUJ85hc9iJ3XqV1Lp9Q1cLeyaNvdqGFMI4CoRBGogn6vuw4GynV6rMn9LsumqyjzsRZquEf6l61lColeGgbi4ZL072D36cqrJvyEh__J12lcSIP",
    ],
    rating: 4.8,
    reviewCount: 156,
    badges: ["best-seller"],
    description:
      "Experience seamless indoor-outdoor living with the WINDSOR Signature Sliding Door. Engineered with high-quality vinyl material, it offers superior noise reduction technology and thermal insulation.",
    descriptionTh:
      "สัมผัสประสบการณ์การใช้ชีวิตทั้งภายในและภายนอกอย่างไร้รอยต่อกับประตูบานเลื่อน WINDSOR Signature ผลิตจากวัสดุไวนิลคุณภาพสูง ช่วยลดเสียงรบกวนและเป็นฉนวนกันความร้อนได้ดีเยี่ยม",
    features: ["Noise Reduction", "UV Protection", "High Security", "Waterproof"],
    featuresTh: ["ลดเสียงรบกวน", "กันรังสี UV", "ปลอดภัยสูง", "กันน้ำ"],
    specs: {
      material: "Premium uPVC",
      warranty: "10 Years Limited",
      glassType: "Double Glazed Tempered",
      frameThickness: "60mm",
      soundReduction: "32 dB",
    },
    constraints: {
      width: { min: 120, max: 400, step: 10 },
      height: { min: 180, max: 280, step: 10 },
      colors: mockColorOptions,
      glassTypes: mockGlassOptions,
    },
    stockStatus: "in-stock",
    isConfigurable: true,
    leadTimeDays: 14,
  },

  // 2. Premier Casement Window - Eco
  {
    id: "prod-002",
    sku: "WIN-CSM-3301",
    name: "Premier Casement Window",
    nameTh: "หน้าต่างบานเปิด Premier",
    category: "window",
    series: "Series 300",
    basePrice: 8900,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7uxA8VXZpVSsC-I7x5vEUYq2gYvXtwI9z3g0YiFSqB0QjmAi2SCBjWBwzAdPT1Vdb-9hCbiWAO4rUpcHyKiLJjj8XhCiqEXFhfeJid3WXqm2tCB50Zywmkz5rMPfk6ATwq7ZE3-jF7XwRlfrxhKPyXWjRdv7cTsuNpvVhoTAmEor7l1RE-OjE4j28Jax6TKP6YZGftNGlZTwtvESPkrUt0NXuFCj6-RGPO_PLZYQLO8WiuvcoDenp8JLopXBWP9-S6wA86ZVGA3XA",
    ],
    rating: 4.6,
    reviewCount: 89,
    badges: ["eco"],
    description:
      "Energy efficient casement window with double glazed glass for superior thermal insulation.",
    descriptionTh: "หน้าต่างบานเปิดประหยัดพลังงาน พร้อมกระจก 2 ชั้น เป็นฉนวนกันความร้อนได้ดีเยี่ยม",
    features: ["Energy Efficient", "Double Glazed", "Easy Clean", "Ventilation"],
    featuresTh: ["ประหยัดพลังงาน", "กระจก 2 ชั้น", "ทำความสะอาดง่าย", "ระบายอากาศดี"],
    specs: {
      material: "Aluminum",
      warranty: "5 Years",
      glassType: "Single Pane",
      frameThickness: "45mm",
    },
    constraints: {
      width: { min: 60, max: 180, step: 5 },
      height: { min: 60, max: 180, step: 5 },
      colors: mockColorOptions.slice(0, 3),
      glassTypes: mockGlassOptions.slice(0, 3),
    },
    stockStatus: "in-stock",
    isConfigurable: true,
    leadTimeDays: 7,
  },

  // 3. Grand Entrance Door - New Arrival
  {
    id: "prod-003",
    sku: "WIN-ENT-5501",
    name: "Grand Entrance Door",
    nameTh: "ประตูทางเข้า Grand",
    category: "door",
    series: "Premium Collection",
    basePrice: 15000,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBErZR8CHQW5eyiCbjZJ8qdstSfHGIUzwl50Zr0whX0_-r6nFg-qSsxSq4V1Ljwk7OJ_mYqZLd7XXqEcTWXghPgDQ80aP7KqfvhYXAP69plsokMpSEFkzPvSMkiiEwLjaQ3rguPVenEzPCl1A3ZjkzWJocxNze8YKj6RM4h2PaFNUq45sllVP7io0-u1N1n-GiZH4GeNd3QX9kRxPcGkTc4Fy9kUSwg3oKMe43fQYEdVZq2pRNE3r3XFU785LZGEixpLP6jr_pIjT3Y",
    ],
    rating: 4.9,
    reviewCount: 42,
    badges: ["new"],
    description:
      "Make a statement with our Grand Entrance Door. Solid wood construction with smart lock ready technology.",
    descriptionTh:
      "สร้างความประทับใจแรกพบด้วยประตูทางเข้า Grand ผลิตจากไม้แท้ พร้อมรองรับระบบล็อคอัจฉริยะ",
    features: ["Solid Wood", "Smart Lock Ready", "Weather Resistant", "Premium Finish"],
    featuresTh: ["ไม้แท้", "รองรับ Smart Lock", "กันสภาพอากาศ", "สีสันพรีเมียม"],
    specs: {
      material: "Solid Wood",
      warranty: "15 Years",
      glassType: "Decorative Glass Panel",
      frameThickness: "80mm",
    },
    constraints: {
      width: { min: 80, max: 120, step: 5 },
      height: { min: 200, max: 240, step: 5 },
      colors: mockColorOptions.slice(2, 5),
      glassTypes: mockGlassOptions.slice(0, 2),
    },
    stockStatus: "pre-order",
    isConfigurable: true,
    leadTimeDays: 21,
  },

  // 4. Awning Window
  {
    id: "prod-004",
    sku: "WIN-AWN-5501",
    name: "Awning Window",
    nameTh: "หน้าต่างบานกระทุ้ง",
    category: "window",
    series: "Series 500",
    basePrice: 5500,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBP7_RIhUvx5kp5qnUkvRbFhOLpRSSKtMlMnH2dAyOnD9Xm1aPPVpK9a2Zj6gUnsawXa0xOptUD-7l3K86oRDVE6NQu8NTO_DXNBezPqM345f_OowTHU9OGmbyB5UwEMlVWU0JfNibObz72B73VxDZd0rrNYgx7OfG2wf5Ugu5Pcwim9nQhEWg-ZG_3jUYtHbpznZZPX-XpsU7ljaF-CCZhdmiOJVVQrzeBK8FcgmoCP_GGNktCV78goGlQhrUbEjRdRl9ts7iu0wG2",
    ],
    rating: 4.5,
    reviewCount: 67,
    badges: [],
    description: "Top-hinged awning window perfect for ventilation while keeping rain out.",
    descriptionTh: "หน้าต่างบานกระทุ้งเปิดด้านบน เหมาะสำหรับระบายอากาศโดยไม่ให้ฝนเข้า",
    features: ["Top Hinged", "Rain Protection", "Easy Operation", "Compact Design"],
    featuresTh: ["เปิดด้านบน", "กันฝน", "ใช้งานง่าย", "ดีไซน์กะทัดรัด"],
    specs: {
      material: "Vinyl",
      warranty: "5 Years",
      glassType: "Clear Tempered",
    },
    constraints: {
      width: { min: 40, max: 120, step: 5 },
      height: { min: 40, max: 80, step: 5 },
      colors: mockColorOptions.slice(0, 2),
      glassTypes: mockGlassOptions.slice(0, 3),
    },
    stockStatus: "in-stock",
    isConfigurable: true,
    leadTimeDays: 5,
  },

  // 5. Heavy Duty Handle - Accessory
  {
    id: "prod-005",
    sku: "ACC-HDL-1201",
    name: "Heavy Duty Handle",
    nameTh: "มือจับ Heavy Duty",
    category: "accessory",
    basePrice: 1200,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAN8uK_UrtYRU2mOI8Ulf0umb5B7jRMD7vAw5zqIlAjOehfcv7_Y9mqIgLZuvqxGFLzl1dp5v6RhAmSlqd8j72AkEU60sVC_weyc99h49bUH_urHYPQa7k9KFK2bgI0-F-GvJ-d-xgmHIxE3HmZXBxd5rjlOl_rP0tVUzr1_d7XvRPlwVXLUxlsVBUF2OoAYqiIi5Gy0CYDi96VeUjgmsbgiWbtZfFjT7T0u1FuLRwP0USbXGB0Ja6K84d53uk9JonVsswq0SF5hnM",
    ],
    rating: 4.7,
    reviewCount: 234,
    badges: [],
    description: "Ergonomic stainless steel handle designed for heavy-duty use.",
    descriptionTh: "มือจับสแตนเลสออกแบบตามหลักสรีรศาสตร์ ทนทานสำหรับการใช้งานหนัก",
    features: ["Stainless Steel", "Ergonomic", "Corrosion Resistant"],
    featuresTh: ["สแตนเลส", "ตามหลักสรีรศาสตร์", "กันสนิม"],
    specs: {
      material: "Stainless Steel",
      warranty: "2 Years",
    },
    stockStatus: "in-stock",
    isConfigurable: false,
  },

  // 6. Vinyl Siding
  {
    id: "prod-006",
    sku: "VNL-SDG-002",
    name: "Vinyl Siding (White)",
    nameTh: "ไวนิลไซดิ้ง (ขาว)",
    category: "vinyl",
    basePrice: 1200,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjVE3tWcEkZQNRzXF-Bw_Xxqk7peePdV7flDSigSie3b3E472VE4dR5zoiCUB0tHR6D7Y2qpkiAXScnwDC3VtW_M4Bt53ORunFnbBPoSYgg8YRr1-m1uKEYmn39_eOtbaUl9TYDND8ToTQzJ1DJnMU8esIgnl4P9GJzMXlEJM3ObzIt7fGfA6qkJ6QR6xICN2YlFbfquQK_raJ7U11DBUud_Nb3d79jfoBtxzPe4Ag44-kX3OffKRb5wAd0o6rC2Bcg9PNtRWIIXGe",
    ],
    rating: 4.4,
    reviewCount: 89,
    badges: [],
    description: "Premium vinyl siding, 3m length. Perfect for exterior cladding.",
    descriptionTh: "ไวนิลไซดิ้งพรีเมียม ยาว 3 เมตร เหมาะสำหรับหุ้มผนังภายนอก",
    features: ["Weather Resistant", "Easy Install", "Low Maintenance"],
    featuresTh: ["กันสภาพอากาศ", "ติดตั้งง่าย", "บำรุงรักษาน้อย"],
    specs: {
      material: "PVC Vinyl",
      warranty: "10 Years",
      length: "3m",
    },
    stockStatus: "pre-order",
    isConfigurable: false,
    leadTimeDays: 7,
  },

  // 7. Sliding Window - Smart Series (Thai UI in configurator)
  {
    id: "prod-007",
    sku: "WIN-SLD-SMT-001",
    name: "Smart Sliding Window",
    nameTh: "หน้าต่างบานเลื่อน สลับ",
    category: "window",
    series: "Smart Series",
    basePrice: 12500,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2bRbbPQ2r6FU3cgz193OamrVudk0ke8m-TZz1zJAvQkd79LjmdbJaj1sHoPhe7RKlaGN2dK_GB1saqPVvs47Ryg11sSQr45_c430QnaNr7d9ctG5M1JEVYDp_frz8UkDr252P1DOYA8Q-mQyBnAZPg7n_COhbsqTVQ9CrSOKUlH7g8VdNRNo0QV4V1SgRXmJveZ218gOVMnXOUovriAl0ROWDXqw3Y2UBio8VNa7ca8HDYNTKyeRH4Ge4_6wVmdDD7FOf0biJKSjD",
    ],
    rating: 4.8,
    reviewCount: 112,
    badges: ["best-seller"],
    description: "Modern sliding window with smooth operation and excellent insulation.",
    descriptionTh: "หน้าต่างบานเลื่อนทันสมัย เลื่อนลื่น เป็นฉนวนกันความร้อนดีเยี่ยม",
    features: ["Smooth Sliding", "Energy Efficient", "Modern Design"],
    featuresTh: ["เลื่อนลื่น", "ประหยัดพลังงาน", "ดีไซน์ทันสมัย"],
    specs: {
      material: "Premium uPVC",
      warranty: "10 Years",
      glassType: "Double Glazed",
    },
    constraints: {
      width: { min: 50, max: 240, step: 5 },
      height: { min: 40, max: 200, step: 5 },
      colors: mockColorOptions,
      glassTypes: mockGlassOptions,
    },
    stockStatus: "in-stock",
    isConfigurable: true,
    leadTimeDays: 14,
  },

  // 8. Double Hung Window
  {
    id: "prod-008",
    sku: "WIN-DBH-001",
    name: "Double Hung Smart",
    nameTh: "หน้าต่างบานเลื่อนขึ้น-ลง",
    category: "window",
    basePrice: 6800,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzL3Qm518ZqjpBBS_BCWTIwN42__kwejwgWNbgJZCHE0fx-IcaOZnfcecq4uWa455o3HtUsIKl5zHVKSOwaGlHPZ44rnuc5PQuHmADbEANh0VLItNtnM0xRNiXHQhRaItiM6iTrGl0p-96k3CJmHr2TzHUtv8typpTY2lQMd1Z8LsvNAsTuFf9vzbYL3tlTn5QTje7zugWD914ujCH47kLAMOspq9N8KXqqJuHMZsud6BjpmP59cf0lFA01DGAzDBEZm0I2RzxfdcI",
    ],
    rating: 4.5,
    reviewCount: 78,
    badges: [],
    description: "Classic double hung window with modern features.",
    descriptionTh: "หน้าต่างบานเลื่อนขึ้น-ลง สไตล์คลาสสิก พร้อมฟีเจอร์ทันสมัย",
    features: ["Tilt-in Sash", "Easy Clean", "Traditional Style"],
    featuresTh: ["บานพับเข้า", "ทำความสะอาดง่าย", "สไตล์ดั้งเดิม"],
    specs: {
      material: "Vinyl",
      warranty: "5 Years",
    },
    stockStatus: "in-stock",
    isConfigurable: true,
    leadTimeDays: 7,
  },

  // 9. Fixed Picture Window
  {
    id: "prod-009",
    sku: "WIN-FIX-001",
    name: "Fixed Picture View",
    nameTh: "หน้าต่างบานตายชมวิว",
    category: "window",
    basePrice: 8500,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNq9n_v3bCZrKNiQ1uEAkm8kssXH6kZa-DEudaPslq3jX6nIdniP2KxyQmaFfIydXxvq-KcKp79yFzOkSDtYfIvJbGSB6B3lf8nANFMh2qPSf1N3cyjvmlDGGtQHAHwN4jGCx-2AVzjhMnmw8_ny-81aVOzdxx-Er9b6cy9EzFh0LhMBmJfK_COtkNrHiAI8HWUAYICzWP1fQwHhEVq1BaUN9ho6Ei_wX_XlbhYe9FFa2kem9ykhBqnwEUQOzpCk1NSGr-EB9qxA30",
    ],
    rating: 4.7,
    reviewCount: 56,
    badges: [],
    description: "Large fixed window for maximum natural light and unobstructed views.",
    descriptionTh: "หน้าต่างบานตายขนาดใหญ่ รับแสงธรรมชาติเต็มที่ ชมวิวได้ไม่มีสิ่งกีดขวาง",
    features: ["Maximum Light", "Panoramic View", "Energy Efficient"],
    featuresTh: ["รับแสงเต็มที่", "วิวพาโนรามา", "ประหยัดพลังงาน"],
    specs: {
      material: "Aluminum",
      warranty: "10 Years",
      glassType: "Low-E Glass",
    },
    stockStatus: "in-stock",
    isConfigurable: true,
    leadTimeDays: 10,
  },

  // 10. Smart Slide Accessories
  {
    id: "prod-010",
    sku: "ACC-SMS-001",
    name: "Smart Slide Accessories",
    nameTh: "อุปกรณ์บานเลื่อน Smart Slide",
    category: "accessory",
    basePrice: 3125,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHtn5tQhJ8NkLKIKc3qdtzJXP0HJukpex-1G49PQ6tIOv5BVvDogW7I-uckMQf2TR8HvWFn1Kk4W-9bLAU4-brLPQDuoHuHQko_1w9CqBpA8ktidsooWXeYwqBLM3xvH0QzLFeF3HRofrxKtBojpz36tl5rXlEnesxCFkBhzVFGy7IbkTyqEHnTydpn5l97QOo77mDDlDXy0UUMclLPQvmDUfU9SX5lVy-aPz6r9qsXFhD_if7d1jA0QqXcotF0bCM0h0f90jPIKHF",
    ],
    rating: 4.6,
    reviewCount: 45,
    badges: [],
    description: "Complete handle and lock set for sliding doors.",
    descriptionTh: "ชุดมือจับและกุญแจล็อคครบชุดสำหรับประตูบานเลื่อน",
    features: ["Complete Set", "Matte Black", "Smooth Operation"],
    featuresTh: ["ครบชุด", "สีดำด้าน", "ใช้งานลื่น"],
    specs: {
      material: "Zinc Alloy",
      warranty: "2 Years",
      finish: "Matte Black",
    },
    stockStatus: "in-stock",
    isConfigurable: false,
  },
];

// =============================================================================
// PRODUCT LIST ITEMS - สำหรับแสดงในรายการ
// =============================================================================

export const mockProductListItems: ProductListItem[] = mockProducts.map((p) => ({
  id: p.id,
  sku: p.sku,
  name: p.name,
  nameTh: p.nameTh,
  category: p.category,
  series: p.series,
  basePrice: p.basePrice,
  thumbnailUrl: p.images[0],
  rating: p.rating,
  badges: p.badges,
  stockStatus: p.stockStatus,
  isConfigurable: p.isConfigurable,
}));

// =============================================================================
// PROMO BANNERS - แบนเนอร์โปรโมชั่น
// =============================================================================

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  badge?: string;
  badgeColor?: string;
  link: string;
}

export const mockPromoBanners: PromoBanner[] = [
  {
    id: "promo-1",
    title: "Summer Sale",
    subtitle: "Get 15% off all Sliding Systems this month.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCsWjXREw1JBxTV8WZYUlkjf-5m5Nml6LHD5J-PE7PaHg_ngqbPznjQj6CuyvVFKJaeG5GBPMmXZAbqCM5sw0-CbSYHbTIeoL1ehJkLR0Eo8HSELqSMqgOaGgIJzjcSqqXjt61TnNbsLYJLT-PZrjOAHSu3PQ5vOg_h8gPLifripZRmIUcsNpZcmJq7wjwfjoey_aI_wXR5rk4tRKr5SrBO1KwWh2YB66XjImug7eoKc70CIcwxGGZ4aFDAetIApcc1EH4ApxWTxLE",
    badge: "PROMO",
    badgeColor: "primary",
    link: "/catalog?promo=summer-sale",
  },
  {
    id: "promo-2",
    title: "Smart Lock Series",
    subtitle: "Secure your home with new tech.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAD9Rjp_3n9OQtvVS6ziit2Ac05lJR7Mo9BpxbH9p8ZyfX8Qi8t447NjyNgMrewcmAyoAxdkRT9swjWUEs9-J4yO0UGb0xmtuahoUJQjom_Mg7NMW6k0A8lm9W-ptXFTl4QBanSr9V-tkAzEvj3m3-ovqUfG0TydkgfRsp8YrfpOiaSBYaPFiF1TZyzIfJz42Ko9pyAPgmyUhPeI_DicOI8-VzA1f9BFzoKXjLyqme8VB1aJo1fGcTlwK5JGf3h6QG8dvvKq_XR3j1R",
    badge: "NEW",
    badgeColor: "white",
    link: "/catalog?category=accessory&tag=smart-lock",
  },
  {
    id: "promo-3",
    title: "Premium Window Collection",
    subtitle: "ฟรีค่าติดตั้งเมื่อซื้อครบ 50,000 บาท",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7uxA8VXZpVSsC-I7x5vEUYq2gYvXtwI9z3g0YiFSqB0QjmAi2SCBjWBwzAdPT1Vdb-9hCbiWAO4rUpcHyKiLJjj8XhCiqEXFhfeJid3WXqm2tCB50Zywmkz5rMPfk6ATwq7ZE3-jF7XwRlfrxhKPyXWjRdv7cTsuNpvVhoTAmEor7l1RE-OjE4j28Jax6TKP6YZGftNGlZTwtvESPkrUt0NXuFCj6-RGPO_PLZYQLO8WiuvcoDenp8JLopXBWP9-S6wA86ZVGA3XA",
    badge: "HOT",
    badgeColor: "primary",
    link: "/catalog?category=window",
  },
  {
    id: "promo-4",
    title: "Year End Clearance",
    subtitle: "ลดสูงสุด 30% สินค้าคัดสรร",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBErZR8CHQW5eyiCbjZJ8qdstSfHGIUzwl50Zr0whX0_-r6nFg-qSsxSq4V1Ljwk7OJ_mYqZLd7XXqEcTWXghPgDQ80aP7KqfvhYXAP69plsokMpSEFkzPvSMkiiEwLjaQ3rguPVenEzPCl1A3ZjkzWJocxNze8YKj6RM4h2PaFNUq45sllVP7io0-u1N1n-GiZH4GeNd3QX9kRxPcGkTc4Fy9kUSwg3oKMe43fQYEdVZq2pRNE3r3XFU785LZGEixpLP6jr_pIjT3Y",
    badge: "SALE",
    badgeColor: "white",
    link: "/catalog?filter=clearance",
  },
];

// =============================================================================
// CART - ตะกร้าสินค้าตัวอย่าง
// =============================================================================

export const mockCartItems: CartItem[] = [
  {
    id: "cart-item-1",
    productId: "prod-001",
    productSnapshot: {
      name: "WINDSOR Signature Window",
      nameTh: "หน้าต่าง WINDSOR Signature",
      sku: "WIN-SLD-8842",
      thumbnailUrl: mockProducts[0].images[0],
      basePrice: 5000,
    },
    configuration: {
      width: 120,
      height: 200,
      colorId: "white",
      glassTypeId: "double",
      quantity: 2,
    },
    quantity: 2,
    unitPrice: 5000,
    totalPrice: 10000,
    addedAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "cart-item-2",
    productId: "prod-006",
    productSnapshot: {
      name: "Vinyl Siding (White)",
      nameTh: "ไวนิลไซดิ้ง (ขาว)",
      sku: "VNL-SDG-002",
      thumbnailUrl: mockProducts[5].images[0],
      basePrice: 1200,
    },
    configuration: {
      colorId: "white",
      quantity: 10,
    },
    quantity: 10,
    unitPrice: 1200,
    totalPrice: 12000,
    addedAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
];

export const mockCart: Cart = {
  id: "cart-001",
  userId: "user-001",
  items: mockCartItems,
  summary: {
    subtotal: 22000,
    discount: 0,
    shipping: 0, // คำนวณในขั้นตอนถัดไป
    vat: 1540, // 7%
    total: 23540,
    itemCount: 2,
    totalQuantity: 12,
  },
  createdAt: new Date("2024-01-05"),
  updatedAt: new Date("2024-01-05"),
};

// =============================================================================
// ORDERS - คำสั่งซื้อตัวอย่าง
// =============================================================================

export const mockOrders: Order[] = [
  {
    id: "order-001",
    orderNumber: "ORD-2023-088",
    userId: "user-001",
    userSnapshot: {
      displayName: "สมชาย ใจดี",
      email: "somchai@example.com",
      phoneNumber: "081-234-5678",
    },
    items: [
      {
        id: "item-1",
        productId: "prod-001",
        productSnapshot: {
          name: "WINDSOR Signature Window Set",
          nameTh: "ชุดหน้าต่าง WINDSOR Signature",
          sku: "WIN-SLD-8842",
          thumbnailUrl: mockProducts[0].images[0],
          priceAtOrder: 45000,
        },
        configuration: {
          width: 120,
          height: 120,
          colorId: "white",
          quantity: 1,
        },
        quantity: 1,
        unitPrice: 45000,
        totalPrice: 45000,
      },
    ],
    status: "shipped",
    payment: {
      method: "credit_card",
      status: "completed",
      transactionId: "TXN-123456",
      paidAmount: 45000,
      paidAt: new Date("2024-01-02"),
      cardLast4: "4242",
    },
    shipping: {
      address: {
        id: "addr-1",
        label: "บ้าน",
        recipientName: "สมชาย ใจดี",
        phoneNumber: "081-234-5678",
        addressLine1: "123/45 หมู่บ้านวินด์เซอร์",
        addressLine2: "ถนนสุขุมวิท",
        subDistrict: "คลองตัน",
        district: "วัฒนา",
        province: "กรุงเทพฯ",
        postalCode: "10110",
        country: "Thailand",
        isDefault: true,
      },
      method: "Standard Delivery",
      trackingNumber: "KERRY123456789",
      carrier: "Kerry Express",
      estimatedDelivery: new Date("2024-01-14"),
      shippedAt: new Date("2024-01-10"),
      shippingCost: 0,
    },
    pricing: {
      subtotal: 45000,
      discount: 0,
      shippingCost: 0,
      vat: 3150,
      total: 45000,
    },
    timeline: [
      { status: "pending_payment", timestamp: new Date("2024-01-01") },
      { status: "payment_confirmed", timestamp: new Date("2024-01-02") },
      { status: "processing", timestamp: new Date("2024-01-03") },
      { status: "shipped", timestamp: new Date("2024-01-10") },
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "order-002",
    orderNumber: "ORD-2023-092",
    userId: "user-001",
    userSnapshot: {
      displayName: "สมชาย ใจดี",
      email: "somchai@example.com",
      phoneNumber: "081-234-5678",
    },
    items: [
      {
        id: "item-2",
        productId: "prod-010",
        productSnapshot: {
          name: "Smart Slide Accessories",
          nameTh: "อุปกรณ์บานเลื่อน Smart Slide",
          sku: "ACC-SMS-001",
          thumbnailUrl: mockProducts[9].images[0],
          priceAtOrder: 3125,
        },
        configuration: {
          colorId: "black",
          quantity: 4,
        },
        quantity: 4,
        unitPrice: 3125,
        totalPrice: 12500,
      },
    ],
    status: "processing",
    payment: {
      method: "promptpay",
      status: "completed",
      transactionId: "TXN-789012",
      paidAmount: 12500,
      paidAt: new Date("2024-01-08"),
    },
    shipping: {
      address: {
        id: "addr-1",
        label: "บ้าน",
        recipientName: "สมชาย ใจดี",
        phoneNumber: "081-234-5678",
        addressLine1: "123/45 หมู่บ้านวินด์เซอร์",
        addressLine2: "ถนนสุขุมวิท",
        subDistrict: "คลองตัน",
        district: "วัฒนา",
        province: "กรุงเทพฯ",
        postalCode: "10110",
        country: "Thailand",
        isDefault: true,
      },
      method: "Standard Delivery",
      shippingCost: 0,
    },
    pricing: {
      subtotal: 12500,
      discount: 0,
      shippingCost: 0,
      vat: 875,
      total: 12500,
    },
    timeline: [
      { status: "pending_payment", timestamp: new Date("2024-01-07") },
      { status: "payment_confirmed", timestamp: new Date("2024-01-08") },
      { status: "processing", timestamp: new Date("2024-01-09") },
    ],
    createdAt: new Date("2024-01-07"),
    updatedAt: new Date("2024-01-09"),
  },
  {
    id: "order-003",
    orderNumber: "ORD-2023-095",
    userId: "user-001",
    userSnapshot: {
      displayName: "สมชาย ใจดี",
      email: "somchai@example.com",
      phoneNumber: "081-234-5678",
    },
    items: [
      {
        id: "item-3",
        productId: "prod-006",
        productSnapshot: {
          name: "Vinyl SPC Click Lock",
          nameTh: "พื้นไวนิล SPC Click Lock",
          sku: "VNL-SPC-001",
          thumbnailUrl: mockProducts[5].images[0],
          priceAtOrder: 1445,
        },
        configuration: {
          colorId: "teak",
          quantity: 20,
        },
        quantity: 20,
        unitPrice: 1445,
        totalPrice: 28900,
      },
    ],
    status: "pending_payment",
    payment: {
      method: "bank_transfer",
      status: "pending",
    },
    shipping: {
      address: {
        id: "addr-1",
        label: "บ้าน",
        recipientName: "สมชาย ใจดี",
        phoneNumber: "081-234-5678",
        addressLine1: "123/45 หมู่บ้านวินด์เซอร์",
        addressLine2: "ถนนสุขุมวิท",
        subDistrict: "คลองตัน",
        district: "วัฒนา",
        province: "กรุงเทพฯ",
        postalCode: "10110",
        country: "Thailand",
        isDefault: true,
      },
      method: "Standard Delivery",
      shippingCost: 0,
    },
    pricing: {
      subtotal: 28900,
      discount: 0,
      shippingCost: 0,
      vat: 2023,
      total: 28900,
    },
    timeline: [{ status: "pending_payment", timestamp: new Date("2024-01-10") }],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
];

export const mockOrderListItems: OrderListItem[] = mockOrders.map((o) => ({
  id: o.id,
  orderNumber: o.orderNumber,
  status: o.status,
  totalAmount: o.pricing.total,
  itemCount: o.items.length,
  firstItemThumbnail: o.items[0].productSnapshot.thumbnailUrl,
  firstItemName: o.items[0].productSnapshot.nameTh,
  carrier: o.shipping.carrier,
  trackingNumber: o.shipping.trackingNumber,
  estimatedDelivery: o.shipping.estimatedDelivery,
  createdAt: o.createdAt,
}));

// =============================================================================
// USER - ผู้ใช้งานตัวอย่าง
// =============================================================================

export const mockUser: UserProfile = {
  uid: "user-001",
  email: "somchai@example.com",
  displayName: "Khun Somchai",
  phoneNumber: "081-234-5678",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAY2-7nLQQco9cye174qLQ4Pybovk0i51Aa4RDpHA6YwxwyReMSCt3Ok6PNP6O8MjpXDmHipb92_j5ZkOhF3-YVhBD4TQrg3F7RxA7ez4-lFGSgRb3jjo8I7m8S5_ygZPz69Y8805mq_jEO3CKUgvJ262Z49QTOBrHVaVoHe3AYObz0BrgoBNlTV6Fx01k_sQ7PbS0Sa_59dewZ1a_K6getwjm8fr-Ey2m51SsFEAEW67j8ZK22-5rU7FPopeui6DvCFmARk4O3iBqw",
  role: "customer",
  accountStatus: "active",
  addresses: [
    {
      id: "addr-1",
      label: "บ้าน",
      recipientName: "สมชาย ใจดี",
      phoneNumber: "081-234-5678",
      addressLine1: "123/45 หมู่บ้านวินด์เซอร์",
      addressLine2: "ถนนสุขุมวิท",
      subDistrict: "คลองตัน",
      district: "วัฒนา",
      province: "กรุงเทพฯ",
      postalCode: "10110",
      country: "Thailand",
      isDefault: true,
    },
  ],
  defaultAddressId: "addr-1",
  recentOrdersSummary: [
    {
      orderId: "order-001",
      orderNumber: "ORD-2023-088",
      status: "shipped",
      totalAmount: 45000,
      createdAt: new Date("2024-01-01"),
    },
  ],
  preferences: {
    language: "th",
    notificationsEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    theme: "light",
  },
  createdAt: new Date("2023-06-15"),
  updatedAt: new Date("2024-01-10"),
  lastLoginAt: new Date("2024-01-10"),
};

// =============================================================================
// DISCOUNT CODES - รหัสส่วนลด
// =============================================================================

export const mockDiscountCodes: DiscountCode[] = [
  {
    code: "SUMMER15",
    type: "percentage",
    value: 15,
    minOrderAmount: 5000,
    maxDiscount: 3000,
    validFrom: new Date("2024-01-01"),
    validTo: new Date("2024-03-31"),
    usageLimit: 100,
    usedCount: 45,
    isActive: true,
  },
  {
    code: "WELCOME500",
    type: "fixed",
    value: 500,
    minOrderAmount: 2000,
    validFrom: new Date("2024-01-01"),
    validTo: new Date("2024-12-31"),
    usedCount: 0,
    isActive: true,
  },
];

// =============================================================================
// ACTIVE ORDER TRACKING - สำหรับ widget บนหน้า Home
// =============================================================================

export interface ActiveOrderWidget {
  orderNumber: string;
  status: string;
  statusTh: string;
}

export const mockActiveOrder: ActiveOrderWidget = {
  orderNumber: "WIN-8932",
  status: "Out for delivery",
  statusTh: "กำลังจัดส่ง",
};
