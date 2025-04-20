"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import InfoIcon from '@mui/icons-material/Info';

const navLinks = [
  { name: "หน้าแรก", path: "/", icon: <HomeIcon className="mr-2" /> },
  {
    name: "บทความธรรมะ",
    dropdown: true,
    icon: <ArticleIcon className="mr-2" />,
    items: [{ name: "ดูบทความธรรมะทั้งหมด", path: "/blog" }],
  },
  {
    name: "การปฏิบัติธรรม",
    dropdown: true,
    icon: <SelfImprovementIcon className="mr-2" />,
    items: [
      { name: "การปฏิบัติธรรมส่วนตัว", path: "/meditation/personal" },
      { name: "การปฏิบัติธรรมกลุ่ม", path: "/meditation/group" },
    ],
  },
  {
    name: "เกี่ยวกับเรา",
    dropdown: true,
    icon: <InfoIcon className="mr-2" />,
    items: [
      { name: "ประวัติวัด & เจ้าอาวาส", path: "/about/history" },
      { name: "สถานที่สำคัญ", path: "/about/landmarks" },
    ],
  }
];

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (name: string) =>
    setActiveDropdown(activeDropdown === name ? null : name);

  const isActive = (path: string) => pathname === path;
  const closeAll = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto px-4 py-3">
        {/* Left: Logo */}
        <div className="flex-shrink-0 w-[180px] flex items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logoipsum-350.svg"
              alt="Wat Pasunyata Logo"
              className="h-12 w-auto"
              width={75}
              height={75}
            />
          </Link>
        </div>

        {/* Middle: Desktop Nav (hidden on mobile) */}
        <div className="hidden md:flex justify-end flex-1">
          <nav className="flex space-x-6 max-w-screen-lg w-full justify-end">
            {navLinks.map((link) =>
              !link.dropdown ? (
                <Link
                  key={link.name}
                  href={link.path || ""}
                  className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
                    isActive(link.path || "")
                      ? "bg-gray-200 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={closeAll}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ) : (
                <div key={link.name} className="relative">
                  <button
                    className="flex items-center px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100"
                    onClick={() => toggleDropdown(link.name)}
                    aria-expanded={activeDropdown === link.name}
                  >
                    {link.icon}
                    {link.name}
                    {activeDropdown === link.name ? (
                      <ChevronUp className="w-4 h-4 ml-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.ul
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute mt-1 space-y-1 bg-white shadow-lg rounded-md w-full z-50"
                      >
                        {link.items?.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.path}
                              className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-100"
                              onClick={closeAll}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              )
            )}
          </nav>
        </div>

        {/* Right: Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-800"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="fixed inset-0 bg-white z-[9999] p-6 overflow-y-auto"
          >
            {/* Close Button */}
            <div className="flex justify-end mb-6">
              <button onClick={toggleMenu} aria-label="Close menu">
                <X className="w-7 h-7 text-gray-800" />
              </button>
            </div>

            {/* Menu Items */}
            <ul className="flex flex-col text-lg">
              {/* Home as primary button */}
              <li>
                <Link
                  href="/"
                  onClick={closeAll}
                  className={`block py-3 px-4 mb-4 rounded-md text-center text-base font-semibold flex items-center justify-center bg-gray-100 hover:bg-gray-200 ${
                    isActive("/") ? "bg-gray-200 text-gray-900" : "text-gray-800"
                  }`}
                >
                  <HomeIcon className="mr-2" />
                  หน้าแรก
                </Link>
              </li>

              <hr className="border-t border-gray-300 mb-4" />

              {/* Other sections */}
              {navLinks
                .filter((link) => link.name !== "หน้าแรก")
                .map((link) => (
                  <li key={link.name} className="mb-4">
                    <span className="block px-4 py-2 text-[#6b615b] font-semibold border-b border-dashed border-gray-300 flex items-center">
                      {link.icon}
                      {link.name}
                    </span>
                    <ul className="mt-2 ml-4 space-y-2">
                      {link.items?.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.path}
                            className={`block px-3 py-2 rounded-md bg-white hover:bg-gray-100 ${
                              isActive(item.path) ? "bg-gray-200 font-semibold" : ""
                            }`}
                            onClick={closeAll}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;