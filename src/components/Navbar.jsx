import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import {
  Dumbbell,
  LayoutDashboard,
  CreditCard,
  QrCode,
  Menu,
  X,
  LogOut,
  User,
  LogIn,
} from "lucide-react";

export const Navbar = () => {
  const { user, logout, isAdmin, isSubscribed } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = [
    { label: "Home", path: "/", icon: Dumbbell },
    { label: "Plans", path: "/plans", icon: CreditCard },
    ...(isSubscribed
      ? [{ label: "My Card", path: "/card", icon: QrCode }]
      : []),
    ...(isAdmin
      ? [{ label: "Dashboard", path: "/dashboard", icon: LayoutDashboard }]
      : []),
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-9 h-9 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center"
          >
            <Dumbbell className="w-5 h-5 text-neon-cyan" />
          </motion.div>
          <span className="text-lg font-bold tracking-tight text-text-primary">
            Fit<span className="text-neon-cyan">Flow</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-neon-cyan"
                    : "text-text-secondary hover:text-text-primary"
                }`
              }
            >
              {isActive(link.path) && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-neon-cyan/10 border border-neon-cyan/20 rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <link.icon className="w-4 h-4" />
                {link.label}
              </span>
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-text-muted flex items-center gap-2">
                <User className="w-4 h-4" />
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-neon-red transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-medium hover:bg-neon-cyan/20 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
          )}
        </div>

        <button
          className="md:hidden p-2 text-text-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-strong border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive(link.path)
                      ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
                      : "text-text-secondary hover:bg-white/5"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-neon-red hover:bg-neon-red/10"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
