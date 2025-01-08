import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "others";
const FILES = [
  "disclosure-simple",
  "disclosure-custom",
  "tabs-with-transition-panel",
  "card-with-transition-panel",
];

export default async function OthersPage() {
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
