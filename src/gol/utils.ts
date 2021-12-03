import { cellStateAlive, cellStateEmpty } from './constants';
import { BoardSize, CellState, CellsData, GameSettings } from './types';

export function generateBoardXY(
  boardSize: BoardSize,
  init: CellState
): CellsData {
  return Array.from(Array(boardSize.y)).map(() =>
    Array.from(Array(boardSize.x)).map(() => init)
  );
}

export function generateBoard(settings: GameSettings): CellsData {
  const { boardSize, boardFillPercent } = settings;
  const isReverseFill = boardFillPercent > 50;
  const boardCellsCount = boardSize.x * boardSize.y;
  const countFillCells = Math.floor(boardCellsCount * (boardFillPercent / 100));
  let countFill = isReverseFill
    ? boardCellsCount - countFillCells
    : countFillCells;
  const init = isReverseFill ? cellStateAlive : cellStateEmpty;
  const fill = isReverseFill ? cellStateEmpty : cellStateAlive;
  const cellsData = generateBoardXY(boardSize, init);
  while (countFill > 0) {
    const x = Math.floor(Math.random() * boardSize.x);
    const y = Math.floor(Math.random() * boardSize.y);
    if (cellsData[y][x] !== fill) {
      cellsData[y][x] = fill;
      countFill--;
    }
  }
  return cellsData;
}

export function resizeBoard(cellsData: CellsData, boardSize: BoardSize) {
  let newCellsData = cellsData;
  if (cellsData.length !== boardSize.y) {
    if (cellsData.length > boardSize.y) {
      newCellsData = cellsData.slice(0, boardSize.y);
    } else if (cellsData.length < boardSize.y) {
      newCellsData = cellsData.concat(
        generateBoardXY(
          { y: boardSize.y - cellsData.length, x: boardSize.x },
          cellStateEmpty
        )
      );
    }
  }
  newCellsData = newCellsData.map((row) => {
    if (row.length === boardSize.x) {
      return row;
    }
    return row.length > boardSize.x
      ? row.slice(0, boardSize.x)
      : row.concat(
          Array.from(Array(boardSize.x - row.length)).map(() => cellStateEmpty)
        );
  });
  return newCellsData;
}
