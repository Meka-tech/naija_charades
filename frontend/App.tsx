import * as React from 'react';
import {RootNavigation} from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/app/store';
import {Provider} from 'react-redux';
import {OrientationLocker} from 'react-native-orientation-locker';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <OrientationLocker orientation={'PORTRAIT'} />
        <RootNavigation />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
