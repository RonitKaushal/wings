"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";
import { initLenis, destroyLenis } from "@/hooks/useLenis";


const navItems = [
  { name: "HOME", path: "/" },
  { name: "ABOUT", path: "/aboutus" },
  { name: "GALLERY", path: "/gallery" },
  { name: "CONTACT US", path: "/contact" },
];

const Navbar = ({ showContactButton = true }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);


    useEffect(() => {
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  
  const [open, setOpen] = useState(false);

  const numbers = [
    { label: "Dubai", number: "+97145561050" },
    { label: "Abu Dhabi", number: "+97126394277" },
  ];

  useEffect(() => {
    setIsVisible(true);

    // Hide top bar on mobile scroll
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setShowTopBar(window.scrollY < 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div
        className={`bg-black z-10 text-white py-2 px-4 text-sm transition-transform duration-300 ${
          showTopBar ? "translate-y-0" : "-translate-y-full"
        } md:translate-y-0`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 Poppins">
          {/* Left Section - Social Media Icons */}
          <div className="hidden md:flex items-center space-x-3">
            <Facebook
              className="w-4 h-4 cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/profile.php?id=61579252472959",
                  "_blank"
                )
              }
            />
            <Instagram
              className="w-4 h-4 cursor-pointer hover:text-pink-400 transition-colors"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/wingsandwheels.travel",
                  "_blank"
                )
              }
            />
            <Linkedin
              className="w-4 h-4 cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() =>
                window.open("https://linkedin.com/in/yourprofile", "_blank")
              }
            />
            <HugeiconsIcon
              className="w-4 h-4 cursor-pointer hover:text-green-400 transition-colors"
              icon={WhatsappIcon}
              onClick={() =>
                window.open("https://wa.me/00971547858338", "_blank")
              }
            />
          </div>

          {/* Middle Section - Phone Numbers */}
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
            <div
              className="flex items-center space-x-1 sm:space-x-2"
              onClick={() => window.open("tel:+97145561050", "_blank")}
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm Poppins">
                Dubai: +971 4 556 1050
              </span>
            </div>
            <div className="hidden sm:block text-gray-400">|</div>
            <div
              className="flex items-center space-x-1 Poppins sm:space-x-2"
              onClick={() => window.open("tel:+97126394277", "_blank")}
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm Poppins">
                Abu Dhabi: +971 2 639 4277
              </span>
            </div>
          </div>

          {/* Right Section - Email */}
          <div
            className="hidden md:flex items-center space-x-2"
            onClick={() =>
              window.open("mailto:reservation@wwtravels.net", "_blank")
            }
          >
            <Mail className="w-4 h-4 text-red-400" />
            <span className="Poppins">reservation@wwtravels.net</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className=" py-2 md:py-4 z-50 bg-white/95 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between">
            {/* Logo with Text */}
            <div
              className={`flex items-center space-x-2 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              onClick={() => router.push("/")}
            >
              <div className="relative h-16 w-20 sm:h-20 sm:w-24 md:h-24 md:w-28 lg:h-28 lg:w-32 transition-all duration-300 cursor-pointer hover:scale-105 flex-shrink-0">
                <Image
                  src="/assets/wings.png"
                  alt="Wings wheels logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              <div className="flex flex-col">
                <h1
                  className="text-black text-sm sm:text-lg md:text-xl lg:text-2xl font-bold tracking-wide leading-none"
                  style={{ fontFamily: '"Bodoni Bd BT", serif' }}
                >
                  WINGS & WHEELS
                </h1>
                <p
                  className="text-black text-xs sm:text-sm md:text-base leading-none"
                  style={{ fontFamily: '"Bodoni Bd BT", serif' }}
                >
                  TRAVEL AND TOURISM
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center mx-8">
              <div
                className={`flex space-x-8 transition-all duration-1200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => router.push(item.path)}
                    className="relative text-black text-base font-medium cursor-pointer transition-all duration-300 hover:text-blue-600 hover:-translate-y-0.5 group Poppins"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp and Contact Button - Desktop */}
            {showContactButton && (
              <>
                {/* Desktop WhatsApp and Contact */}
                <div
                  className={`hidden lg:flex items-center space-x-4 transition-all duration-1400 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >









                  <div
                    className="relative inline-block text-left"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                  >
                    {/* Button */}
                    <div
                      className="flex items-center space-x-2 cursor-pointer text-black"
                      onClick={() => setOpen((prev) => !prev)}
                    >
                      <span className="text-sm font-medium">WHATSAPP</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Dropdown */}
                    {open && (
                      <div className="absolute left-0 mt-0 w-56 bg-white border rounded-lg shadow-lg z-10">
                        {numbers.map((item, index) => (
                          <a
                            key={index}
                            href={`https://wa.me/${item.number.replace(
                              /\D/g,
                              ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.label}: {item.number}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => router.push("/contact")}
                    className="rounded-full bg-transparent border border-black hover:bg-black hover:text-white h-10 px-6 text-black text-sm font-medium transition-all duration-300 hover:scale-105"
                  >
                    CONTACT
                  </Button>
                </div>

                {/* Mobile Contact Button */}
                <div className="lg:hidden">
                  <Button
                    onClick={() => router.push("/contact")}
                    className="rounded-full bg-black text-white hover:bg-gray-800 h-8 px-4 text-xs font-medium transition-all duration-300"
                  >
                    CONTACT
                  </Button>
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                onClick={toggleMobileMenu}
                variant="ghost"
                size="icon"
                className="text-black hover:bg-black/10 h-8 w-8"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
              <div className="flex flex-col py-4">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      router.push(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-black text-base font-medium cursor-pointer transition-all duration-300 hover:text-blue-600 hover:bg-gray-50 px-6 py-3 border-b border-gray-100 last:border-b-0"
                  >
                    {item.name}
                  </div>
                ))}

                {/* Mobile Contact Info */}
                <div className="px-6 py-4 bg-gray-50 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-700">
                      +971 4 556 1050
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-700">
                      reservation@wwtravels.net
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-700">
                      WhatsApp Support
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
