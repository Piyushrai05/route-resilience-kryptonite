import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import StatusBar from "@/components/layout/StatusBar";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Route Resilience | AI-Powered GIS Platform",
  description: "Advanced geospatial intelligence dashboard for road network extraction, graph theory-based reconstruction, bottleneck analysis, and disaster resilience simulation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${poppins.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased h-full flex flex-col font-body text-foreground bg-background overflow-hidden`}
      >
        {/* Navbar */}
        <Navbar />
        
        {/* Main Dashboard Space */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Workspace Content */}
          <main className="flex-1 overflow-y-auto bg-background p-8 flex flex-col gap-8">
            {children}
          </main>
        </div>
        
        {/* Status Bar */}
        <StatusBar />
      </body>
    </html>
  );
}
