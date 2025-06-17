import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "@/assets";
import { Menu, X } from "lucide-react";
import { AuthContext } from "@/lib/AuthContext";

const NAVIGATION_ROUTES = [
  { path: "/", label: "메인" },
  { path: "/jobs", label: "채용공고" },
  { path: "/community", label: "커뮤니티" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/login";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (path: string) => location.pathname === path.split("?")[0];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
        {/* 로고 */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img src={Logo} alt="logo" className="h-8 w-auto" />
        </Link>

        {/* 메뉴 (로그인/회원가입 페이지에서는 전체 숨김) */}
        {!isAuthPage && (
          <div className="hidden md:flex items-center gap-8">
            {isLoggedIn && (
              <div className="flex items-center gap-6">
                {NAVIGATION_ROUTES.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`text-sm font-medium hover:text-brand-yellow ${
                      isActive(path) ? "text-brand-yellow" : ""
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 로그인/회원가입 또는 홈 버튼 */}
        {!isAuthPage && (
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/")}
                className="text-sm font-medium"
              >
                홈
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button className="text-sm font-medium">로그인</button>
                </Link>
                <Link to="/signup">
                  <button className="text-sm font-medium">회원가입</button>
                </Link>
              </>
            )}
          </div>
        )}

        {/* 모바일 메뉴 버튼 */}
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

export default Header;
