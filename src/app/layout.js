import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/page";



export const metadata = {
  title: "Wearist",
  description: "Your one-stop shop for the latest tech accessories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#1a1a1a] text-white">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
