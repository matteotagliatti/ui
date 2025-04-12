"use client";

import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@/registry/default/components/disclosure";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function DisclosureDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const imageVariants = {
    collapsed: { scale: 1, filter: "blur(0px)" },
    expanded: { scale: 1.1, filter: "blur(3px)" },
  };

  const contentVariants = {
    collapsed: { opacity: 0, y: 0 },
    expanded: { opacity: 1, y: 0 },
  };

  const transition = {
    type: "spring",
    stiffness: 26.7,
    damping: 4.1,
    mass: 0.2,
  };

  return (
    <div className="flex items-start gap-4">
      {/* Simple */}
      <Disclosure className="border-border w-[250px] rounded-md border px-3">
        <DisclosureTrigger>
          <button className="w-full py-2 text-left text-sm" type="button">
            Show more
          </button>
        </DisclosureTrigger>
        <DisclosureContent>
          <div className="overflow-hidden pb-3">
            <div className="pt-1 font-mono text-sm">
              <p>
                This example demonstrates how you can use{" "}
                <strong className="font-bold">Disclosure</strong> component.
              </p>
              <pre className="bg-muted mt-2 rounded-md p-2 text-xs">
                {`function DisclosureBasic() {\n  return (\n    <Disclosure>\n      <DisclosureTrigger>\n        <button type='button'>\n          Show more\n        </button>\n      </DisclosureTrigger>\n      <DisclosureContent>\n        <div>hey</div>\n      </DisclosureContent>\n    </Disclosure>\n  );`}
              </pre>
            </div>
          </div>
        </DisclosureContent>
      </Disclosure>

      {/* With image */}
      <div className="relative h-[350px] w-[290px] overflow-hidden rounded-xl">
        <div onClick={() => setIsOpen(!isOpen)}>
          <motion.img
            src="https://images.beta.cosmos.so/5b21c112-ed1d-45cd-baf0-38186a15af8e?format=jpeg"
            alt="image"
            className="pointer-events-none h-auto w-full select-none"
            animate={isOpen ? "expanded" : "collapsed"}
            variants={imageVariants}
            transition={transition}
          />
        </div>
        <Disclosure
          onOpenChange={setIsOpen}
          open={isOpen}
          className="bg-card absolute right-0 bottom-0 left-0 rounded-xl px-4 pt-2"
          variants={contentVariants}
          transition={transition}
        >
          <DisclosureTrigger>
            <button
              className="text-card-foreground w-full pb-2 text-left text-base font-medium"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              lesothers.studio
            </button>
          </DisclosureTrigger>
          <DisclosureContent>
            <div className="text-muted-foreground flex flex-col pb-4 text-[13px]">
              <p>Lorem Ipsum Dolor Sit Amet 🏔️</p>
              <p className="line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                in dui mauris. Vivamus hendrerit arcu sed erat molestie
                vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh
                porttitor. Ut in nulla enim. Phasellus{" "}
                <strong className="font-medium">molestie magna</strong> non est
                bibendum non venenatis nisl tempor. Suspendisse dictum feugiat
                nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id
                metus massa, ut blandit odio. Proin quis tortor orci. Etiam at
                risus et justo dignissim congue. Donec congue lacinia dui, a
                porttitor lectus condimentum laoreet.
              </p>
              <div className="mt-3">
                <Button className="w-full" variant="secondary" type="button">
                  Learn More
                </Button>
              </div>
            </div>
          </DisclosureContent>
        </Disclosure>
      </div>
    </div>
  );
}
