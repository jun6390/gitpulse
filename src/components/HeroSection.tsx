"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { translations } from "@/constants/translations";
import { useLanguageStore } from "@/stores/languageStore";
import Link from "next/link";

const HeroSection = () => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <section className="relative min-h-[660px] overflow-hidden bg-white transition-colors dark:bg-black">
      {/* 배너 배경 이미지 */}
      <Image
        src="/images/banner.webp"
        alt="GitHub activity dashboard banner"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* 배경 위 살짝 밝은 오버레이 */}
      <div className="absolute inset-0 bg-white/20 dark:bg-black/40" />

      {/* 실제 콘텐츠 */}
      <div className="relative z-10 mx-auto flex min-h-[660px] max-w-7xl items-center px-6">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex rounded-full bg-blue-50/90 px-5 py-2 text-sm font-bold text-blue-600 shadow-sm backdrop-blur dark:bg-blue-500/10 dark:text-white">
            {t.home.heroBadge}
          </p>

          <h1 className="whitespace-pre-line text-5xl font-bold leading-tight tracking-tight text-gray-950 dark:text-white md:text-5xl">
            {t.home.heroTitle}
          </h1>

          <p className="mt-7 max-w-xl whitespace-pre-line text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t.home.heroDescription}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/profile"
              className="flex w-[220px] cursor-pointer items-center justify-between rounded-2xl bg-blue-600 px-6 py-4 text-lg font-bold text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-700"
            >
              <span>{t.home.heroButton}</span>
              <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
