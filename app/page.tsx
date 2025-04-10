import { Component } from "@/components/component";
import { PageGrid } from "@/components/page-grid";
import { components } from "@/lib/const";

export default async function Home() {
  return (
    <PageGrid>
      {components.map((component) => (
        <Component key={component.name} component={component} />
      ))}
    </PageGrid>
  );
}
