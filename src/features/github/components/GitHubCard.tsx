import { createElement, type HTMLAttributes } from "react";

const cardStyles =
  "border border-gray-200 bg-white shadow-sm transition dark:border-gray-800 dark:bg-gray-950";

const radiusStyles = {
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
} as const;

type GitHubCardElement = "article" | "div" | "p" | "section";
type GitHubCardRadius = keyof typeof radiusStyles;

interface GitHubCardProps extends HTMLAttributes<HTMLElement> {
  as?: GitHubCardElement;
  interactive?: boolean;
  radius?: GitHubCardRadius;
}

const GitHubCard = ({
  as = "div",
  className,
  interactive = false,
  radius = "3xl",
  ...props
}: GitHubCardProps) =>
  createElement(as, {
    className: `${cardStyles} ${radiusStyles[radius]}${
      interactive ? " hover:-translate-y-1 hover:shadow-md" : ""
    }${className ? ` ${className}` : ""}`,
    ...props,
  });

export default GitHubCard;
