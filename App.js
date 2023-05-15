/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';
import Navigation_Container from './src/Navigations/Navigation_Container';

export default function App() {
  return (
    <PaperProvider>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#282634"
        translucent={true}
      />
      <Navigation_Container />
    </PaperProvider>
  );
}
