import React, {FC, useState} from 'react';
import styled from '@emotion/native';

import Art from '../../../assets/images/background_art2.svg';
import {theme} from '../../utils/theme';
import {fontPixel, heightPixel, widthPixel} from '../../utils/pxToDpConvert';
import Art2 from '../../../assets/images/background_art.svg';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Dimensions} from 'react-native';
import {IsDarkMode} from '../../utils/isDarkMode';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';

interface IProps {
  title?: string;
  children?: JSX.Element;
}

export const SecondaryMenuPage: FC<IProps> = ({title, children}) => {
  const {goBack} = useNavigation();

  const isDarkMode = IsDarkMode();

  return (
    <Container isDarkMode={isDarkMode}>
      <Head>
        <ArrowButton
          onPress={() => {
            goBack();
          }}>
          <Icon name="arrowleft" color={theme.colors.main} size={30} />
        </ArrowButton>
        <Title isDarkMode={isDarkMode}>{title}</Title>
      </Head>
      <Body>
        <OrientationLocker orientation={'PORTRAIT'} />
        {children}
      </Body>
      <Image>
        {isDarkMode ? (
          <Art2 width={'100%'} height={'100%'} />
        ) : (
          <Art width={'100%'} height={'100%'} />
        )}
      </Image>
    </Container>
  );
};

const WindowHeight = Dimensions.get('window').height;

interface useDark {
  isDarkMode: boolean;
}
const Container = styled.View<useDark>(({isDarkMode}) => ({
  width: '100%',
  height: '100%',
  backgroundColor: isDarkMode
    ? theme.colors.darkbackground
    : theme.colors.white,
}));

const Title = styled.Text<useDark>(({isDarkMode}) => ({
  marginTop: heightPixel(35),
  fontWeight: '600',
  fontSize: fontPixel(20),
  fontFamily: theme.fonts.MonstserratSemibold,
  color: isDarkMode ? theme.colors.white : theme.colors.black,
}));

const ArrowButton = styled.TouchableOpacity({
  position: 'absolute',
  left: 25,
  width: widthPixel(50),
});
const Body = styled.View({
  width: '100%',
  height: WindowHeight - heightPixel(78),
  alignItems: 'center',
});
const Image = styled.View({
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: -1,
});

const Head = styled.View({
  width: '100%',
  height: heightPixel(60),
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: heightPixel(18),
});
