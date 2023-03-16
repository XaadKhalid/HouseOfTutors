import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Personal from './Personal';
import General from './General';
import Academic from './Academic';

const Stack = createNativeStackNavigator();

export default function Reg_Screen_Controll() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Personal"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Personal} />
        <Stack.Screen name="Signup" component={General} />
        <Stack.Screen name="Std_Screens" component={Academic} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
