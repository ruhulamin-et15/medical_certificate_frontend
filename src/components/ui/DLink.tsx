// components/DLink.tsx
import Link, { LinkProps } from "next/link";
import React from "react";

// Extend LinkProps and add custom children prop for text/content
interface DLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string; // optional for customizing styles if needed
}

// Define the DLink component, passing in all LinkProps with custom styling
const DLink: React.FC<DLinkProps> = ({
  href,
  children,
  className,
  ...props
}) => {
  return (
    <Link
      href={href}
      className={`text-primary underline hover:no-underline hover:text-primary-hover ${
        className || ""
      }`}
      {...props} // Pass remaining props to Link
    >
      {children}
    </Link>
  );
};

export default DLink;
