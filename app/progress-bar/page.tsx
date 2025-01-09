import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "progress-bar";
const FILES = ["progress-bar-slow-component-demo", "progress-bar-link-demo"];

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
