import React from 'react';
import Board from './components/Board';

function App() {
  return (
    <div>
      <h1>Game of life</h1>
      <Board
        cellsData={[
          [0, 1, 0, 1],
          [1, 1, 1, 0],
          [0, 1, 0, 0],
          [1, 0, 1, 0],
        ]}
      />
    </div>
  );
}

export default App;
