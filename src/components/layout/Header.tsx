import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/assets';

const NAVIGATION_ROUTES = [
  // { path: "/", label: "메인" },
  { path: '/jobs', label: '채용공고' },
  { path: '/community', label: '커뮤니티' },
  { path: '/myPage', label: '마이페이지' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // /, /login, /signup 페이지에서는 네비게이션만 숨김
  const isAuthPage =
    location.pathname === '/' ||
    location.pathname === '/signup' ||
    location.pathname === '/login';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path.split('?')[0];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
        {/* 로고는 항상 보임 */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="h-8 w-auto" />
        </Link>

        {/* 네비게이션은 /, /login, /signup에서만 숨김 */}
        {!isAuthPage && (
          <div className="flex items-center gap-8">
            {NAVIGATION_ROUTES.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-medium hover:text-brand-yellow ${
                  isActive(path) ? 'text-brand-yellow' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
