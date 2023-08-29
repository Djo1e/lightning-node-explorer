import classNames from "classnames";

interface StatusChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: "success" | "error";
}

const variantMap = {
  success: "bg-green-500/10 text-green-400 ring-green-500/20",
  error: "bg-red-400/10 text-red-400 ring-red-400/20",
};

export function StatusChip({ children, variant, ...props }: StatusChipProps) {
  return (
    <span
      {...props}
      className={classNames(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
        variantMap[variant]
      )}
    >
      {children}
    </span>
  );
}
