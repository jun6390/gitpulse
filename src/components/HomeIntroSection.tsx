"use client";

import MotionReveal from "@/common/MotionReveal";
import { translations } from "@/constants/translations";
import { useLanguageStore } from "@/stores/languageStore";

const HomeIntroSection = () => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <section className="flex min-h-[560px] items-center justify-center bg-white px-6 text-center transition-colors dark:bg-black">
      <MotionReveal>
        <p className="max-w-5xl text-3xl font-bold leading-[1.6] tracking-tight text-gray-950 sm:text-4xl dark:text-white">
          {t.home.introText.split("\n").map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </MotionReveal>
    </section>
  );
};

export default HomeIntroSection;
