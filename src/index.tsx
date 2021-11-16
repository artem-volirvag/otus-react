import React from 'react';
import ReactDOM from 'react-dom';
import CounterConainer from './hw4/CounterConainer';

ReactDOM.render(
  <React.StrictMode>
    <CounterConainer maxCounter={20} isTimer={true} />
  </React.StrictMode>,
  document.getElementById('root')
);
