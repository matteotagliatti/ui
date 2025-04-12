import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { readComponentSource } from "@/lib/server";
import { ComponentPath, MyRegistryItem } from "@/lib/types";
import { CodeBlock } from "./code-block";
import { ComponentCard } from "./component-card";
import { ComponentCLI } from "./component-cli";
import { ComponentDetails } from "./component-details";
import { ComponentLoader } from "./component-loader";

interface Props {
  component: MyRegistryItem;
}

export async function Component({ component }: Props) {
  const source = await readComponentSource(
    component.name,
    ComponentPath.registry,
  );

  let demoSource: string | null = null;

  if (component.usage) {
    demoSource = await readComponentSource(component.name, ComponentPath.demo);
  }

  return (
    <ComponentCard component={component} key={component.name}>
      <ComponentLoader component={component} />
      <ComponentDetails component={component}>
        <ComponentCLI name={component.name} />
        <Accordion type="single" collapsible defaultValue="source">
          <AccordionItem value="source">
            <AccordionTrigger>Source</AccordionTrigger>
            <AccordionContent>
              <CodeBlock code={source || ""} lang="tsx" />
            </AccordionContent>
          </AccordionItem>

          {demoSource && (
            <AccordionItem value="usage">
              <AccordionTrigger>Usage</AccordionTrigger>
              <AccordionContent className="pb-0">
                <CodeBlock code={demoSource || ""} lang="tsx" />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </ComponentDetails>
    </ComponentCard>
  );
}
