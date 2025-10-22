import React from 'react';
import {KeyboardAvoidingView, Platform, ViewStyle} from 'react-native';
import {heightPixel} from 'utils/pxToDpConvert';

const KeyboardAvoidingWrapper = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1, ...style}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? heightPixel(10) : heightPixel(10)
      }>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
