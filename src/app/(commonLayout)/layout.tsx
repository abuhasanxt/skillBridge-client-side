"use client";

import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function CommonLayout({children}:{children:React.ReactNode}) {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}