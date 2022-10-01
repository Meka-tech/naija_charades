import React from 'react';
import {RootNavigation} from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const App = () => {
  return (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  );
};

export default App;
