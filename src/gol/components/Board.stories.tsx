import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Board from './Board';

export default {
  title: 'Game_of_life/Board',
  component: Board,
} as ComponentMeta<typeof Board>;

const Template: ComponentStory<typeof Board> = (args) => <Board {...args} />;

export const BoardSample1 = Template.bind({});
BoardSample1.args = {
  cellsData: [
    [0, 1, 0, 1],
    [0, 1, 0, 1],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
  ],
};

export const BoardSample2 = Template.bind({});
BoardSample2.args = {
  cellsData: [
    [0, 1, 0, 1],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [1, 0, 1, 0],
  ],
};

export const BoardFull = Template.bind({});
BoardFull.args = {
  cellsData: [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ],
};
