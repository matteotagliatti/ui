import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Config } from "@/lib/types";

const configAtom = atomWithStorage<Config>("config", {
  packageManager: "pnpm",
});

export function useConfig() {
  return useAtom(configAtom);
}
