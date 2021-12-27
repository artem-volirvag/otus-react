import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FormLogin from './FormLogin';
import { HashRouter } from 'react-router-dom';

export default {
  title: 'Game_of_life/FormLogin',
  component: FormLogin,
} as ComponentMeta<typeof FormLogin>;

const Template: ComponentStory<typeof FormLogin> = () => (
  <HashRouter>
    <FormLogin />
  </HashRouter>
);

export const FormLoginSample1 = Template.bind({});
