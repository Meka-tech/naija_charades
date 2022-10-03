import React from 'react';
import {RootNavigation} from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/app/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
