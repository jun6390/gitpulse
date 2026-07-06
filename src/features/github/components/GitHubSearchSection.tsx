import GitHubSearchForm from "./GitHubSearchForm";

interface GitHubSearchSectionProps {
  placeholder: string;
  buttonText: string;
  loadingText: string;
  isLoading: boolean;
  initialUsername: string;
  errorMessage?: string;
  onSearch: (username: string) => void;
  onClear: () => void;
}

const GitHubSearchSection = ({
  placeholder,
  buttonText,
  loadingText,
  isLoading,
  initialUsername,
  errorMessage,
  onSearch,
  onClear,
}: GitHubSearchSectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <GitHubSearchForm
        placeholder={placeholder}
        buttonText={buttonText}
        loadingText={loadingText}
        isLoading={isLoading}
        initialUsername={initialUsername}
        onSearch={onSearch}
        onClear={onClear}
      />

      {errorMessage && (
        <p className="text-center text-sm font-medium text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default GitHubSearchSection;
