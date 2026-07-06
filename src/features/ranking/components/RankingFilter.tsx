import GitHubSelectBox from "@/features/github/components/GitHubSelectBox";

type CurrentLanguage = "ko" | "en";

interface RankingFilterProps {
  currentLanguage: CurrentLanguage;
  selectedLanguage: string;
  selectedLocation: string;
  onLanguageChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

const languageOptions = {
  ko: [
    { value: "all", label: "전체 언어" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
  ],
  en: [
    { value: "all", label: "All languages" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
  ],
};

const locationOptions = {
  ko: [
    { value: "all", label: "전체 지역" },
    { value: "south korea", label: "South Korea" },
    { value: "japan", label: "Japan" },
    { value: "united states", label: "United States" },
    { value: "germany", label: "Germany" },
    { value: "india", label: "India" },
  ],
  en: [
    { value: "all", label: "All locations" },
    { value: "south korea", label: "South Korea" },
    { value: "japan", label: "Japan" },
    { value: "united states", label: "United States" },
    { value: "germany", label: "Germany" },
    { value: "india", label: "India" },
  ],
};

const RankingFilter = ({
  currentLanguage,
  selectedLanguage,
  selectedLocation,
  onLanguageChange,
  onLocationChange,
}: RankingFilterProps) => {
  return (
    <section className="mx-auto mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:grid-cols-2">
      <GitHubSelectBox
        label=""
        ariaLabel={currentLanguage === "ko" ? "언어 필터" : "Language filter"}
        value={selectedLanguage}
        options={languageOptions[currentLanguage]}
        onChange={onLanguageChange}
      />

      <GitHubSelectBox
        label=""
        ariaLabel={currentLanguage === "ko" ? "지역 필터" : "Location filter"}
        value={selectedLocation}
        options={locationOptions[currentLanguage]}
        onChange={onLocationChange}
      />
    </section>
  );
};

export default RankingFilter;
