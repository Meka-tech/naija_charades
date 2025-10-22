import React, {FC, useEffect, useState} from 'react';
import styled from '@emotion/native';

import ArtImg from 'assets/images/background_art2.png';
import {theme} from 'utils/theme';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';

import Art2Img from 'assets/images/background_art.png';

import Entypo from '@expo/vector-icons/Entypo';

import {IsDarkMode} from 'utils/isDarkMode';
import * as ScreenOrientation from 'expo-screen-orientation';
import SafeAreaViewWrapper from 'components/safeAreaViewWrapper';
import {useRouter} from 'expo-router';

interface IProps {
  title?: string;
  children?: JSX.Element;
}

export const SecondaryMenuPage: FC<IProps> = ({title, children}) => {
  const router = useRouter();

  const isDarkMode = IsDarkMode();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return (
    <Container isDarkMode={isDarkMode}>
      <Image source={isDarkMode ? Art2Img : ArtImg}>
        <SafeAreaViewWrapper
          darkmode={isDarkMode}
          style={{flex: 1, paddingHorizontal: widthPixel(20)}}>
          <Head>
            <ArrowButton
              onPress={() => {
                router.back();
              }}>
              <Entypo
                name="chevron-left"
                size={widthPixel(36)}
                color={isDarkMode ? 'white' : 'black'}
              />
            </ArrowButton>
            <Title isDarkMode={isDarkMode}>{title}</Title>
          </Head>
          <Body>{children}</Body>
        </SafeAreaViewWrapper>
      </Image>
    </Container>
  );
};

interface useDark {
  isDarkMode: boolean;
}
const Container = styled.View<useDark>(({isDarkMode}) => ({
  width: '100%',
  flex: 1,
  backgroundColor: isDarkMode
    ? theme.colors.darkbackground
    : theme.colors.white,
}));

const Head = styled.View({
  width: '100%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: heightPixel(20),
  flexDirection: 'row',
});

const Title = styled.Text<useDark>(({isDarkMode}) => ({
  fontWeight: '600',
  fontSize: fontPixel(24),
  fontFamily: theme.fonts.MonstserratSemibold,
  color: isDarkMode ? theme.colors.white : theme.colors.black,
}));

const ArrowButton = styled.TouchableOpacity({
  position: 'absolute',
  left: widthPixel(0),
  top: widthPixel(-4),
  height: widthPixel(36),
});
const Body = styled.View({
  width: '100%',
  flex: 1,
  alignItems: 'center',
});
const Image = styled.ImageBackground({
  width: '100%',
  flex: 1,
});
