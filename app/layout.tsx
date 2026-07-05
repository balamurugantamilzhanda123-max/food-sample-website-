import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EverydayFresh Premium Grocery",
  description:
    "A responsive food and grocery e-commerce website with OTP login, orders, returns, refunds, payments, and admin management."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
