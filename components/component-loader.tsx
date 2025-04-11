import { ComponentType } from "react";
import type { RegistryItem } from "shadcn/registry";

interface Props {
  component: RegistryItem;
}

export async function ComponentLoader<TProps extends object>({
  component,
  ...props
}: Props & TProps) {
  if (!component?.name) {
    return null;
  }

  try {
    const Component = (await import(`@/components/demo/${component.name}`))
      .default as ComponentType<TProps>;
    return <Component {...(props as TProps)} />;
  } catch (error) {
    console.error(`Failed to load component ${component.name}:`, error);
    return null;
  }
}
