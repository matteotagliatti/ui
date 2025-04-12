import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps {
  name: string;
  className: string;
  background?: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[13rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: BentoCardProps) {
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-card border-border border shadow-sm",
        className,
      )}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        <Icon className="text-foreground/80 h-12 w-12 origin-left transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="text-foreground text-xl font-semibold">{name}</h3>
        <p className="text-muted-foreground max-w-lg">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <a
          className={buttonVariants({ variant: "default", size: "sm" })}
          href={href}
        >
          {cta}
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
      <div className="group-hover:bg-accent/30 pointer-events-none absolute inset-0 transition-all duration-300" />
    </div>
  );
}
