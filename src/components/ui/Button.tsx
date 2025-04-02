import React from "react";

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "big" | "static";
}

const Button: React.FC<BtnProps> = ({ children, className, size, ...rest }) => {
  if (size === "big") {
    return (
      <button
        className={`${
          className ? className : ""
        } bg-button focus:ring-button/30  focus:ring-4 w-full py-4 hover:bg-secondary btn text-white px-8 rounded-md text-lg  duration-300 transition-all`}
        {...rest}
      >
        {children}
      </button>
    );
  } else if (size === "static") {
    return (
      <button
        className={`${
          className ? className : "text-sm"
        }  rounded-sm py-1  px-4 border hover:bg-slate-100 transition-all `}
        {...rest}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        className={`${
          className ? className : "font-semibold"
        } bg-button focus:ring-button/30 transition-all  focus:ring-4 rounded-md py-2 px-10 btn text-white  `}
        {...rest}
      >
        {children}
      </button>
    );
  }
};

export default Button;
