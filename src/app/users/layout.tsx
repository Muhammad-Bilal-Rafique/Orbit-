import React from "react";
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

interface UsersLayoutProps {
  children: React.ReactNode;
}

export default function UsersLayout({ children }: UsersLayoutProps) {
  return (
    <div>

      {/* MAIN DYNAMIC CONTENT SLOTS */}
      <main className="">
        <Navbar />
        {children}
        <Footer/>
      </main>

    </div>
  );
}