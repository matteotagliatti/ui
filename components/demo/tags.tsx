"use client";

import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from "@/registry/default/components/tags";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { InputContainer } from "../input-container";
import { Label } from "../ui/label";

const tags = [
  { id: "react", label: "React" },
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "nextjs", label: "Next.js" },
  { id: "vuejs", label: "Vue.js" },
  { id: "angular", label: "Angular" },
  { id: "svelte", label: "Svelte" },
];

export default function TagsDemo() {
  const [selected, setSelected] = useState<string[]>([]);

  const handleRemove = (value: string) => {
    if (!selected.includes(value)) {
      return;
    }

    setSelected((prev) => prev.filter((v) => v !== value));
  };

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      handleRemove(value);
      return;
    }

    setSelected((prev) => [...prev, value]);
  };

  return (
    <InputContainer>
      <Label htmlFor="tags">Tags</Label>
      <Tags>
        <TagsTrigger>
          {selected.map((tag) => (
            <TagsValue key={tag} onRemove={() => handleRemove(tag)}>
              {tags.find((t) => t.id === tag)?.label}
            </TagsValue>
          ))}
        </TagsTrigger>
        <TagsContent>
          <TagsInput placeholder="Search tag..." />
          <TagsList>
            <TagsEmpty />
            <TagsGroup>
              {tags.map((tag) => (
                <TagsItem key={tag.id} onSelect={handleSelect} value={tag.id}>
                  {tag.label}
                  {selected.includes(tag.id) && (
                    <CheckIcon className="text-muted-foreground" size={14} />
                  )}
                </TagsItem>
              ))}
            </TagsGroup>
          </TagsList>
        </TagsContent>
      </Tags>
    </InputContainer>
  );
}
