# «Игра Жизнь» (Conway's Game of Life)
## Домашние задания и проект по курсу «React.js Developer» от OTUS
### Используемые технологии
#### Основное:
- typescript
- react
- @reduxjs/toolkit
- react-router-dom
- redux-saga
- @emotion

#### Сборка проекта:
- webpack
- babel
- husky
- gh-pages

#### Тестирование:
- jest
- @testing-library
- @storybook
- chromatic
- loki
- @stryker
- redux-saga-test-plan

#### Дополнительные инструменты:
- prettier
- eslint

### ДЕМО
https://artem-volirvag.github.io/otus-react/

### Storybook
https://619bacabddf057003a8a3dee-ztaqsqmpel.chromatic.com

### Покрытие тестами
```
------------------|---------|----------|---------|---------|---------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line
------------------|---------|----------|---------|---------|---------------
All files         |   98.57 |    95.23 |   98.52 |     100 |
 gol              |   98.85 |    94.59 |     100 |     100 |
  App.tsx         |      95 |       50 |     100 |     100 | 34
  constants.ts    |     100 |      100 |     100 |     100 |
  localStorage.ts |     100 |      100 |     100 |     100 |
  useLogin.ts     |     100 |      100 |     100 |     100 |
  utils.ts        |     100 |    96.96 |     100 |     100 | 40
 gol/components   |     100 |      100 |     100 |     100 |
  Board.tsx       |     100 |      100 |     100 |     100 |
  Cell.tsx        |     100 |      100 |     100 |     100 |
  FormLogin.tsx   |     100 |      100 |     100 |     100 |
  Settings.tsx    |     100 |      100 |     100 |     100 |
 gol/elements     |     100 |     92.3 |     100 |     100 |
  Button.tsx      |     100 |      100 |     100 |     100 |
  FlexBox.tsx     |     100 |       90 |     100 |     100 | 13
  Header.tsx      |     100 |      100 |     100 |     100 |
  Input.tsx       |     100 |      100 |     100 |     100 |
  InputRange.tsx  |     100 |      100 |     100 |     100 |
 gol/state        |   96.49 |       95 |   95.23 |     100 |
  appSlice.ts     |   96.77 |    93.75 |     100 |     100 | 33
  saga.ts         |     100 |      100 |     100 |     100 |
  selectors.ts    |     100 |      100 |     100 |     100 |
  store.ts        |   85.71 |      100 |      50 |     100 |
  userSlice.ts    |     100 |      100 |     100 |     100 |
------------------|---------|----------|---------|---------|---------------
```
### Отчет stryker
https://artem-volirvag.github.io/otus-react/stryker.html
