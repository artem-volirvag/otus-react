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

// Задание 2
type SomeArray = Array<number | string>;

export const originalArrayToExpectedArray = (
  originalArray: SomeArray
): SomeArray => {
  const [, , ...expectedArray] = originalArray;
  return ["two", ...expectedArray, 5];
};

// // Задание 3
export type Team = {
  name: string;
  captain: {
    name: string;
    age: number;
  };
};

export const originalTeamToExpectedTeam2 = (originalTeam: Team): Team => {
  return {
    ...originalTeam,
    captain: {
      ...originalTeam.captain,
      age: 28,
    },
  };
};
