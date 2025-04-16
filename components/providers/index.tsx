import { ProgressBarProvider } from "@/registry/default/components/progress-bar";
import { ReactQueryProvider } from "./query";
import { ThemeProvider } from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ProgressBarProvider>{children}</ProgressBarProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
