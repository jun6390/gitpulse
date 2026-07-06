"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";

interface GitHubSearchFormProps {
  placeholder: string;
  buttonText: string;
  loadingText: string;
  isLoading: boolean;
  initialUsername?: string;
  onSearch: (username: string) => void;
  onClear: () => void;
}

const GitHubSearchFormFields = ({
  placeholder,
  buttonText,
  loadingText,
  isLoading,
  initialUsername = "",
  onSearch,
  onClear,
}: GitHubSearchFormProps) => {
  const [username, setUsername] = useState(initialUsername);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      onClear();
      return;
    }

    onSearch(trimmedUsername);
  };

  const handleChangeUsername = (value: string) => {
    setUsername(value);

    if (!value.trim()) {
      onClear();
    }
  };

  const handleClear = () => {
    setUsername("");
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950 sm:flex-row"
    >
      <div className="relative flex-1">
        <input
          type="text"
          value={username}
          onChange={(e) => handleChangeUsername(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-800 dark:bg-black dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-400 sm:text-sm"
        />

        {username && (
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-sm text-gray-400 transition hover:bg-gray-200 hover:text-gray-700 disabled:cursor-not-allowed dark:hover:bg-gray-800 dark:hover:text-gray-200"
            aria-label="검색어 초기화"
          >
            ×
          </button>
        )}
      </div>

      <PrimaryButton
        type="submit"
        disabled={isLoading}
        className="h-12 px-6 text-sm font-semibold"
      >
        {isLoading ? loadingText : buttonText}
      </PrimaryButton>
    </form>
  );
};

const GitHubSearchForm = (props: GitHubSearchFormProps) => {
  return (
    <GitHubSearchFormFields
      key={props.initialUsername ?? ""}
      {...props}
    />
  );
};

export default GitHubSearchForm;
