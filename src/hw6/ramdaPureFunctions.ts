import R, { compose } from "ramda";

// // Задание 1
export type Team = { name: string; score: number };

export const getTopName = compose(
  R.prop("name"),
  R.reduce(
    (acc: Team, value: Team) => R.maxBy((t: Team) => t.score, acc, value),
    { name: "", score: 0 }
  )
);

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = compose(
  R.join("&"),
  R.adjust(0, (v: string) => `?${v}`),
  R.map((v: string[]) => `${v[0]}=${v[1]}`),
  R.toPairs()
);

// Задание 3
export const parseQs = compose(
  R.fromPairs(),
  R.map((v: string) => R.split("=", v)),
  R.split("&"),
  R.replace("?", "")
);
