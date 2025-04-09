import { ComponentType } from "react";
import type { RegistryItem } from "shadcn/registry";

interface Props {
  component: RegistryItem;
}

export default async function ComponentLoader<TProps extends object>({
  component,
  ...props
}: Props & TProps) {
  if (!component?.name) {
    return null;
  }

  try {
    const Component = (
      await import(`@/registry/default/components/${component.name}`)
    ).default as ComponentType<TProps>;

    console.log(Component);

    return <Component {...(props as TProps)} />;
  } catch (error) {
    console.error(`Failed to load component ${component.name}:`, error);
    return null;
  }
}
