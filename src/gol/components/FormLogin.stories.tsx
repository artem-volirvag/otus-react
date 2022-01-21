import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FormLogin from './FormLogin';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../state/store';

export default {
  title: 'Game_of_life/FormLogin',
  component: FormLogin,
} as ComponentMeta<typeof FormLogin>;

const Template: ComponentStory<typeof FormLogin> = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<FormLogin />} />
        <Route path="/login" element={<FormLogin />} />
      </Routes>
    </HashRouter>
  </Provider>
);

export const FormLoginSample1 = Template.bind({});
