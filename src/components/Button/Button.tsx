interface ButtonProps {
  text: string;
  className: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  text,
  className,
  children,
  handleClick,
  type = "button",
}: ButtonProps) {
  return (
    <button onClick={handleClick} className={className} type={type}>
      {text.length > 0 ? text : children}
    </button>
  );
}
