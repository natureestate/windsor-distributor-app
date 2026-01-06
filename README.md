# WINDSOR Distributor App

แอปพลิเคชันสำหรับตัวแทนจำหน่ายประตูหน้าต่าง WINDSOR

## 🚀 Tech Stack

- **Framework:** React Native + Expo (Managed Workflow)
- **Routing:** Expo Router v3 (File-based routing)
- **Language:** TypeScript (Strict mode)
- **Styling:** NativeWind v4 (Tailwind CSS for React Native)
- **Backend:** Firebase (Firestore, Auth, Cloud Functions, Storage)

## 📁 โครงสร้างโปรเจค

```
expoapp/
├── app/                    # Routes (Expo Router)
│   ├── (customer)/         # Customer-facing routes (Mobile + Web)
│   │   ├── index.tsx       # Home Screen
│   │   ├── catalog.tsx     # Product Catalog
│   │   ├── cart.tsx        # Shopping Cart
│   │   ├── checkout.tsx    # Checkout
│   │   ├── orders.tsx      # Order History
│   │   ├── profile.tsx     # User Profile
│   │   └── product/[id].tsx # Product Details
│   ├── (admin)/            # Admin routes (Desktop Web)
│   │   └── index.tsx       # Admin Dashboard
│   └── _layout.tsx         # Root Layout
├── components/             # Reusable Components
│   ├── ui/                 # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Rating.tsx
│   │   ├── Chip.tsx
│   │   └── IconButton.tsx
│   ├── product/            # Product-related components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── CategoryCard.tsx
│   ├── cart/               # Cart components
│   ├── order/              # Order components
│   └── navigation/         # Navigation components
├── types/                  # TypeScript interfaces
│   ├── product.ts          # Product, Category types
│   ├── cart.ts             # Cart, CartItem types
│   ├── order.ts            # Order, Payment types
│   ├── user.ts             # User, Auth types
│   └── index.ts            # Export all types
├── data/                   # Mock data
│   └── mockData.ts         # Sample data for development
├── lib/                    # Utilities
│   └── utils.ts            # Helper functions
├── hooks/                  # Custom hooks
│   ├── firestore/          # Firestore hooks
│   └── auth/               # Auth hooks
├── services/               # Services
│   └── firebase/           # Firebase config & helpers
├── contexts/               # React Context providers
├── assets/                 # Static assets
│   └── images/             # Images
└── config/                 # App configuration
```

## 🎨 Design System

### Colors

```typescript
const colors = {
  primary: "#137fec",      // WINDSOR Blue
  background: "#f6f7f8",   // Light gray background
  surface: "#ffffff",      // White surface
  text: {
    main: "#0d141b",       // Primary text
    sub: "#4c739a",        // Secondary text
  },
  border: "#e2e8f0",       // Border color
};
```

### หน้าจอหลัก (7 หน้าจอ)

1. **Home** - หน้าแรก, Promo banners, Categories, Featured products
2. **Catalog** - รายการสินค้า, Filter, Search
3. **Product Details** - รายละเอียดสินค้า, Gallery, Specs
4. **Product Configurator** - ปรับแต่งขนาด/สี/กระจก (Thai UI)
5. **Cart** - ตะกร้าสินค้า, Discount code
6. **Checkout** - ที่อยู่จัดส่ง, Payment methods
7. **Orders** - ประวัติคำสั่งซื้อ, Tracking

## 🏃 การรันโปรเจค

```bash
# ติดตั้ง dependencies
npm install

# รัน development server
npm start

# รันบน iOS
npm run ios

# รันบน Android
npm run android

# รันบน Web
npm run web
```

## 📱 Responsive Design

- **Mobile First:** ใช้ NativeWind base classes สำหรับ mobile
- **Desktop:** ใช้ `md:` และ `lg:` modifiers สำหรับ desktop web
- **Admin:** Desktop-only interface

## 🔥 Firebase Setup (TODO)

1. สร้าง Firebase Project
2. เพิ่ม Web App และ Mobile Apps
3. Copy config ไปที่ `services/firebase/config.ts`
4. Enable Firestore, Auth, Storage
5. Deploy Cloud Functions

## 📝 License

Private - WINDSOR Distributor
