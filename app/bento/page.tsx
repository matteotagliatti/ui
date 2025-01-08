import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "bento";
const FILES = ["bento-basic", "bento-custom-background"];

export default async function OthersPage() {
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
