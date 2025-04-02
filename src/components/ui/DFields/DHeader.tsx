import React, { ReactNode } from "react";

const DHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={`text-2xl font-bold my-5 border-b border-b-black/20 ${
        className && className
      }`}
    >
      {children}
    </h1>
  );
};

export default DHeader;
