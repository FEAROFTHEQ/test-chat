interface ButtonProps {
  text: string;
  className: string;
  children?: React.ReactNode;
}

export default function Button({ text, className, children }: ButtonProps) {
  return (
    <button className={className}>{text.length > 0 ? text : children}</button>
  );
}
