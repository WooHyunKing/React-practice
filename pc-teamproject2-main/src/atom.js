import { atom } from "recoil";

export const HistoryAtom = atom({
  key: "HistoryAtom",
  default: [],
});

export const LikeAtom = atom({
  key: "LikeAtom",
  default: [],
});

export default { HistoryAtom, LikeAtom };
