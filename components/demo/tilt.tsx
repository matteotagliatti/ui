import { Tilt } from "@/registry/default/components/tilt";

export default function TiltCard1() {
  return (
    <Tilt isRevese>
      <div className="flex w-[270px] flex-col overflow-hidden rounded-[12px] border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://placehold.co/400x600/000000/FFF"
          alt="img"
          className="h-48 w-full object-cover"
        />
        <div className="p-2">
          <h1 className="font-medium">Title</h1>
          <p>Description</p>
        </div>
      </div>
    </Tilt>
  );
}
