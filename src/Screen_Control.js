/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Signup from './Signup';
import Std_Screens from './Student/Std_Screens';
import Personal from './Registeration/Personal';
import General from './Registeration/General';
import Academic from './Registeration/Academic';

const Stack = createNativeStackNavigator();

function Screen_Control() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Std_Screens" component={Std_Screens} />
        <Stack.Screen name="Personal" component={Personal} />
        <Stack.Screen name="General" component={General} />
        <Stack.Screen name="Academic" component={Academic} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Screen_Control;
