import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Counter from './Counter';

export default {
  title: 'Homework4/Counter',
  component: Counter,
} as ComponentMeta<typeof Counter>;

const Template: ComponentStory<typeof Counter> = (args) => (
  <Counter {...args} />
);

export const Counter1 = Template.bind({});
Counter1.args = {
  counter: 1,
};

export const Counter2 = Template.bind({});
Counter2.args = {
  counter: 2,
};
