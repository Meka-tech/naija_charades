import styled from '@emotion/native';
import React, {FC} from 'react';
import {TextInputProps} from 'react-native';
import {IsDarkMode} from '../../utils/isDarkMode';
import {fontPixel, heightPixel, widthPixel} from '../../utils/pxToDpConvert';
import {theme} from '../../utils/theme';

interface IProps extends TextInputProps {
  width?: string;
  border?: boolean;
  height?: string;
}

export const TextInput: FC<IProps> = ({
  width,
  border = true,
  height,
  ...rest
}) => {
  const isDarkMode = IsDarkMode();

  return (
    <Container
      isDarkMode={isDarkMode}
      width={width}
      height={height}
      border={border}>
      <TextInputNative
        darkMode={isDarkMode}
        {...rest}
        placeholderTextColor={theme.colors.gray100}
      />
    </Container>
  );
};

interface IContainer {
  width?: string;
  border?: boolean;
  height?: string;
  isDarkMode: boolean;
}

const Container = styled.View<IContainer>(
  ({isDarkMode, width, height, border}) => ({
    width: width ? width : '100%',
    height: height ? height : heightPixel(50),
    borderColor: isDarkMode ? 'rgba(254, 182, 10, 0.3)' : theme.colors.main,
    borderWidth: border ? widthPixel(2) : widthPixel(0),
    backgroundColor: isDarkMode ? 'rgba(107, 107, 107, 1)' : theme.colors.white,
    borderRadius: widthPixel(15),
    alignItems: 'center',
    justifyContent: 'center',
  }),
);
interface useDark {
  darkMode: boolean;
}
const TextInputNative = styled.TextInput<useDark>(({darkMode}) => ({
  width: '100%',
  height: '100%',
  color: darkMode ? theme.colors.gray : theme.colors.black,
  textAlign: 'center',
  fontSize: fontPixel(20),
  fontFamily: theme.fonts.Monstserrat,
}));
