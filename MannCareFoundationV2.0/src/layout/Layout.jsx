import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Particles from "../components/Particles";
import WhatsAppButton from "../components/WhatsAppButton";

// ============ COMMON LAYOUT ============
// Navbar + Footer yahan EK hi jagah hai —
// har page <Outlet /> ki jagah render hota hai.
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Particles />
      <Navbar />
      <main className="flex-1 relative z-10 pt-[76px]">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
