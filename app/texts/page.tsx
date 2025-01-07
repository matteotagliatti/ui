import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "texts";
const FILES = [
  "random-letter-swap-hover",
  "vertical-cut-reveal",
  "text-rotate",
  "underline-to-background",
  "typewriter",
];

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
