import { Nunito_Sans } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunitoSans = Nunito_Sans({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata = {
  title: "ReelTerror",
  description: "Social Platform for Horror Movie Fans",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunitoSans.className}>
          <div className="layout-container">
            <Header />
            <main className="main-content">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
