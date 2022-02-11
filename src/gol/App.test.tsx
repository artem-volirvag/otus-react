import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './state/store';

jest.mock('./localStorage', () => ({
  loadLogin: () => 'init login',
}));

describe('App', () => {
  test('should buttons work', () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    );
    expect(screen.queryByRole('heading')).toBeInTheDocument();
    expect(screen.queryByRole('toolbar')).toBeInTheDocument();
    expect(screen.queryByRole('main')).toBeInTheDocument();
    expect(screen.queryByText('Игра «Жизнь»')).toBeInTheDocument();
    expect(screen.queryByText('init login')).toBeInTheDocument();

    const inputBoardSizeX = screen.getByTestId('inputBoardSizeX');
    fireEvent.change(inputBoardSizeX, {
      target: { value: 60 },
    });
    fireEvent.click(screen.getByTestId('s-btn-ok'));
    expect(screen.getByTestId(`${0}-${59}`)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('s-btn-start'));
    expect(screen.queryByTestId('s-btn-start')).not.toBeInTheDocument();
    expect(screen.queryByTestId('s-btn-pause')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('s-btn-pause'));
    expect(screen.queryByTestId('s-btn-pause')).not.toBeInTheDocument();
    expect(screen.queryByTestId('s-btn-start')).toBeInTheDocument();
  });

  test('should call dispatch', () => {
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    );
    fireEvent.click(screen.getByTestId('s-btn-reStart'));
    expect(store.dispatch).toBeCalledTimes(1);
    fireEvent.click(screen.getByTestId('s-btn-clear'));
    expect(store.dispatch).toBeCalledTimes(2);
    fireEvent.click(screen.getByTestId('u-btn-logout'));
    expect(store.dispatch).toBeCalledTimes(3);
    fireEvent.click(screen.getByTestId(`${0}-${0}`));
    expect(store.dispatch).toBeCalledTimes(4);
  });
});
