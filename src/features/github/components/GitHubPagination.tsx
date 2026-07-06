"use client";

import { type FormEvent, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface GitHubPaginationProps {
  currentPage: number;
  totalPages: number;
  firstLabel: string;
  previousLabel: string;
  nextLabel: string;
  lastLabel: string;
  pageLabel: string;
  onPageChange: (page: number) => void;
}

const GitHubPagination = ({
  currentPage,
  totalPages,
  firstLabel,
  previousLabel,
  nextLabel,
  lastLabel,
  pageLabel,
  onPageChange,
}: GitHubPaginationProps) => {
  const pageInputRef = useRef<HTMLInputElement>(null);

  if (totalPages <= 1) return null;

  const moveToInputPage = () => {
    const rawPage = pageInputRef.current?.value.trim() ?? "";

    if (!rawPage) {
      if (pageInputRef.current) {
        pageInputRef.current.value = String(currentPage);
      }
      return;
    }

    const parsedPage = Number(rawPage);

    if (!Number.isFinite(parsedPage)) {
      if (pageInputRef.current) {
        pageInputRef.current.value = String(currentPage);
      }
      return;
    }

    const nextPage = Math.min(
      totalPages,
      Math.max(1, Math.trunc(parsedPage)),
    );

    if (pageInputRef.current) {
      pageInputRef.current.value = String(nextPage);
    }

    if (nextPage !== currentPage) {
      onPageChange(nextPage);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    moveToInputPage();
  };

  const navigationButtonClass =
    "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-35 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900 sm:h-10 sm:w-10";

  return (
    <div className="mx-auto flex w-full max-w-2xl items-center justify-center gap-2 sm:gap-3">
      <button
        type="button"
        aria-label={firstLabel}
        title={firstLabel}
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        className={navigationButtonClass}
      >
        <ChevronsLeft size={19} aria-hidden="true" />
      </button>

      <button
        type="button"
        aria-label={previousLabel}
        title={previousLabel}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={navigationButtonClass}
      >
        <ChevronLeft size={19} aria-hidden="true" />
      </button>

      <form
        onSubmit={handleSubmit}
        className="flex h-11 min-w-28 items-center justify-center gap-2 rounded-full bg-gray-900 px-4 font-semibold text-white shadow-sm dark:bg-white dark:text-gray-900 sm:h-10"
      >
        <input
          key={currentPage}
          ref={pageInputRef}
          type="number"
          inputMode="numeric"
          min={1}
          max={totalPages}
          defaultValue={currentPage}
          aria-label={pageLabel}
          title={pageLabel}
          onBlur={moveToInputPage}
          onFocus={(event) => event.currentTarget.select()}
          className="w-8 appearance-none bg-transparent text-center text-base outline-none sm:text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="text-gray-400 dark:text-gray-500">/</span>
        <span className="text-sm">{totalPages}</span>
        <button type="submit" className="sr-only">
          {pageLabel}
        </button>
      </form>

      <button
        type="button"
        aria-label={nextLabel}
        title={nextLabel}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={navigationButtonClass}
      >
        <ChevronRight size={19} aria-hidden="true" />
      </button>

      <button
        type="button"
        aria-label={lastLabel}
        title={lastLabel}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        className={navigationButtonClass}
      >
        <ChevronsRight size={19} aria-hidden="true" />
      </button>
    </div>
  );
};

export default GitHubPagination;
