import React, {FC, useEffect} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import ArtImg from 'assets/images/background_art2.png';
import Art2Img from 'assets/images/background_art.png';
import {IconButton, ScreenHeader} from 'components/ui';
import {useAppTheme} from 'utils/useAppTheme';
import {space} from 'utils/theme';
import * as ScreenOrientation from 'expo-screen-orientation';
import SafeAreaViewWrapper from 'components/safeAreaViewWrapper';
import {useRouter} from 'expo-router';

interface IProps {
  title?: string;
  children?: React.ReactNode;
  onBack?: () => void;
}

export const SecondaryMenuPage: FC<IProps> = ({title, children, onBack}) => {
  const router = useRouter();
  const {isDark, c} = useAppTheme();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: c.background}]}>
      <ImageBackground
        source={isDark ? Art2Img : ArtImg}
        style={styles.flex}
        imageStyle={{opacity: isDark ? 0.35 : 1}}>
        <SafeAreaViewWrapper darkmode={isDark} style={styles.inner}>
          <ScreenHeader
            title={title}
            variant="plain"
            left={
              <IconButton
                name="chevron-back"
                accessibilityLabel="Go back"
                onPress={onBack ?? (() => router.back())}
              />
            }
          />
          <View style={styles.body}>{children}</View>
        </SafeAreaViewWrapper>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {flex: 1, width: '100%'},
  inner: {flex: 1, paddingHorizontal: space.lg},
  body: {flex: 1, width: '100%', alignItems: 'center'},
});
