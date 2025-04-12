import { codeToHtml, type BundledLanguage } from "shiki";
import { CopyButton } from "./copy-button";

type Props = {
  code: string;
  lang: BundledLanguage;
};

export async function CodeBlock(props: Props) {
  const code = await codeToHtml(props.code, {
    lang: props.lang,
    theme: "github-dark",
  });

  return (
    <div className="relative">
      <CopyButton componentSource={props.code} />
      <div
        className="[&_code]:font-mono [&_code]:text-[13px] [&_pre]:max-h-[250px] [&_pre]:overflow-auto [&_pre]:rounded-lg [&_pre]:!bg-zinc-950 [&_pre]:p-4 [&_pre]:leading-snug md:[&_pre]:max-h-[400px] dark:[&_pre]:!bg-zinc-900"
        dangerouslySetInnerHTML={{ __html: code }}
      ></div>
    </div>
  );
}
