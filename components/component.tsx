import { readComponentSource } from "@/lib/server";
import { CodeBlock } from "./code-block";
import { ComponentCard } from "./component-card";
import { ComponentDetails } from "./component-details";
import { ComponentLoader } from "./component-loader";
import { MyRegistryItem } from "@/lib/types";
import { ComponentCLI } from "./component-cli";

interface Props {
  component: MyRegistryItem;
}

export async function Component({ component }: Props) {
  const source = await readComponentSource(component.name);

  return (
    <ComponentCard component={component} key={component.name}>
      <ComponentLoader component={component} />
      <ComponentDetails component={component}>
        <ComponentCLI name={component.name} />
        <CodeBlock code={source || ""} lang="tsx" />
      </ComponentDetails>
    </ComponentCard>
  );
}
