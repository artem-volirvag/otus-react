import { isNumber } from "./helpers";
import { mathOperators, mathOperatorsOne } from "./mathOperators";

export type ParsedLineType = (number | string)[];

export const parser = (line: string): ParsedLineType | null => {
  const stack = line.split(" ");

  return stack.reduce<ParsedLineType>((result, item, key) => {
    const prevItem = stack[key - 1];

    const isValidNumberPush =
      !isNumber(prevItem) &&
      !mathOperatorsOne.hasOwnProperty(prevItem) &&
      isNumber(item);
    const isValidOperatorPush =
      (isNumber(prevItem) || mathOperatorsOne.hasOwnProperty(prevItem)) &&
      !isNumber(item) &&
      (mathOperators.hasOwnProperty(item) ||
        mathOperatorsOne.hasOwnProperty(item));

    if (isValidNumberPush) {
      result.push(Number(item));
    } else if (isValidOperatorPush) {
      result.push(item);
    } else {
      throw new TypeError("Unexpected string");
    }
    return result;
  }, []);
};
