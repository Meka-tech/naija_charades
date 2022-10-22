import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreateNewCategory,
  CustomPage,
  Favourites,
  GameDescription,
  Home,
  HowToPlay,
  InGame,
  MainMenu,
  New,
  Settings,
  Versus,
  VersusResult,
  WhoseGuess,
} from '../../screens';

export type IRootNavgation = {
  MainMenu: undefined;
  Versus: undefined;
  Home: undefined;
  Settings: undefined;
  New: undefined;
  Favourites: undefined;
  CustomPage: undefined;
  GameDescription: {title: string; description: string};
  WhoseGuess: {title?: string; custom: boolean; id?: number | null};
  InGame: {title: string; youGuess: boolean; custom: boolean; id?: number};
  CreateNewCategory: undefined;
  HowToPlay: undefined;
  VersusResult: {title: string};
};
const Stack = createNativeStackNavigator<IRootNavgation>();

export const RootNavigation = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Versus"
          component={Versus}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="New"
          component={New}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="Favourites"
          component={Favourites}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="CustomPage"
          component={CustomPage}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="GameDescription"
          component={GameDescription}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="WhoseGuess"
          component={WhoseGuess}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="InGame"
          component={InGame}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="VersusResult"
          component={VersusResult}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="CreateNewCategory"
          component={CreateNewCategory}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="HowToPlay"
          component={HowToPlay}
          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
