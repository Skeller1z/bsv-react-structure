import { atom } from "recoil";

export const active = atom<number>({
  key: "active",
  default: 0,
});
