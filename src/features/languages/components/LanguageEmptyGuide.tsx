interface LanguageEmptyGuideProps {
  title: string;
  description: string;
}

const LanguageEmptyGuide = ({
  title,
  description,
}: LanguageEmptyGuideProps) => {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950">
      <p className="text-base font-semibold text-gray-900 dark:text-white">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default LanguageEmptyGuide;
