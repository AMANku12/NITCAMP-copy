import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Profile", path: "/profile" },
  { name: "About Us", path: "/about" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-blue-950 shadow-lg border-b border-blue-800 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Brand */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <img 
                  src={logo} 
                  alt="NIT Camp Logo" 
                  className="h-12 w-auto object-contain"
                />
              </div>
              {/* <div className="hidden sm:block">
                <span className="text-2xl font-bold text-white tracking-tight">
                  NIT<span className="text-blue-200">CAMP</span>
                </span>
              </div> */}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? "text-white"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-white hover:text-gray-200 transition-colors duration-200"
                aria-expanded={menuOpen}
                aria-label="Toggle navigation menu"
              >
                <motion.div
                  animate={{ rotate: menuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {menuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={menuOpen ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              height: "auto",
              transition: {
                duration: 0.4,
                ease: "easeInOut",
              },
            },
            closed: {
              opacity: 0,
              height: 0,
              transition: {
                duration: 0.4,
                ease: "easeInOut",
              },
            },
          }}
          className="md:hidden overflow-hidden bg-blue-900 border-t border-blue-800"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ x: -50, opacity: 0 }}
                animate={menuOpen ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-white bg-blue-800"
                      : "text-white hover:text-gray-200 hover:bg-blue-800"
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <div className="mt-1 w-6 h-0.5 bg-white rounded-full"></div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.nav>
      
      {/* Spacer to prevent content overlap - increased height */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;