import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function PageGrid({ children, className }: Props) {
  return (
    <div
      className={cn(
        "-m-px grid grid-cols-1 *:px-1 *:py-12 *:not-first:-ms-px *:not-first:-mt-px sm:*:px-8 lg:grid-cols-3 xl:*:px-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
