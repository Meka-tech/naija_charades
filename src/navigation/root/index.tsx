import {
  NavigationContainer,
  NavigatorScreenParams,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CustomPage,
  Favourites,
  Home,
  MainMenu,
  New,
  Settings,
  Versus,
} from '../../screens';

export type IRootNavgation = {
  MainMenu: undefined;
  Versus: undefined;
  Home: undefined;
  Settings: undefined;
  New: undefined;
  Favourites: undefined;
  CustomPage: undefined;
};
const Stack = createNativeStackNavigator<IRootNavgation>();

export const RootNavigation = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="Versus" component={Versus} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="New" component={New} />
        <Stack.Screen name="Favourites" component={Favourites} />
        <Stack.Screen name="CustomPage" component={CustomPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
