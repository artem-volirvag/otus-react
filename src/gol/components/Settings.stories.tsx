import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Settings from './Settings';

export default {
  title: 'Game_of_life/Settings',
  component: Settings,
} as ComponentMeta<typeof Settings>;

const Template: ComponentStory<typeof Settings> = (args) => (
  <Settings {...args} />
);

export const SettingsSample1 = Template.bind({});
SettingsSample1.args = {
  onClear: () => null,
  onPause: () => null,
  onChangeSettings: () => null,
  onReStart: () => null,
  onStart: () => null,
  settings: {
    boardFillPercent: 50,
    boardSize: { x: 10, y: 20 },
    speed: 1,
  },
  status: 'play',
};
