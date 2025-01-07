import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "carousels";
const FILES = ["testimonials-card", "testimonials"];

export default async function InputsPage() {
  return (
    <PageContainer className="sm:grid-cols-1 lg:grid-cols-1">
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
