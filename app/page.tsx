import { MENU_ITEMS } from "@/components/demo/app-sidebar";
import { PageContainer } from "@/components/demo/page-container";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  return (
    <PageContainer>
      {MENU_ITEMS.map((item) => (
        <React.Fragment key={item.title}>
          {item.items.map((subItem) => (
            <div
              key={subItem.title}
              className="flex justify-center items-center w-full"
            >
              <a href={subItem.href}>
                <Button>{subItem.title}</Button>
              </a>
            </div>
          ))}
        </React.Fragment>
      ))}
    </PageContainer>
  );
}
