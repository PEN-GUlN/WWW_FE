import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/assets";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img src={Logo} alt="logo" />
        </Link>

        {!isAuthPage && (
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-medium hover:text-brand-yellow transition-colors ${
                  isActive("/") ? "text-brand-yellow" : ""
                }`}
              >
                홈
              </Link>
              <Link
                to="/jobs"
                className={`text-sm font-medium hover:text-brand-yellow transition-colors ${
                  isActive("/jobs") ? "text-brand-yellow" : ""
                }`}
              >
                채용공고
              </Link>
              <Link
                to="/community"
                className={`text-sm font-medium hover:text-brand-yellow transition-colors ${
                  isActive("/community") ? "text-brand-yellow" : ""
                }`}
              >
                커뮤니티
              </Link>
            </div>
          </div>
        )}

        {isAuthPage && (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <button className="font-medium text-sm">로그인</button>
            </Link>
            <Link to="/signup">
              <button className="font-medium text-sm">회원가입</button>
            </Link>
          </div>
        )}

        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
