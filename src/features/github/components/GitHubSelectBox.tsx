interface SelectOption {
  value: string;
  label: string;
}

interface GitHubSelectBoxProps {
  label?: string;
  ariaLabel?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

const GitHubSelectBox = ({
  label,
  ariaLabel,
  value,
  options,
  onChange,
}: GitHubSelectBoxProps) => {
  return (
    <label className="flex flex-col gap-2 text-left">
      {label ? (
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </span>
      ) : null}

      <select
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-gray-600"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default GitHubSelectBox;
