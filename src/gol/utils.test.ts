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

const getCountAlive = (board: CellsData) =>
  board.reduce(
    (sum, row) => sum + row.reduce((sumRow: number, cell) => sumRow + cell, 0),
    0
  );

describe('Board utils', () => {
  test('should generateBoardXY 3x3 cellStateAlive', () => {
    const board = generateBoardXY({ x: 3, y: 3 }, cellStateAlive);
    expect(board.length).toBe(3);
    expect(board[0].length).toBe(3);
    expect(board[1].length).toBe(3);
    expect(board[2].length).toBe(3);
    expect(getCountAlive(board)).toBe(9);
  });

  test('should generateBoard 10x10 75%', () => {
    const settings = {
      boardSize: { x: 10, y: 10 },
      boardFillPercent: 75,
      speed: 2,
    };
    const board = generateBoard(settings);
    expect(board.length).toBe(settings.boardSize.y);
    expect(board[0].length).toBe(settings.boardSize.x);
    const countAlive = getCountAlive(board);
    expect(countAlive).toBe((10 * 10 * 75) / 100);
  });

  test('should generateBoard 10x100 15%', () => {
    const settings = {
      boardSize: { x: 10, y: 100 },
      boardFillPercent: 15,
      speed: 2,
    };
    const board = generateBoard(settings);
    expect(board.length).toBe(settings.boardSize.y);
    expect(board[0].length).toBe(settings.boardSize.x);
    expect(getCountAlive(board)).toBe((10 * 100 * 15) / 100);
  });

  test('should resizeBoard from 100x100 to 10x10 30%', () => {
    const settings: GameSettings = {
      boardSize: { x: 100, y: 100 },
      boardFillPercent: 30,
      speed: 2,
    };
    const board = generateBoard(settings);
    const countAlive = getCountAlive(board);
    const newBoardSize = { x: 10, y: 10 };
    const newBoard = resizeBoard(board, newBoardSize);
    expect(newBoard.length).toBe(newBoardSize.y);
    expect(newBoard[0].length).toBe(newBoardSize.x);
    const newCountAlive = getCountAlive(board);
    expect(newCountAlive).toBe(countAlive);
  });

  test('should resizeBoard from 10x10 to 80x80 10%', () => {
    const settings: GameSettings = {
      boardSize: { x: 10, y: 10 },
      boardFillPercent: 10,
      speed: 2,
    };
    const board = generateBoard(settings);
    const countAlive = getCountAlive(board);
    const newBoardSize = { x: 80, y: 80 };
    const newBoard = resizeBoard(board, newBoardSize);
    expect(newBoard.length).toBe(newBoardSize.y);
    expect(newBoard[0].length).toBe(newBoardSize.x);
    const newCountAlive = getCountAlive(board);
    expect(newCountAlive).toBe(countAlive);
  });

  const cellsData: CellsData = [
    [0, 0, 0, 1],
    [1, 1, 0, 1],
    [0, 1, 0, 1],
  ];

  test('should check isAlive cell', () => {
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
    expect(speedToMs(0)).toBe(500);
    expect(speedToMs(1)).toBe(1000);
    expect(speedToMs(2)).toBe(500);
    expect(speedToMs(3)).toBe(250);
    expect(speedToMs(4)).toBe(100);
    expect(speedToMs(-1)).toBe(500);
  });
});
