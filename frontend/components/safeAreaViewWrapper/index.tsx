import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {ViewStyle} from 'react-native';
import {heightPixel} from '@/lib/utils/pxToDpConvert';

const SafeAreaViewWrapper = ({
  children,
  style,
  darkmode,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  darkmode?: boolean;
}) => {
  return (
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={[style]}>
      <StatusBar style={darkmode ? 'light' : 'dark'} />
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaViewWrapper;
