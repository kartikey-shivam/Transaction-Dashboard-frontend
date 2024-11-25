import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
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
      <body
        className={`antialiased `}
      >

            {children}
            <ToastContainer position="bottom-left"  autoClose={2000} />
      </body>
    </html>
  );
}
