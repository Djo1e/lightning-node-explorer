interface PaginationButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export function PaginationButton({
  className,
  children,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      className="flex items-center text-white hover:text-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  );
}
