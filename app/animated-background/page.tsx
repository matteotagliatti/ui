import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "animated-background";
const FILES = [
  "animated-tabs",
  "animated-segment",
  "animated-tabs-hover",
  "animated-card-background",
];

export default async function AnimatedBackgroundPage() {
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
