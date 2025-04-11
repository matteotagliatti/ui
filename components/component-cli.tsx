"use client";

import { useConfig } from "@/hooks/use-config";
import { CopyButton } from "@/components/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { site } from "@/lib/const";
import { PackageManager } from "@/lib/types";

export function ComponentCLI({ name }: { name: string }) {
  const [config, setConfig] = useConfig();
  const packageManager = config.packageManager || "npm";

  const commands = {
    pnpm: `pnpm dlx shadcn@latest add https://${site.url}/r/${name}.json`,
    npm: `npx shadcn@latest add https://${site.url}/r/${name}.json`,
    yarn: `npx shadcn@latest add https://${site.url}/r/${name}.json`,
    bun: `bunx --bun shadcn@latest add https://${site.url}/r/${name}.json`,
  };

  return (
    <div className="relative">
      <Tabs
        value={packageManager}
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as PackageManager,
          });
        }}
        className="rounded-md bg-zinc-950 dark:bg-zinc-900"
      >
        <TabsList className="dark h-auto justify-start border-b bg-transparent py-0">
          <TabsTrigger
            className="data-[state=active]:after:bg-primary relative px-3 py-3 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-none"
            value="pnpm"
          >
            pnpm
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:after:bg-primary relative px-3 py-3 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-none"
            value="npm"
          >
            npm
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:after:bg-primary relative px-3 py-3 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-none"
            value="yarn"
          >
            yarn
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:after:bg-primary relative px-3 py-3 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-none"
            value="bun"
          >
            bun
          </TabsTrigger>
        </TabsList>
        {Object.entries(commands).map(([pkg, command]) => (
          <TabsContent className="m-0" key={pkg} value={pkg}>
            <pre className="overflow-auto p-4 font-mono text-[12.8px] text-zinc-100">
              {command}
            </pre>
          </TabsContent>
        ))}
      </Tabs>
      <CopyButton
        componentSource={commands[packageManager as keyof typeof commands]}
        className="top-1 right-1  "
      />
    </div>
  );
}
