import React, {FC, useEffect, useRef, useState} from 'react';
import styled from '@emotion/native';
import ArtImg from 'assets/images/background_art2.png';
import {theme} from 'utils/theme';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';
import HamburgerIcon from 'assets/images/hamburger_icon.svg';
import {Navbar} from 'components/navbar';

import Art2Img from 'assets/images/background_art.png';
import HamburgerIconDark from 'assets/images/DarkMode/hamburger_light.svg';
import {Platform, View} from 'react-native';
import {IsDarkMode} from 'utils/isDarkMode';
import * as ScreenOrientation from 'expo-screen-orientation';
import SafeAreaViewWrapper from 'components/safeAreaViewWrapper';
import ReanimatedDrawerLayout, {
  DrawerType,
  DrawerPosition,
  DrawerLayoutMethods,
} from 'react-native-gesture-handler/ReanimatedDrawerLayout';

interface IProps {
  title?: string;
  activePage?: string;
  children?: JSX.Element;
}

export const MenuPage: FC<IProps> = ({title, activePage, children}) => {
  const drawerRef = useRef<DrawerLayoutMethods>(null);

  const isDarkMode = IsDarkMode();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return (
    <ReanimatedDrawerLayout
      ref={drawerRef}
      renderNavigationView={() => <Navbar activePage={activePage} />}
      drawerPosition={DrawerPosition.LEFT}
      drawerType={DrawerType.FRONT}
      drawerWidth={widthPixel(260)}
      edgeWidth={Platform.OS === 'android' ? 0 : 50}
      minSwipeDistance={20}>
      <Container isDarkMode={isDarkMode}>
        <Image source={isDarkMode ? Art2Img : ArtImg} resizeMode="cover">
          <SafeAreaViewWrapper darkmode={isDarkMode}>
            <View style={{width: '100%', paddingHorizontal: widthPixel(20)}}>
              <Head>
                <HamburgerButton
                  onPress={() => {
                    drawerRef.current?.openDrawer();
                  }}>
                  {isDarkMode ? (
                    <HamburgerIconDark />
                  ) : (
                    <HamburgerIcon width={widthPixel(50)} />
                  )}
                </HamburgerButton>
                <Title isDarkMode={isDarkMode}>{title}</Title>
              </Head>
              <Body>{children}</Body>
            </View>
          </SafeAreaViewWrapper>
        </Image>
      </Container>
    </ReanimatedDrawerLayout>
  );
};

interface IContainer {
  isDarkMode: boolean;
}
const Container = styled.View<IContainer>(({isDarkMode}) => ({
  width: '100%',
  height: '100%',
  backgroundColor: isDarkMode
    ? theme.colors.darkbackground
    : theme.colors.white,
}));
interface ITitle {
  isDarkMode: boolean;
}
const Title = styled.Text<ITitle>(({isDarkMode}) => ({
  fontWeight: '400',
  fontSize: fontPixel(30),
  fontFamily: theme.fonts.Gagalin,
  color: isDarkMode ? theme.colors.white : theme.colors.black,
}));

const HamburgerButton = styled.TouchableOpacity({
  position: 'absolute',
  left: widthPixel(0),
  width: widthPixel(50),
});
const Body = styled.View({
  width: '100%',
  alignItems: 'center',
  height: '100%',
});
const Image = styled.ImageBackground({
  flex: 1,
  width: '100%',
});
const Head = styled.View({
  width: '100%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: heightPixel(20),
});
