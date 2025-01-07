import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "selects";
const FILES = [
  "select-country",
  "select-pills",
  "select-currency",
  "combobox-single",
  "combobox-multi-select",
  "combobox-multi-select-demo",
  "combobox-multi-select-demo-2",
  "async-select",
  "async-select-with-preloader",
];

export default async function InputsPage() {
  return (
    <PageContainer>
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
