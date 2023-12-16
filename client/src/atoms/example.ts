import { atom, selector } from "recoil";

export const counterState = atom<number>({
  key: "counterState",
  default: 0,
});

export const squaredState = selector({
  key: "squaredState",
  get: ({ get }) => {
    const count = get(counterState);
    return count * count;
  },
});
