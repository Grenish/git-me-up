import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  style: "normal",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Git Me Up | Create",
  description: "Create a minimal and professional dev focused github README.",
};

export default function Userlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={`${inter.className} antialised`}>{children}</main>;
}
