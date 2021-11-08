import React from 'react';
import { CellsData } from '../types';
import Cell from './Cell';
import styled from '@emotion/styled';

const RowStyled = styled.div`
  height: 16px;
`;

interface BoardProps {
  cellsData: CellsData;
}

const Board: React.FC<BoardProps> = ({ cellsData }) => {
  if (!cellsData || cellsData.length === 0) return null;

  let cellNum = 0;

  return (
    <div>
      {cellsData.map((row, iRow) => (
        <RowStyled key={iRow}>
          {row.map((cellState, iCell) => {
            cellNum++;
            return (
              <Cell
                cellState={cellState}
                num={cellNum}
                key={`${iRow}${iCell}`}
              />
            );
          })}
        </RowStyled>
      ))}
    </div>
  );
};

export default Board;
