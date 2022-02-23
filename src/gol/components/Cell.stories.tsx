import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Cell from './Cell';

export default {
  title: 'Game_of_life/Cell',
  component: Cell,
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const Alive = Template.bind({});
Alive.args = {
  cellState: 1,
};

export const Dead = Template.bind({});
Dead.args = {
  cellState: 0,
};
