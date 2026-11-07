import React, {useEffect, useState} from 'react';
import Logo from 'assets/images/logo.svg';
import styled from '@emotion/native';
import ArtImg from 'assets/images/background_art.png';
import {StrippedButton} from 'components';
import {heightPixel, widthPixel} from 'utils/pxToDpConvert';
import Animated, {
  withSpring,
  withDelay,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import SafeAreaViewWrapper from 'components/safeAreaViewWrapper';
import {palette, space} from 'utils/theme';
import {StyleSheet} from 'react-native';
import {updateQuickPlay} from 'redux/features/team_data/team_data';
import {BackHandler} from 'react-native';
import {ConfirmExitModal} from 'components/modal';
import * as ScreenOrientation from 'expo-screen-orientation';

import {useDispatch} from 'react-redux';

import {useRouter} from 'expo-router';
import {
  updateNoOfRounds,
  updateNoOfTeams,
} from 'redux/features/game_rules/gameRulesSlice';

export default function MainMenu() {
  const dispatch = useDispatch();

  const router = useRouter();

  const logoOffset = useSharedValue(160);
  const logoScale = useSharedValue(0.9);
  const buttonsOffset = useSharedValue(60);
  const buttonsOpacity = useSharedValue(0);

  const LogoSpringStyles = useAnimatedStyle(() => ({
    transform: [{translateY: logoOffset.value}, {scale: logoScale.value}],
  }));
  const ButtonSpringStyles = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{translateY: buttonsOffset.value}],
  }));

  useEffect(() => {
    const spring = {damping: 18, stiffness: 140};
    logoOffset.value = withDelay(500, withSpring(0, spring));
    logoScale.value = withDelay(500, withSpring(1, spring));
    buttonsOffset.value = withDelay(750, withSpring(0, spring));
    buttonsOpacity.value = withDelay(750, withTiming(1, {duration: 350}));
  }, []);

  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setModalActive(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const ClickQuickPlay = () => {
    dispatch(updateQuickPlay(true));
    router.push('/home');
  };
  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP,
    );
  };

  useEffect(() => {
    lockOrientation();
    dispatch(updateNoOfRounds(2));
    dispatch(updateNoOfTeams(2));
  }, []);

  return (
    <Main>
      <Image source={ArtImg} resizeMode="cover">
        <SafeAreaViewWrapper style={Styles.safe}>
          <ConfirmExitModal
            active={modalActive}
            closeModal={() => setModalActive(false)}
            onPress={() => BackHandler.exitApp()}
          />
          <Animated.View style={[LogoSpringStyles, Styles.logoContainer]}>
            <Logo width={'100%'} />
          </Animated.View>
          <Animated.View style={[Styles.buttonsStyles, ButtonSpringStyles]}>
            <StrippedButton
              label="Quick Play"
              elevation={5}
              onPress={ClickQuickPlay}
            />
            <StrippedButton
              label="Versus"
              elevation={5}
              onPress={() => router.push('/versus')}
            />
            <StrippedButton
              label="How to play"
              elevation={5}
              onPress={() => router.push('/howToPlay')}
            />
          </Animated.View>
        </SafeAreaViewWrapper>
      </Image>
    </Main>
  );
}

const Main = styled.View({
  flex: 1,
  backgroundColor: palette.gold,
});
const Image = styled.ImageBackground({
  flex: 1,
  width: '100%',
});

const Styles = StyleSheet.create({
  safe: {
    paddingHorizontal: widthPixel(28),
    justifyContent: 'center',
  },
  logoContainer: {
    width: '100%',
    marginBottom: heightPixel(70),
  },
  buttonsStyles: {
    gap: space.md,
    width: '100%',
  },
});
