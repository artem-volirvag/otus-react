import React, { Component } from 'react';
import Counter from './Counter';

const getInitCounter = async (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(5), 1000);
  });
};

interface CounterConainerProps {
  maxCounter: number;
  isTimer?: boolean;
}

interface CounterConainerState {
  counter: number;
}

// 1. Написать "сложный" компонент с логикой с рядом дочерних презентационных компонентов
export default class CounterConainer extends Component<
  CounterConainerProps,
  CounterConainerState
> {
  // 2. Описать constructor как минимум в одном компоненте, объявить в конструкторе стейт и привязать контекст методов
  constructor(props: CounterConainerProps) {
    super(props);
    this.state = { counter: 1 };
    this.handleInc = this.handleInc.bind(this);
    this.handleDec = this.handleDec.bind(this);
  }

  timer: NodeJS.Timer | undefined;
  _isMounted = false;

  // 3. Описать componentDidMount как минимум в одном компоненте, получить в нем данные сервера(можно использовать заглушку или сторонние сервисы, например https://jsonplaceholder.typicode.com/). Описать подписку на событие
  async componentDidMount() {
    this._isMounted = true;
    const counter = await getInitCounter();
    if (this?._isMounted) {
      this.setState({ counter });
      if (this.props.isTimer) this.timer = setInterval(this.tick, 2000);
    }
  }

  // 6. Описать componentWillUnmout в компоненте, где в рамках componentDidMount была подписка на событие, реализовать отписку от этого события
  componentWillUnMount() {
    this._isMounted = false;
    if (this.timer) clearInterval(this.timer);
  }

  // 5. Описать componentDidUpdate как минимум в одном компоненте, описать в нем условие реализовать обновление стейта при этом условии
  componentDidUpdate() {
    if (this.state.counter > this.props.maxCounter) {
      this.setState({ counter: 1 });
    }
  }

  tick = () => {
    this.setState((prev) => ({ counter: prev.counter + 1 }));
  };

  handleInc() {
    this.tick();
  }

  handleDec() {
    this.setState((prev) => ({ counter: prev.counter - 1 }));
  }

  render() {
    return (
      <>
        <div>
          <Counter counter={this.state.counter} />
        </div>
        <div>
          <button onClick={this.handleInc}>Inc</button>
          <button onClick={this.handleDec}>Dec</button>
        </div>
      </>
    );
  }
}
