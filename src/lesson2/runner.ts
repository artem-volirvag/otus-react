import { parser } from "./parser";

import { firstPrioritiesCalc, secondPrioritiesCalc } from "./engine";
import { MathPriorities } from "./mathOperators";

export const runner = (line: string): number => {
  const stack = parser(line);

  if (stack === null) {
    throw new TypeError("Unexpected string");
  }

  const zeroPrioritiesRes = firstPrioritiesCalc(stack, MathPriorities.ZERO);

  if (zeroPrioritiesRes.length === 1) {
    return Number(zeroPrioritiesRes[0]);
  }

  const firstPrioritiesRes = firstPrioritiesCalc(
    zeroPrioritiesRes,
    MathPriorities.FIRST
  );

  if (firstPrioritiesRes.length === 1) {
    return Number(firstPrioritiesRes[0]);
  }

  return secondPrioritiesCalc(firstPrioritiesRes);
};
