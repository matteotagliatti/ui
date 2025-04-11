import { SwitchFancy } from "@/registry/default/components/switch-fancy";

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

export default function SwitchFancyDemo() {
  return (
    <div className="space-y-4 w-fit">
      <SwitchFancy options={options} highlighterClassName="rounded-xl" />
      <SwitchFancy
        options={options}
        className="flex rounded-full"
        radioClassName="mx-2"
        highlighterIncludeMargin={true}
      />
    </div>
  );
}
