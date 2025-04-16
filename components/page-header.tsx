import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  className?: string;
}

export function PageHeader({ title, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-16 text-center", className)}>
      <h1 className="text-foreground mb-3 text-2xl font-bold tracking-tight">
        {title}
      </h1>
    </div>
  );
}
