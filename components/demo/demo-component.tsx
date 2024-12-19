import { cn } from "@/lib/utils";
import CopyButton from "./copy-button";
import { readComponentSource } from "./read-component-source";

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
      <CopyButton componentSource={source || ""} />
    </div>
  );
}
