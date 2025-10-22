import React, {FC} from 'react';

import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

interface IProps {
  children?: JSX.Element;
}

export const CustomKeyboardAvoidingWrapper: FC<IProps> = ({children}) => {
  return (
    <KeyboardAvoidingView style={{backgroundColor: 'transparent', flex: 1}}>
      <ScrollView style={{backgroundColor: 'transparent'}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
