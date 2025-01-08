import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "random";
const FILES = [
  "disclosure-simple",
  "disclosure-custom",
  "tabs-with-transition-panel",
  "card-with-transition-panel",
  "image-comparison-basic",
  "image-comparison-with-hover",
  "scroll-progress-basic",
  "scroll-progress-gradient",
  "basic-in-view",
  "tilt-card",
  "data-list-horizontal",
  "data-list-vertical",
];

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
