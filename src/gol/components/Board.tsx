import React from 'react';
import { CellsData, Coordinates } from '../types';
import Cell from './Cell';
import styled from '@emotion/styled';

const BoardStyled = styled.div((props: Coordinates) => ({
  borderRight: '1px solid grey',
  borderBottom: '1px solid grey',
  width: `${props.x * 8}px`,
  height: `${props.y * 8}px`,
}));

interface BoardProps {
  cellsData: CellsData;
  onCellClick: (coord: Coordinates) => void;
}

const Board: React.FC<BoardProps> = ({ cellsData, onCellClick }) => {
  if (!cellsData || cellsData.length === 0) return null;

  return (
    <BoardStyled x={cellsData[0].length} y={cellsData.length}>
      {cellsData.map((row, iRow) => (
        <div key={iRow}>
          {row.map((cellState, iCell) => {
            return (
              <Cell
                cellState={cellState}
                key={`${iRow}${iCell}`}
                x={iCell}
                y={iRow}
                onClick={onCellClick}
              />
            );
          })}
        </div>
      ))}
    </BoardStyled>
  );
};

export default Board;
