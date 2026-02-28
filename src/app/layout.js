import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/page";
import { Providers } from "./providers";
import Loader from '@/Components/Loader';
import InitialContent from '@/Components/InitialContent';

export const metadata = {
  title: "Wearist",
  description: "Your one-stop shop for the latest tech accessories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#1a1a1a] text-white">
        <Providers>
          <Navbar />
          <Loader />
          {/* prevent rendering of page content until first backend activity finishes */}
          <InitialContent>{children}</InitialContent>
          <Footer />
        </Providers>
      </body>
      
    </html>
  );
}
