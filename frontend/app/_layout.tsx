import React, {FC, useCallback, useState} from 'react';
import {Slot, SplashScreen} from 'expo-router';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from '../src/redux/store';
import 'react-native-gesture-handler';
import {OrientationLocker} from 'react-native-orientation-locker';

const RootLayout: FC = () => {
  const [appIsReady, setAppIsReady] = useState(true);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  onLayoutRootView();

  if (!appIsReady) {
    return null;
  }

  console.log('=================================');
  console.log('RootLayout rendering...');
  console.log('App is ready:', appIsReady);
  console.log('=================================');

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <OrientationLocker orientation={'PORTRAIT'} />
        <Slot />
      </Provider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
