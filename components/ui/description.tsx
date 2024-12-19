export function Description({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-2 text-xs text-muted-foreground"
      role="region"
      aria-live="polite"
    >
      {children}
    </p>
  );
}
