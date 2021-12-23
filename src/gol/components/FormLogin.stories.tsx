import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FormLogin from './FormLogin';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Game_of_life/FormLogin',
  component: FormLogin,
} as ComponentMeta<typeof FormLogin>;

const Template: ComponentStory<typeof FormLogin> = () => (
  <BrowserRouter>
    <FormLogin />
  </BrowserRouter>
);

export const FormLoginSample1 = Template.bind({});
