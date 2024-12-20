import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "checks-radios-switches";
const FILES = ["fancy-switch-horizontal", "fancy-switch-vertical"];

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
