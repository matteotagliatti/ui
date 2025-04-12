import { Calendar } from "@/components/ui/calendar";
import { BentoCard, BentoGrid } from "@/registry/default/components/bento";
import { BellIcon, CalendarIcon, Home, SettingsIcon, User } from "lucide-react";

const features = [
  {
    Icon: SettingsIcon,
    name: "Settings",
    description: "Go to the settings page.",
    href: "#",
    cta: "Learn more",
    className: "row-span-2 lg:col-span-1",
  },
  {
    Icon: Home,
    name: "Home",
    description: "Go to the home page.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Go to the notifications page.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: User,
    name: "About",
    description: "Go to the about page.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Go to the calendar page.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute top-10 right-0 origin-top rounded-md border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105"
      />
    ),
  },
];

export default function Bento() {
  return (
    <BentoGrid>
      {features.map((feature, index) => (
        <BentoCard key={index} {...feature} />
      ))}
    </BentoGrid>
  );
}
