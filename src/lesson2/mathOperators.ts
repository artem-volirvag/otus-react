export type ScalarOperationType = (first: number, second: number) => number;
export type OneOperationType = (first: number) => number;

export const mul: ScalarOperationType = (
  first: number,
  second: number
): number => first * second;

export const div: ScalarOperationType = (
  first: number,
  second: number
): number => first / second;

export const add: ScalarOperationType = (
  first: number,
  second: number
): number => first + second;

export const minus: ScalarOperationType = (
  first: number,
  second: number
): number => first - second;

export const exp: ScalarOperationType = (
  first: number,
  second: number
): number => first ** second;

export const squ: OneOperationType = (first: number): number => first ** 2;
export const factorial: OneOperationType = (first: number): number =>
  first != 1 ? first * factorial(first - 1) : 1;

export const mathOperators: { [key: string]: ScalarOperationType } = {
  "*": mul,
  "/": div,
  "+": add,
  "-": minus,
  "^": exp,
};

export const mathOperatorsOne: { [key: string]: OneOperationType } = {
  "**": squ,
  "!": factorial,
};

export enum MathPriorities {
  ZERO = 0,
  FIRST = 1,
  SECOND = 2,
}

export const mathOperatorsPriorities: { [key: string]: number } = {
  "*": MathPriorities.FIRST,
  "/": MathPriorities.FIRST,
  "+": MathPriorities.SECOND,
  "-": MathPriorities.SECOND,
  "^": MathPriorities.ZERO,
  "**": MathPriorities.ZERO,
  "!": MathPriorities.ZERO,
};
