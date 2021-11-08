import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CellState } from '../types';

interface CellStyledProps {
  cellState: CellState;
}

const CellStyled = styled.span`
  background-color: ${(props: CellStyledProps) =>
    props.cellState === 1 ? 'darkgray' : 'white'};
  width: 16px;
  height: 16px;
  display: inline-block;
  margin: 0;
  padding: 0;
  border: 1px solid grey;
  margin: -1px 0 0 -1px;
  overflow: hidden;
  text-align: center;
`;

interface CellProps extends CellStyledProps {
  num?: number;
}

const Cell: React.FC<CellProps> = (props) => {
  const { cellState, num } = props;

  const [isOutNum, setIsOutNum] = useState(false);

  const handleOnClick = () => {
    setIsOutNum(!isOutNum);
  };

  return (
    <CellStyled cellState={cellState} onClick={handleOnClick}>
      {isOutNum ? num : ''}
    </CellStyled>
  );
};

export default Cell;
