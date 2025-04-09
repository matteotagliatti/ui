import { readComponentSource } from "@/lib/server";
import { RegistryItem } from "shadcn/registry";
import { CodeBlock } from "./code-block";
import { ComponentCard } from "./component-card";
import ComponentDetails from "./component-details";
import ComponentLoader from "./component-loader";
import { ComponentCategory } from "@/lib/types";

interface Props {
  component: RegistryItem;
  category: ComponentCategory;
}

export async function Component({ component, category }: Props) {
  const source = await readComponentSource(component.name);

  console.log("source", source);

  return (
    <ComponentCard key={component.name}>
      <ComponentLoader key={component.name} component={component} />
      <ComponentDetails name={component.name}>
        <CodeBlock lang="tsx">{source || ""}</CodeBlock>
      </ComponentDetails>
    </ComponentCard>
  );
}
