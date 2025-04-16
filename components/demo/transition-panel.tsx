"use client";

import React, { useEffect, useState } from "react";
import { TransitionPanel } from "@/registry/default/components/transition-panel";
import useMeasure from "react-use-measure";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TransitionPanelDemo() {
  const [ref, bounds] = useMeasure();
  const [direction, setDirection] = useState(1);
  const [cardActiveIndex, setCardActiveIndex] = useState(0);
  const [tabsActiveIndex, setTabsActiveIndex] = useState(0);

  const handleSetActiveIndex = (newIndex: number) => {
    setDirection(newIndex > cardActiveIndex ? 1 : -1);
    setCardActiveIndex(newIndex);
  };

  useEffect(() => {
    if (cardActiveIndex < 0) setCardActiveIndex(0);
    if (cardActiveIndex >= ITEMS.length) setCardActiveIndex(ITEMS.length - 1);
  }, [cardActiveIndex]);

  const isLastCard = cardActiveIndex === ITEMS.length - 1;

  return (
    <div className="space-y-4">
      {/* Card */}
      <div className="bg-muted w-[320px] overflow-hidden rounded-xl border">
        <TransitionPanel
          activeIndex={cardActiveIndex}
          variants={{
            enter: (direction) => ({
              x: direction > 0 ? 364 : -364,
              opacity: 0,
              height: bounds.height > 0 ? bounds.height : "auto",
              position: "initial",
            }),
            center: {
              zIndex: 1,
              x: 0,
              opacity: 1,
              height: bounds.height > 0 ? bounds.height : "auto",
            },
            exit: (direction) => ({
              zIndex: 0,
              x: direction < 0 ? 364 : -364,
              opacity: 0,
              position: "absolute",
              top: 0,
              width: "100%",
            }),
          }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          custom={direction}
        >
          {ITEMS.map((feature, index) => (
            <div key={index} className="px-4 pt-4" ref={ref}>
              <h3 className="mb-0.5 font-medium">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </TransitionPanel>
        <div className="flex justify-between p-4">
          {cardActiveIndex > 0 ? (
            <Button
              variant="outline"
              onClick={() => handleSetActiveIndex(cardActiveIndex - 1)}
            >
              Previous
            </Button>
          ) : (
            <div />
          )}
          <Button
            variant={isLastCard ? "destructive" : "outline"}
            onClick={() =>
              isLastCard ? null : handleSetActiveIndex(cardActiveIndex + 1)
            }
          >
            {isLastCard ? "Close" : "Next"}
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div>
        <div className="mb-4 flex space-x-2">
          {ITEMS.map((item, index) => (
            <Button
              key={index}
              size={"sm"}
              variant={"outline"}
              onClick={() => setTabsActiveIndex(index)}
              className={cn(
                tabsActiveIndex === index
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {item.title}
            </Button>
          ))}
        </div>
        <div className="overflow-hidden border-t">
          <TransitionPanel
            activeIndex={tabsActiveIndex}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            variants={{
              enter: { opacity: 0, y: -50, filter: "blur(4px)" },
              center: { opacity: 1, y: 0, filter: "blur(0px)" },
              exit: { opacity: 0, y: 50, filter: "blur(4px)" },
            }}
          >
            {ITEMS.map((item, index) => (
              <div key={index} className="py-2">
                <h3 className="mb-2 font-medium">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </TransitionPanel>
        </div>
      </div>
    </div>
  );
}

const ITEMS = [
  {
    title: "Home",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "About",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Services",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Contact",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
];
