// Задание 1
export type OriginalTeam = {
  size: number;
  name: string;
  league: string;
};

export type ExpectedTeam = {
  name: string;
  league: string;
  roster: number;
};

export const originalTeamToExpectedTeam = (
  originalTeam: OriginalTeam
): ExpectedTeam => {
  const { size, ...expectedTeam } = originalTeam;
  return { ...expectedTeam, roster: 25, name: "New York Badgers" };
};

// // Задание 2
// type SomeArray = Array<number | string>;

const originalArrayToExpectedArray = (
  originalArray: SomeArray
  // eslint-disable-next-line
  // @ts-ignore
): SomeArray => {
  //
};

// // Задание 3

// export type Team = {
//   name: string;
//   captain: {
//     name: string;
//     age: number;
//   };
// };

export const originalTeamToExpectedTeam2 = (
  originalTeam: Team
  // eslint-disable-next-line
  // @ts-ignore
): Team => {
  //
};
