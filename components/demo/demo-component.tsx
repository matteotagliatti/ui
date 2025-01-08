import { cn } from "@/lib/utils";
import CopyButton from "./copy-button";
import { readComponentSource } from "./read-component-source";
import ComponentDetails from "./demo-component-details";
import { CodeBlock } from "./code-block";

interface DemoComponentProps {
  directory: string;
  componentName: string;
  className?: string;
  [key: string]: any;
}

export default async function DemoComponent({
  directory,
  componentName,
  className,
  ...props
}: DemoComponentProps) {
  const Component = (await import(`@/components/${directory}/${componentName}`))
    .default;
  const source = await readComponentSource(directory, componentName);

  return (
    <div className={cn("group/item relative", className)}>
      <Component {...props} />
      <div className="absolute right-2 top-2 flex gap-2">
        <ComponentDetails name={componentName}>
          <div className="relative">
            <CodeBlock lang="tsx">{source || ""}</CodeBlock>
            <CopyButton componentSource={source || ""} />
          </div>
        </ComponentDetails>
      </div>
    </div>
  );
}
