"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { translations } from "@/constants/translations";
import { useLanguageStore } from "@/stores/languageStore";
import HeaderControls from "@/components/HeaderControls";

const navItems = [
  { key: "overview", href: "/" },
  { key: "profile", href: "/profile" },
  { key: "repositories", href: "/repository" },
  { key: "languages", href: "/language" },
  { key: "activity", href: "/activity" },
  { key: "ranking", href: "/ranking" },
] as const;

const Header = () => {
  const pathname = usePathname();
  const { language } = useLanguageStore();

  const t = translations[language];

  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const lastScrollY = useRef(0);
  const isMobileMenuOpen = mobileMenuPath === pathname;
  const shouldHideHeader =
    pathname === "/" && !isMobileMenuOpen && isHeaderHidden;

  useEffect(() => {
    if (pathname !== "/" || isMobileMenuOpen) {
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY.current;

      if (currentScrollY < 80) {
        setIsHeaderHidden(false);
      } else if (scrollDifference > 12) {
        setIsHeaderHidden(true);
      } else if (scrollDifference < -12) {
        setIsHeaderHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transform-gpu border-b border-gray-200 bg-white/80 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform dark:border-gray-800 dark:bg-black/80 ${
          shouldHideHeader ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1140px] items-center justify-between px-6">
          {/* 로고 */}
          <Link
            href="/"
            onClick={() => setMobileMenuPath(null)}
            className="flex items-center gap-3"
          >
            <Image
              src="/images/logo.svg"
              alt="GitPulse Logo"
              width={40}
              height={40}
              priority
              className="h-8 w-8"
            />

            <span className="text-lg font-extrabold text-gray-900 dark:text-white">
              {t.common.title}
            </span>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  {t.nav[item.key]}
                </Link>
              );
            })}
          </nav>

          {/* 데스크탑 언어 / 테마 컨트롤 */}
          <div className="hidden md:block">
            <HeaderControls dropdownPosition="right" />
          </div>

          {/* 모바일 햄버거 버튼 */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuPath((currentPath) =>
                currentPath === pathname ? null : pathname,
              );
              setIsHeaderHidden(false);
            }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm transition hover:bg-gray-100 md:hidden dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/10"
            aria-label="mobile menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* 모바일 메뉴 - 부드럽게 열림/닫힘 */}
        <div
          className={`border-t bg-white transition-all duration-300 ease-out md:hidden dark:bg-black ${
            isMobileMenuOpen
              ? "max-h-[680px] overflow-visible border-gray-200 opacity-100 dark:border-gray-800"
              : "max-h-0 overflow-hidden border-transparent opacity-0 dark:border-transparent"
          }`}
        >
          <div
            className={`px-6 transition-all duration-300 ease-out ${
              isMobileMenuOpen ? "translate-y-0 py-5" : "-translate-y-3 py-0"
            }`}
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuPath(null)}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                    }`}
                  >
                    {t.nav[item.key]}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 border-t border-gray-200 pt-5 dark:border-gray-800">
              <HeaderControls
                dropdownPosition="left"
                onSelectComplete={() => setMobileMenuPath(null)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* fixed header 공간 확보 */}
      <div className="h-16" />
    </>
  );
};

export default Header;
