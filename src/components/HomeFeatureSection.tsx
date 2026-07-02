"use client";

import { BarChart3, GitBranch, Lightbulb, UserRoundSearch } from "lucide-react";
import { translations } from "@/constants/translations";
import { useLanguageStore } from "@/stores/languageStore";
import MotionReveal from "@/common/MotionReveal";

const icons = [UserRoundSearch, GitBranch, BarChart3, Lightbulb];

const HomeFeatureSection = () => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <section className="bg-gray-50 px-6 py-28 transition-colors dark:bg-zinc-950">
      <div className="mx-auto max-w-[1140px]">
        <MotionReveal>
          <div className="mb-20">
            <p className="mb-6 text-3xl font-bold text-blue-500">
              {t.home.featureLabel}
            </p>

            <h2 className="text-4xl font-bold leading-[1.35] tracking-tight text-gray-950 sm:text-5xl dark:text-white">
              {t.home.featureTitle.split("\n").map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
          </div>

          <div className="grid gap-x-24 gap-y-20 md:grid-cols-2">
            {t.home.features.map((feature, index) => {
              const Icon = icons[index];

              return (
                <div key={feature.title}>
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm dark:bg-white/10">
                    <Icon
                      size={44}
                      strokeWidth={2.4}
                      className="text-gray-800 dark:text-white"
                    />
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-gray-950 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="whitespace-pre-line max-w-sm text-base leading-7 text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};

export default HomeFeatureSection;
