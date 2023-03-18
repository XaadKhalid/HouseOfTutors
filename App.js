import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Screen_Control from './src/Screen_Control';
import {StatusBar} from 'react-native';

export default function App() {
  return (
    <PaperProvider>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#6618E7"
        translucent={true}
      />
      <Screen_Control />
    </PaperProvider>
  );
}
