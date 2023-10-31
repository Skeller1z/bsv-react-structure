import { atom } from "recoil";

export const ThisIsRecoilFileForDev = atom<boolean>({
  key: "ThisIsRecoilFileForDev",
  default: true,
});
