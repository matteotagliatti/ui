import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ComponentCard({ children, className }: Props) {
  return <div className={cn("group/item relative", className)}>{children}</div>;
}
