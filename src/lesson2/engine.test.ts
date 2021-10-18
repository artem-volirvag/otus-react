import { firstPrioritiesCalc, secondPrioritiesCalc } from "./engine";
import { MathPriorities } from "./mathOperators";

describe("firstPrioritiesCalc simple cases", () => {
  it("[1, * 32]", () => {
    expect(firstPrioritiesCalc([1, "*", 32], MathPriorities.FIRST)).toEqual([
      32,
    ]);
  });

  it("[32, /, 32]", () => {
    expect(firstPrioritiesCalc([32, "/", 32], MathPriorities.FIRST)).toEqual([
      1,
    ]);
  });

  it("[32, + 32]", () => {
    expect(firstPrioritiesCalc([32, "+", 32], MathPriorities.FIRST)).toEqual([
      32,
      "+",
      32,
    ]);
  });
});

describe("firstPrioritiesCalc priority zero cases", () => {
  it("[1, !]", () => {
    expect(firstPrioritiesCalc([1, "!"], MathPriorities.ZERO)).toEqual([1]);
  });

  it("[3, **]", () => {
    expect(firstPrioritiesCalc([3, "**"], MathPriorities.ZERO)).toEqual([9]);
  });
});

describe("firstPrioritiesCalc mixed with second priorities cases", () => {
  it("[32, /, 32, +, 10, *, 10]", () => {
    expect(
      firstPrioritiesCalc([32, "/", 32, "+", 10, "*", 10], MathPriorities.FIRST)
    ).toEqual([1, "+", 100]);
  });
});

describe("secondPrioritiesCalc invalid cases", () => {
  it("[32, / 32]", () => {
    expect(() => secondPrioritiesCalc([32, "/", 32])).toThrow(
      TypeError("Unexpected stack!")
    );
  });
});

describe("secondPrioritiesCalc simple cases", () => {
  it("[32, + 32]", () => {
    expect(secondPrioritiesCalc([32, "+", 32])).toEqual(64);
  });

  it("[32, - 32]", () => {
    expect(secondPrioritiesCalc([32, "-", 32])).toEqual(0);
  });

  it("[32, - 32, +, 10]", () => {
    expect(secondPrioritiesCalc([32, "-", 32, "+", 10])).toEqual(10);
  });
});
