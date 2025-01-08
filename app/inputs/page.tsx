import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "inputs";
const FILES = [
  "input-with-icon",
  "input-with-text",
  "input-with-text-inner",
  "input-with-icon-text",
  "input-with-select",
  "input-with-button",
  "password-input",
  "password-input-with-infos",
  "input-with-clear-button",
  "input-with-label-animation",
  "search-input",
  "autocomplete",
  "color-picker",
  "timestamp",
  "tags-input",
  "input-with-tags",
  "input-with-tags-inner",
  "input-number-with-buttons",
  // "time-input", hydration error in react aria time component
  "date-picker",
  "date-picker-range",
  "phone-input",
  "phone-input-with-search",
  "dropzone",
  "time-picker",
  "datetime-picker",
  "datetime-picker-2",
  "datetime-picker-3",
];

export default async function InputsPage() {
  return (
    <PageContainer className="pb-[10rem]">
      {FILES.map((componentName) => {
        return (
          <DemoComponent
            key={componentName}
            directory={DIR}
            componentName={componentName}
          />
        );
      })}
    </PageContainer>
  );
}
