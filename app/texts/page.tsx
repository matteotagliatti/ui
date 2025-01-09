import DemoComponent from "@/components/demo/demo-component";
import { PageContainer } from "@/components/demo/page-container";

const DIR = "texts";
const FILES = [
  "random-letter-swap-hover",
  "vertical-cut-reveal",
  "text-rotate",
  "underline-to-background",
  "typewriter",
  "reveal",
  "underline-animation",
  "text-morph-button",
  "text-morph-input",
  "text-animate",
  "number-ticker",
  "text-morph",
];

export default async function TextsPage() {
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
