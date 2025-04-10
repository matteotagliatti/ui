import { Component } from "@/components/component";
import { PageGrid } from "@/components/page-grid";
import { categories } from "@/lib/const";
import { getCategory, getComponentsByCategory } from "@/lib/utils";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategory((await params).category);

  if (!category) {
    return notFound();
  }

  const components = getComponentsByCategory(category.slug);

  return (
    <PageGrid>
      {components.map((component) => (
        <Component key={component.name} component={component} />
      ))}
    </PageGrid>
  );
}
