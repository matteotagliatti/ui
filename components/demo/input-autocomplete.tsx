"use client";

import { AutoComplete } from "@/registry/default/components/input-autocomplete";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { InputContainer } from "@/components/input-container";

async function getList(filter: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const lowerFilter = filter.toLocaleLowerCase();
  return data
    .filter(({ name }) => name.toLocaleLowerCase().startsWith(lowerFilter))
    .slice(0, 20)
    .map(({ name, id }) => ({
      value: id,
      label: `${name}`,
    }));
}

export default function AutoCompleteDemo() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["data", searchValue],
    queryFn: () => getList(searchValue),
  });

  return (
    <InputContainer>
      <Label>Autocomplete</Label>
      <AutoComplete
        selectedValue={selectedValue}
        onSelectedValueChange={setSelectedValue}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        items={data ?? []}
        isLoading={isLoading}
        emptyMessage="No pokemon found."
        placeholder="Search for a pokemon"
      />
    </InputContainer>
  );
}

const data = [
  {
    name: "Bulbasaur",
    id: "1",
  },
  {
    name: "Ivysaur",
    id: "2",
  },
  {
    name: "Venusaur",
    id: "3",
  },
  {
    name: "Charmander",
    id: "4",
  },
  {
    name: "Charmeleon",
    id: "5",
  },
  {
    name: "Charizard",
    id: "6",
  },
  {
    name: "Squirtle",
    id: "7",
  },
  {
    name: "Wartortle",
    id: "8",
  },
  {
    name: "Blastoise",
    id: "9",
  },
];
