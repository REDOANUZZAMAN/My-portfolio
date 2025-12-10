import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ThemeLoader from "@/components/ThemeLoader";
import ChatbotWrapper from "@/components/ChatbotWrapper";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
  preload: true,
});
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "REDOANUZZAMAN - Creative Designer & AI Automation Expert",
  description: "I'm a passionate and dedicated creative designer specializing in n8n, LangChain, LangFlow, Zapier, and website development—turning ideas into seamless digital experiences.",
  keywords: "n8n, LangChain, LangFlow, Zapier, AI Automation, Web Development, Creative Designer",
  authors: [{ name: "REDOANUZZAMAN" }],
  openGraph: {
    title: "REDOANUZZAMAN - Creative Designer & AI Automation Expert",
    description: "Turning ideas into seamless digital experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://redoan.dev/wp-content/uploads/2025/09/Weixin-Image_20250921025540_83_37-1.jpg" type="image/jpeg" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-gray-950 text-white`} suppressHydrationWarning>
        <ThemeLoader />
        {children}
        <ChatbotWrapper />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
