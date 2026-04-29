import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { GradientBackground } from "./GradientBackground";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

export const Layout = () => (
  <div className="relative min-h-svh flex flex-col">
    <GradientBackground />
    <Navbar />
    <main className="flex-1 pt-16">
      <ScrollToTop />
      <Outlet />
    </main>
    <Footer />
  </div>
);
