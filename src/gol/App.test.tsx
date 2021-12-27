import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';
import { HashRouter } from 'react-router-dom';

global.Storage.prototype.getItem = jest.fn(() => 'test user');
global.Storage.prototype.setItem = jest.fn();

describe('App', () => {
  test('render', () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    expect(screen.queryByRole('heading')).toBeInTheDocument();
    expect(screen.queryByRole('toolbar')).toBeInTheDocument();
    expect(screen.queryByRole('main')).toBeInTheDocument();
    expect(screen.queryByText('Game of life')).toBeInTheDocument();
    expect(screen.queryByText('test user')).toBeInTheDocument();
  });

  test('change inputBoardSizeX', () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const inputBoardSizeX = screen.getByTestId('inputBoardSizeX');
    fireEvent.change(inputBoardSizeX, {
      target: { value: 30 },
    });
    fireEvent.click(screen.getByTestId('s-btn-ok'));
    expect(screen.getByTestId(`${0}-${29}`)).toBeInTheDocument();
  });

  test('start pause', () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    fireEvent.click(screen.getByTestId('s-btn-start'));
    expect(screen.queryByTestId('s-btn-start')).not.toBeInTheDocument();
    expect(screen.queryByTestId('s-btn-pause')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('s-btn-pause'));
    expect(screen.queryByTestId('s-btn-pause')).not.toBeInTheDocument();
    expect(screen.queryByTestId('s-btn-start')).toBeInTheDocument();
  });
});
