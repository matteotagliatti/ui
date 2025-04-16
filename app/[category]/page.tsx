import { Component } from "@/components/component";
import { PageGrid } from "@/components/page-grid";
import { categories } from "@/lib/const";
import { getCategory, getComponentsByCategory } from "@/lib/utils";
import { Category } from "@/lib/types";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";

interface Props {
  params: Promise<{ category: Category }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategory((await params).category);
  if (!category) return notFound();
  const components = getComponentsByCategory(category.slug);

  return (
    <>
      <PageHeader title={category.name} />
      <PageGrid>
        {components.map((component) => (
          <Component
            key={component.name}
            component={component}
            category={category.slug}
          />
        ))}
      </PageGrid>
    </>
  );
}
