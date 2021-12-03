import { cellStateAlive } from './constants';
import { GameSettings } from './types';
import { generateBoard, generateBoardXY, resizeBoard } from './utils';

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
});
