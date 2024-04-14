import { Inter } from "next/font/google";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";
export const metadata = {
  title: "Dublin Store",
  description:
    "Descubre lo último en tecnología de punta con nuestra tienda de importación. Encuentra gadgets exclusivos, electrónica avanzada y dispositivos inteligentes. Servicio personalizado y envío rápido. ¡Explora nuestras ofertas hoy!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
