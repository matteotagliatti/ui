import { SwitchFancy } from "@/registry/default/components/switch-fancy";

const options = [
  { label: "Opt. 1", value: "option1" },
  { label: "Opt. 2", value: "option2" },
  { label: "Opt. 3", value: "option3" },
];

export default function SwitchFancyDemo() {
  return (
    <div className="w-fit space-y-4">
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
