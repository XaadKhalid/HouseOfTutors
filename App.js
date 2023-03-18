import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';
import Stack_Navigator from './src/Navigations/Stack_Navigator';

export default function App() {
  return (
    <PaperProvider>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#6618E7"
        translucent={true}
      />
      <Stack_Navigator />
    </PaperProvider>
  );
}
