import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "popovers";
const FILES = [
  "popover-with-form",
  "popover-with-form-2",
  "popover-with-menu",
  "floating-action-panel-simple",
  "morphing-popover-basic",
];

export default async function InputsPage() {
  return (
    <PageContainer className="lg:grid-cols-2">
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
