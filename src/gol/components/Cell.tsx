import React from 'react';
import styled from '@emotion/styled';
import { CellState, Coordinates } from '../types';

interface CellStyledProps {
  cellState: CellState;
}

const CellStyled = styled.span`
  background-color: ${(props: CellStyledProps) =>
    props.cellState === 1 ? 'darkgray' : 'white'};
  width: 8px;
  height: 8px;
  border-top: 1px solid grey;
  border-left: 1px solid grey;
  float: left;
  display: block;
  box-sizing: border-box;
`;

interface CellProps extends CellStyledProps {
  onClick: (coord: Coordinates) => void;
  x: number;
  y: number;
}

const Cell: React.FC<CellProps> = React.memo((props) => {
  const { cellState, x, y, onClick } = props;

  const handleOnClick = () => onClick({ x, y });

  return (
    <CellStyled
      cellState={cellState}
      data-testid={`${y}-${x}`}
      onClick={handleOnClick}
    />
  );
});

Cell.displayName = 'Cell';

export default Cell;
