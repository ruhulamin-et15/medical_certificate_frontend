import React, { FC, ReactNode } from "react";

interface HeaderProps {
  children: string | ReactNode;
  className?: string;
  center?: boolean;
  large?: boolean;
}
const Header: FC<HeaderProps> = ({ center, children, className, large }) => {
  return (
    <div
      className={`${className && className} ${
        center && "mx-auto text-center w-full inline-block"
      } ${
        large ? "text-3xl md:text-[2.5rem]" : "!text-2xl md:text-3xl"
      } text-primary font-bold font-jost `}
    >
      {children}
    </div>
  );
};

export default Header;
