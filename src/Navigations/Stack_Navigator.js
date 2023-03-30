import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import S_Bottom_Navigator from './S_Bottom_Navigator';
import T_Bottom_Navigator from './T_Bottom_Naivgator';

const Stack = createNativeStackNavigator();

function Stack_Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="S_Bottom_Navigator" component={S_Bottom_Navigator} />
        <Stack.Screen name="T_Bottom_Navigator" component={T_Bottom_Navigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Stack_Navigator;
