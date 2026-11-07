import React, {FC, useEffect, useRef} from 'react';
import {ImageBackground, Platform, StyleSheet, View} from 'react-native';
import ArtImg from 'assets/images/background_art2.png';
import Art2Img from 'assets/images/background_art.png';
import {Navbar} from 'components/navbar';
import {IconButton, ScreenHeader} from 'components/ui';
import {useAppTheme} from 'utils/useAppTheme';
import {space} from 'utils/theme';
import {widthPixel} from 'utils/pxToDpConvert';
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
  children?: React.ReactNode;
}

export const MenuPage: FC<IProps> = ({title, activePage, children}) => {
  const drawerRef = useRef<DrawerLayoutMethods>(null);
  const {isDark, c} = useAppTheme();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return (
    <ReanimatedDrawerLayout
      ref={drawerRef}
      renderNavigationView={() => <Navbar activePage={activePage} />}
      drawerPosition={DrawerPosition.LEFT}
      drawerType={DrawerType.FRONT}
      drawerWidth={widthPixel(290)}
      overlayColor={c.overlay}
      edgeWidth={Platform.OS === 'android' ? 0 : 50}
      minSwipeDistance={20}>
      <View style={[styles.container, {backgroundColor: c.background}]}>
        <ImageBackground
          source={isDark ? Art2Img : ArtImg}
          resizeMode="cover"
          style={styles.flex}
          imageStyle={{opacity: isDark ? 0.35 : 1}}>
          <SafeAreaViewWrapper darkmode={isDark} edges={['top', 'left', 'right']}>
            <View style={styles.inner}>
              <ScreenHeader
                title={title}
                left={
                  <IconButton
                    name="menu"
                    accessibilityLabel="Open menu"
                    onPress={() => drawerRef.current?.openDrawer()}
                  />
                }
              />
              <View style={styles.body}>{children}</View>
            </View>
          </SafeAreaViewWrapper>
        </ImageBackground>
      </View>
    </ReanimatedDrawerLayout>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {flex: 1, width: '100%'},
  inner: {flex: 1, width: '100%', paddingHorizontal: space.lg},
  body: {flex: 1, width: '100%', alignItems: 'center'},
});
