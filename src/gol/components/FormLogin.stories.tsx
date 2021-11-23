import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FormLogin from './FormLogin';

export default {
  title: 'Game_of_life/FormLogin',
  component: FormLogin,
} as ComponentMeta<typeof FormLogin>;

const Template: ComponentStory<typeof FormLogin> = (args) => (
  <FormLogin {...args} />
);

export const FormLoginSample1 = Template.bind({});
FormLoginSample1.args = {
  onSubmit: () => null,
};
