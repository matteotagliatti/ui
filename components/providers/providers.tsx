import { SidebarProvider } from "../ui/sidebar";
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
      <SidebarProvider defaultOpen={sidebarDefaultOpen}>
        {children}
      </SidebarProvider>
    </ThemeProvider>
  );
}
