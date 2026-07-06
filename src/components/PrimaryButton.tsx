import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentProps,
} from "react";

const primaryButtonStyles =
  "cursor-pointer rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600";

const getClassName = (className?: string) =>
  `${primaryButtonStyles}${className ? ` ${className}` : ""}`;

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton = ({
  className,
  type = "button",
  ...props
}: PrimaryButtonProps) => (
  <button type={type} className={getClassName(className)} {...props} />
);

type PrimaryButtonLinkProps = ComponentProps<typeof Link>;

export const PrimaryButtonLink = ({
  className,
  ...props
}: PrimaryButtonLinkProps) => (
  <Link className={getClassName(className)} {...props} />
);

type PrimaryButtonAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const PrimaryButtonAnchor = ({
  className,
  ...props
}: PrimaryButtonAnchorProps) => (
  <a className={getClassName(className)} {...props} />
);

export default PrimaryButton;
