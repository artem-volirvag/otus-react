import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CounterConainer from './CounterContainer';

export default {
  title: 'Homework4/CounterConainer',
  component: CounterConainer,
} as ComponentMeta<typeof CounterConainer>;

const Template: ComponentStory<typeof CounterConainer> = (args) => (
  <CounterConainer {...args} />
);

export const CounterConainerMax10 = Template.bind({});
CounterConainerMax10.args = {
  maxCounter: 10,
};

export const CounterConainerMax20Timer = Template.bind({});
CounterConainerMax20Timer.args = {
  maxCounter: 20,
  isTimer: true,
};
