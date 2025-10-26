import React, {FC, useCallback, useEffect, useState} from 'react';
import {Slot, SplashScreen} from 'expo-router';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from 'redux/app/store';
import 'react-native-gesture-handler';
import {useFonts} from 'expo-font';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {CardProvider} from 'contexts/cardContext';
import Purchases, {LOG_LEVEL} from 'react-native-purchases';
import {Platform} from 'react-native';

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
      try {
        Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

        if (Platform.OS === 'ios') {
          // Purchases.configure({
          //   apiKey:
          //     process.env.EXPO_PUBLIC_REVENUECAT_PROJECT_GOOGLE_API_KEY ||
          //     'test_KuNYxsDGLwuYpZAZtHxYawhnDLH',
          // });
        } else if (Platform.OS === 'android') {
          Purchases.configure({
            apiKey:
              process.env.EXPO_PUBLIC_REVENUECAT_PROJECT_GOOGLE_API_KEY ||
              'test_KuNYxsDGLwuYpZAZtHxYawhnDLH',
          });
        }
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
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <Provider store={store}>
          <CardProvider>
            <Slot />
          </CardProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
