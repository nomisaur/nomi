import { useState } from "react";

export const Clicker = ({
  children,
  onClick,
  clicked,
  className = "",
  ...rest
}: {
  children: any;
  onClick?: () => void;
  clicked?: Boolean;
  className?: string;
  [x: string]: any;
}) => {
  const [wasClicked, setWasClicked] = useState(clicked);
  return (
    <button
      onClick={() => {
        setWasClicked(true);
        onClick?.();
      }}
      className={`${className} ${
        wasClicked ? "border-white" : "border-transparent"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};
