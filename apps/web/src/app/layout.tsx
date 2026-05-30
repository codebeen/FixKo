import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FixKo PH",
  description: "FixKo PH System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${poppins.className} h-full antialiased`}>
      <body className={`${poppins.className} min-h-full flex flex-col bg-slate-100`}>
        <MantineProvider
          defaultColorScheme="light"
          theme={{
            fontFamily: "'Poppins', var(--font-poppins), sans-serif",
            primaryColor: "blue",
            defaultRadius: "sm",
          }}
        >
          <Notifications position="top-right" zIndex={10000} />
          <Toaster position="top-center" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
