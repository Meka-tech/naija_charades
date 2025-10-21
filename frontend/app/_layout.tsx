import React, {FC, useCallback, useEffect, useState} from 'react';
import {Slot, SplashScreen} from 'expo-router';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from 'src/redux/store';
import 'react-native-gesture-handler';
import * as ScreenOrientation from 'expo-screen-orientation';
import {useFonts} from 'expo-font';

const RootLayout: FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded, error] = useFonts({
    'Gagalin-Regular': require('assets/fonts/Gagalin-Regular.otf'),
    'Montserrat-Regular': require('assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Black': require('assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Medium': require('assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-ExtraBold': require('assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-ExtraLight': require('assets/fonts/Montserrat-ExtraLight.ttf'),
    'Montserrat-Light': require('assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Thin': require('assets/fonts/Montserrat-Thin.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      // await ScreenOrientation.lockAsync(
      //   ScreenOrientation.OrientationLock.PORTRAIT,
      // );
      try {
        if (fontsLoaded) {
          setAppIsReady(true);
        }
      } catch (e) {
      } finally {
      }
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  onLayoutRootView();

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Slot />
      </Provider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
