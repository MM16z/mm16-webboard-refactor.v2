import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'

import '@/styles/homepage/homepage.css'
import '@/styles/(appPages)/user-dashboard/user-dashboard.css'
import '@/styles/navbar/navbar.css'
import '@/styles/post-box/comment-box.css'
import '@/styles/post-box/post-box.css'
import '@/styles/heart-btn/heart-btn.css'
import '@/styles/mobile-menu/mobile-menu.css'
import '@/styles/auth-form/auth-form.css'

import Navbar from "@/components/navbar/Navbar";
import StoreProvider from "@/redux/providerComponent/storeProvider";
import AuthGuard from "@/services/AuthGuard";
import { Toaster } from 'sonner'
import SystemInfo from "@/components/SystemInfo";
import GitHubButton from "@/components/common/GitHubButton";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head> */}
      <StoreProvider>
        <body className={inter.className}>
          <AuthGuard>
            <Navbar />
            <SystemInfo />
            <GitHubButton />
            <div className="z-10 relative">
              {children}
            </div>
          </AuthGuard>
          <Toaster
            position="top-right"
            closeButton
            richColors
            expand={true}
            toastOptions={{
              style: {
                background: 'white',
                color: 'black',
              },
              className: 'my-toast-class',
            }}
          />
          <div className="homepage-bg fixed w-full h-full top-0 z-0 pointer-events-none">
            <span className="homepage-bg-nested fixed w-full h-full top-0 z-0 pointer-events-none"></span>
          </div>
        </body>
      </StoreProvider>
    </html>
  );
}


