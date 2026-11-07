import React from 'react';
import {SafeAreaView, Edge} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {StyleProp, ViewStyle} from 'react-native';

const SafeAreaViewWrapper = ({
  children,
  style,
  darkmode,
  edges = ['top', 'bottom', 'left', 'right'],
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  darkmode?: boolean;
  edges?: Edge[];
}) => {
  return (
    <SafeAreaView edges={edges} style={[{flex: 1}, style]}>
      <StatusBar style={darkmode ? 'light' : 'dark'} />
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaViewWrapper;
