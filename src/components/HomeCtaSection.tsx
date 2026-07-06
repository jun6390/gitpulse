"use client";

import { translations } from "@/constants/translations";
import { useLanguageStore } from "@/stores/languageStore";
import MotionReveal from "@/common/MotionReveal";
import { PrimaryButtonLink } from "@/components/PrimaryButton";

const cardLinks = ["/profile", "/repositories", "/languages", "/activity"];

const HomeCtaSection = () => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <section className="bg-black px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <MotionReveal>
          <div className="mb-28 text-center">
            <h2 className="whitespace-pre-line text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {t.home.ctaTitle}
            </h2>

            <p className="mt-8 whitespace-pre-line text-xl font-bold leading-[1.6] text-gray-400 sm:text-2xl">
              {t.home.ctaDescription}
            </p>
          </div>
        </MotionReveal>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {t.home.ctaCards.map((card, index) => (
            <div key={card.title} className="flex h-full flex-col items-start">
              <h3 className="text-2xl font-bold text-white">{card.title}</h3>

              <p className="mt-5 whitespace-pre-line text-base font-semibold leading-7 text-gray-400">
                {card.description}
              </p>

              <div className="mt-auto pt-8">
                <PrimaryButtonLink
                  href={cardLinks[index]}
                  className="inline-flex items-center justify-center px-5 py-3 text-sm font-bold"
                >
                  {card.button}
                </PrimaryButtonLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCtaSection;
