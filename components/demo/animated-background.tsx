import { AnimatedBackground } from "@/registry/default/components/animated-background";
import { MessageCircle, User, WalletCards } from "lucide-react";
import { Button } from "../ui/button";

export default function AnimatedTabs() {
  return (
    <div className="space-y-4">
      {/* Icon */}
      <div className="bg-muted/50 border-border/50 flex w-fit gap-x-2 rounded-xl border p-2">
        <AnimatedBackground
          defaultValue={TABS[0].label}
          className="bg-muted rounded-lg"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {TABS.map((tab) => (
            <Button
              key={tab.label}
              data-id={tab.label}
              variant="ghost"
              size="icon"
            >
              {tab.icon}
            </Button>
          ))}
        </AnimatedBackground>
      </div>
      {/* Label */}
      <div className="flex flex-row">
        <AnimatedBackground
          defaultValue={TABS[0].label}
          className="bg-muted rounded-lg"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {TABS.map((tab, index) => (
            <Button key={index} data-id={tab.label} variant={"ghost"}>
              {tab.label}
            </Button>
          ))}
        </AnimatedBackground>
      </div>
    </div>
  );
}

const TABS = [
  {
    label: "Home",
    icon: <User className="h-5 w-5" />,
  },
  {
    label: "About",
    icon: <MessageCircle className="h-5 w-5" />,
  },
  {
    label: "Contact",
    icon: <WalletCards className="h-5 w-5" />,
  },
];
