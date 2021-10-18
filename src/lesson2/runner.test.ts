import { runner } from "./runner";

describe("Runner simple cases", () => {
  it("1 * 32", () => {
    expect(runner("1 * 32")).toEqual(32);
  });

  it("2 * 32", () => {
    expect(runner("2 * 32")).toEqual(64);
  });

  it("2 + 32", () => {
    expect(runner("2 + 32")).toEqual(34);
  });
});

describe("Runner tripled/mixed cases", () => {
  it("2 * 2 * 3", () => {
    expect(runner("2 * 2 * 3")).toEqual(12);
  });

  it("2 * 2 + 3", () => {
    expect(runner("2 * 2 + 3")).toEqual(7);
  });

  it("2 + 2 * 3", () => {
    expect(runner("2 + 2 * 3")).toEqual(8);
  });
});

describe("Runner long cases", () => {
  it("20 + 1 * 10 - 5 * 3", () => {
    expect(runner("20 + 1 * 10 - 5 * 3")).toEqual(15);
  });

  it("20 - 10 * 10 / 5 - 3", () => {
    expect(runner("20 - 10 * 10 / 5 - 3")).toEqual(-3);
  });
});

describe("Runner exp cases", () => {
  it("2 ^ 2", () => {
    expect(runner("2 ^ 2")).toEqual(4);
  });

  it("2 ^ 2 + 1", () => {
    expect(runner("2 ^ 2 + 1")).toEqual(5);
  });

  it("3 * 2 ^ 2", () => {
    expect(runner("3 * 2 ^ 2")).toEqual(12);
  });
});

describe("Runner squ cases", () => {
  it("3 **", () => {
    expect(runner("3 **")).toEqual(9);
  });

  it("2 * 3 ** + 1", () => {
    expect(runner("2 * 3 ** + 1")).toEqual(19);
  });
});

describe("Runner factorial cases", () => {
  it("3 !", () => {
    expect(runner("3 !")).toEqual(6);
  });

  it("2 * 3 ! + 1", () => {
    expect(runner("2 * 3 ! + 1")).toEqual(13);
  });
});
