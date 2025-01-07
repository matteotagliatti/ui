import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "data-list";
const FILES = ["data-list-horizontal", "data-list-vertical"];

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
