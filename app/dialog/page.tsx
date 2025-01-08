import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "dialog";
const FILES = [
  "dialog-morphing-basic",
  "dialog-morphing-basic-2",
  "dialog-stack-demo",
  "dialog-elevated-basic",
  "dialog-elevated-stacked",
  "dialog-elevated-shared",
];

export default async function DialogPage() {
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
