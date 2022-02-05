import { cellStateAlive } from './constants';
import { CellsData, GameSettings } from './types';
import {
  countSurrounding,
  generateBoard,
  generateBoardXY,
  getNewState,
  isAlive,
  nextGeneration,
  resizeBoard,
  speedToMs,
} from './utils';

describe('Board utils', () => {
  test('generateBoardXY 3x3 cellStateAlive', () => {
    const board = generateBoardXY({ x: 3, y: 3 }, cellStateAlive);
    expect(board.length).toBe(3);
    expect(board[0].length).toBe(3);
    expect(board[1].length).toBe(3);
    expect(board[2].length).toBe(3);
    const countAlive = board.reduce(
      (sum, row) =>
        sum + row.reduce((sumRow: number, cell) => sumRow + cell, 0),
      0
    );
    expect(countAlive).toBe(9);
  });

  test('resizeBoard 100x100 => 10x10 10%', () => {
    const settings: GameSettings = {
      boardSize: { x: 100, y: 100 },
      boardFillPercent: 10,
      speed: 2,
    };
    const board = generateBoard(settings);
    const newBoardSize = { x: 10, y: 10 };
    const newBoard = resizeBoard(board, newBoardSize);
    expect(newBoard.length).toBe(newBoardSize.y);
    expect(newBoard[0].length).toBe(newBoardSize.x);
  });
  test('generateBoard 10x10 50%', () => {
    const settings = {
      boardSize: { x: 10, y: 10 },
      boardFillPercent: 50,
      speed: 2,
    };
    const board = generateBoard(settings);
    expect(board.length).toBe(settings.boardSize.y);
    expect(board[0].length).toBe(settings.boardSize.x);
    const countAlive = board.reduce(
      (sum, row) =>
        sum + row.reduce((sumRow: number, cell) => sumRow + cell, 0),
      0
    );
    expect(countAlive).toBe(50);
  });

  test('generateBoard 10x100 10%', () => {
    const settings = {
      boardSize: { x: 10, y: 100 },
      boardFillPercent: 10,
      speed: 2,
    };
    const board = generateBoard(settings);
    expect(board.length).toBe(settings.boardSize.y);
    expect(board[0].length).toBe(settings.boardSize.x);
    const countAlive = board.reduce(
      (sum, row) =>
        sum + row.reduce((sumRow: number, cell) => sumRow + cell, 0),
      0
    );
    expect(countAlive).toBe(100);
  });

  const cellsData: CellsData = [
    [0, 0, 0, 1],
    [1, 1, 0, 1],
    [0, 1, 0, 1],
  ];

  test('isAlive', () => {
    expect(isAlive(cellsData, 0, 0)).toBe(0);
    expect(isAlive(cellsData, 2, 0)).toBe(0);
    expect(isAlive(cellsData, 1, 1)).toBe(1);
    expect(isAlive(cellsData, 3, 2)).toBe(1);
    expect(isAlive(cellsData, 10, 10)).toBe(0);
  });

  test('countSurrounding', () => {
    expect(countSurrounding(cellsData, 0, 0)).toBe(2);
    expect(countSurrounding(cellsData, 2, 0)).toBe(3);
    expect(countSurrounding(cellsData, 1, 1)).toBe(2);
    expect(countSurrounding(cellsData, 3, 2)).toBe(1);
  });

  test('setNewState', () => {
    expect(getNewState(cellsData, 0, 0)).toBe(0);
    expect(getNewState(cellsData, 2, 0)).toBe(1);
    expect(getNewState(cellsData, 1, 1)).toBe(1);
    expect(getNewState(cellsData, 3, 2)).toBe(0);
  });

  test('nextGeneration', () => {
    expect(nextGeneration(cellsData)).toStrictEqual([
      [0, 0, 1, 0],
      [1, 1, 0, 1],
      [1, 1, 0, 0],
    ]);
  });

  test('speedToMs', () => {
    expect(speedToMs(0)).toBe(1000);
    expect(speedToMs(1)).toBe(500);
    expect(speedToMs(2)).toBe(250);
    expect(speedToMs(3)).toBe(100);
    expect(speedToMs(4)).toBe(500);
    expect(speedToMs(-1)).toBe(500);
  });
});
