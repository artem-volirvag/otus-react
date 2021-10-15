import { ParsedLineType } from "./parser";
import { isNumber } from "./helpers";
import {
  mathOperators,
  mathOperatorsPriorities,
  mathOperatorsOne,
  MathPriorities,
} from "./mathOperators";

export const firstPrioritiesCalc = (
  stack: ParsedLineType,
  priority: MathPriorities.ZERO | MathPriorities.FIRST
): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];

    if (
      !isNumber(String(nextItem)) &&
      !!mathOperatorsOne[nextItem] &&
      mathOperatorsPriorities[nextItem] === priority
    ) {
      result = [
        ...result.slice(0, -1),
        mathOperatorsOne[nextItem](Number(item)),
      ];
    } else if (
      !isNumber(String(item)) &&
      mathOperatorsPriorities[item] === priority
    ) {
      if (!mathOperators[item]) {
        throw new TypeError("Unexpected stack!");
      }
      result = [
        ...result.slice(0, -2),
        mathOperators[item](Number(prevItem), Number(nextItem)),
      ];
    } else {
      result.push(nextItem);
    }

    return result;
  }, []);

export const secondPrioritiesCalc = (stack: ParsedLineType): number =>
  stack.reduce<number>((result, nextItem, key) => {
    const item = stack[key - 1];

    if (mathOperatorsPriorities[item] === MathPriorities.FIRST) {
      throw new TypeError("Unexpected stack!");
    }

    if (
      !isNumber(String(item)) &&
      mathOperatorsPriorities[item] === MathPriorities.SECOND
    ) {
      result = mathOperators[item](Number(result), Number(nextItem));
    }

    return result;
  }, Number(stack[0]));
