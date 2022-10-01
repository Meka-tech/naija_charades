import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainMenu, Versus} from '../../screens';

export type IRootNavgation = {
  MainMenu: undefined;
  Versus: undefined;
};
const Stack = createNativeStackNavigator<IRootNavgation>();

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="Versus" component={Versus} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
