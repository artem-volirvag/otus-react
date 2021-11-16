import React, { Component } from 'react';

interface CounterProps {
  counter: number;
}

export default class Counter extends Component<CounterProps> {
  // 4. Описать shouldComponentUpdate как минимум в одном компоненте, произвести в нем оптимизацию производительности(если будет притянутый за уши случай - ничего страшного)
  shouldComponentUpdate(nextProps: CounterProps) {
    if (nextProps.counter === this.props.counter) return false;
    return true;
  }

  render() {
    return (
      <>
        <strong>Счетчик:</strong>
        {this.props.counter}
      </>
    );
  }
}
