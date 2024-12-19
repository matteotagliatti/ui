import DemoComponent from "@/components/demo/demo-component";
import { Home } from "lucide-react";

const DIR = "inputs";
const FILES = [
  "input-with-icon",
  "input-with-text",
  "input-with-text-inner",
  "input-with-icon-text",
  "input-with-select",
  "input-with-button",
  "password-input",
];

export default async function InputsPage() {
  return (
    <div className="grid grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-3 [&>*]:relative [&>*]:px-1 [&>*]:py-12 [&>*]:before:absolute [&>*]:before:bg-border/70 [&>*]:before:[block-size:100vh] [&>*]:before:[inline-size:1px] [&>*]:before:[inset-block-start:0] [&>*]:before:[inset-inline-start:-1px] [&>*]:after:absolute [&>*]:after:bg-border/70 [&>*]:after:[block-size:1px] [&>*]:after:[inline-size:100vw] [&>*]:after:[inset-block-start:-1px] [&>*]:after:[inset-inline-start:0] sm:[&>*]:px-8 xl:[&>*]:px-12">
      {FILES.map((componentName) => {
        return (
          <DemoComponent
            key={componentName}
            directory={DIR}
            componentName={componentName}
            icon={<Home size={16} strokeWidth={2} aria-hidden="true" />}
          />
        );
      })}
    </div>
  );
}
