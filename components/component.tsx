import { readComponentSource } from "@/lib/server";
import { CodeBlock } from "./code-block";
import { ComponentCard } from "./component-card";
import { ComponentDetails } from "./component-details";
import { ComponentLoader } from "./component-loader";
import { ComponentPath, MyRegistryItem } from "@/lib/types";
import { ComponentCLI } from "./component-cli";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface Props {
  component: MyRegistryItem;
}

export async function Component({ component }: Props) {
  const source = await readComponentSource(
    component.name,
    ComponentPath.registry
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

          {component.usage && (
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
