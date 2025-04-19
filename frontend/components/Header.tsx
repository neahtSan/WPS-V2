"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { name: "Home", path: "/" },
  {
    name: "Dharma Blog",
    dropdown: true,
    items: [{ name: "All Articles", path: "/blog" }],
  },
  {
    name: "Meditation",
    dropdown: true,
    items: [
      { name: "Personal Practice", path: "/meditation/personal" },
      { name: "Group Practice", path: "/meditation/group" },
    ],
  },
  {
    name: "About Us",
    dropdown: true,
    items: [
      { name: "History & Abbot", path: "/about/history" },
      { name: "Temple Landmarks", path: "/about/landmarks" },
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
                  className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive(link.path || "")
                      ? "bg-gray-200 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={closeAll}
                >
                  {link.name}
                </Link>
              ) : (
                <div key={link.name} className="relative">
                  <button
                    className="flex items-center px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100"
                    onClick={() => toggleDropdown(link.name)}
                    aria-expanded={activeDropdown === link.name}
                  >
                    {link.name}
                    {activeDropdown === link.name ? (
                      <ChevronUp className="w-4 h-4 ml-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </button>

                  {activeDropdown === link.name && (
                    <ul className="absolute mt-1 space-y-1 bg-white shadow-lg rounded-md w-full">
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
                    </ul>
                  )}
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
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t text-lg">
          <ul className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) =>
              !link.dropdown ? (
                <li key={link.name}>
                  <Link
                    href={link.path || ""}
                    className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive(link.path || "")
                        ? "bg-gray-200 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={closeAll}
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li key={link.name}>
                  <button
                    className="w-full flex justify-between items-center px-3 py-2 rounded-md text-left bg-gray-100"
                    onClick={() => toggleDropdown(link.name)}
                    aria-expanded={activeDropdown === link.name}
                  >
                    {link.name}
                    {activeDropdown === link.name ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {activeDropdown === link.name && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {link.items?.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.path}
                            className="block px-3 py-2 rounded-md text-base text-gray-700 bg-white hover:bg-gray-100"
                            onClick={closeAll}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
