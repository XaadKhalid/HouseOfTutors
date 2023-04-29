/* eslint-disable prettier/prettier */
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';
import Stack_Navigator from './src/Navigations/Stack_Navigator';
import { Provider } from 'react-redux';
import store from './src/Redux/Store';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#282634"
          translucent={true}
        />
        <Stack_Navigator />
      </PaperProvider>
    </Provider>
  );
}
