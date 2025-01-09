import { ProgressBarProvider } from "../progress-bar/progress-bar";
import { SidebarProvider } from "../ui/sidebar";
import { ReactQueryProvider } from "./react-query-provider";
import { ThemeProvider } from "./theme-provider";

interface ProvidersProps {
  children: React.ReactNode;
  sidebarDefaultOpen: boolean;
}

export function Providers({ children, sidebarDefaultOpen }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ReactQueryProvider>
        <ProgressBarProvider>
          <SidebarProvider defaultOpen={sidebarDefaultOpen}>
            {children}
          </SidebarProvider>
        </ProgressBarProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
