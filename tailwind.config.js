/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // สีหลักของ WINDSOR brand
        primary: {
          DEFAULT: "#137fec",
          dark: "#0b5ec2",
          light: "#3a9bff",
        },
        // สีพื้นหลัง
        background: {
          light: "#f6f7f8",
          dark: "#101922",
        },
        // สีพื้นผิว (cards, modals)
        surface: {
          light: "#ffffff",
          dark: "#1e2936",
        },
        // สีขอบ
        border: {
          light: "#e2e8f0",
          dark: "#334155",
        },
        // สีข้อความ
        text: {
          main: {
            light: "#0d141b",
            dark: "#e2e8f0",
          },
          sub: {
            light: "#4c739a",
            dark: "#94a3b8",
          },
        },
      },
      fontFamily: {
        // ฟอนต์หลัก รองรับทั้งภาษาไทยและอังกฤษ
        display: ["Inter", "Noto Sans Thai", "sans-serif"],
        body: ["Inter", "Noto Sans Thai", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
