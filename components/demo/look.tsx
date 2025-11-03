import {
  Look,
  LookContent,
  LookDescription,
  LookImage,
  LookTitle,
  LookTrigger,
} from "@/registry/default/components/look";
import { look } from "@/lib/server";

const Example = async () => {
  const data = await look("https://github.com/matteotagliatti");

  return (
    <div>
      Check out{" "}
      <Look closeDelay={0} openDelay={0}>
        <LookTrigger asChild>
          <a
            className="text-primary font-medium underline"
            href="https://github.com/matteotagliatti"
          >
            @matteotagliatti
          </a>
        </LookTrigger>
        <LookContent className="w-80">
          <LookImage src={data.image ?? ""} />
          <LookTitle>{data.title}</LookTitle>
          <LookDescription>{data.description}</LookDescription>
        </LookContent>
      </Look>{" "}
      on GitHub
    </div>
  );
};

export default Example;
