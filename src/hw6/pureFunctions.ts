// // Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
  return teams.reduce((prev, curr) => (curr.score > prev.score ? curr : prev), {
    name: "",
    score: 0,
  }).name;
};

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
  return (
    "?" +
    Object.entries(qsObj)
      .map(([key, val]) => `${key}=${val}`)
      .join("&")
  );
};

// Задание 3
export const parseQs = (qs: string): QsObj => {
  return qs
    .substr(1)
    .split("&")
    .map((s) => s.split("="))
    .reduce((obj, param) => ({ ...obj, [param[0]]: param[1] }), {});
};
