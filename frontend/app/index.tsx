import React, {useEffect, useState} from 'react';
import Logo from 'assets/images/logo.svg';
import styled from '@emotion/native';
import ArtImg from 'assets/images/background_art.png';
import {StrippedButton} from 'components';
import {heightPixel, widthPixel} from 'utils/pxToDpConvert';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
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

  const logoOffset = useSharedValue(200);
  const offsetButton = useSharedValue(-400);

  const LogoSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: logoOffset.value}],
    };
  });
  const ButtonSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offsetButton.value}],
    };
  });

  useEffect(() => {
    setTimeout(() => {
      logoOffset.value = withSpring(0, {
        damping: 26,
        stiffness: 200,
      });
      offsetButton.value = withSpring(0, {
        damping: 26,
        stiffness: 200,
      });
    }, 1000);
  });

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
        <Body>
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
        </Body>
      </Image>
    </Main>
  );
}

const Main = styled.View({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(254, 182, 10, 1)',
});
const Body = styled.View({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  paddingTop: heightPixel(200),
  paddingHorizontal: widthPixel(20),
});
const Image = styled.ImageBackground({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});

const Styles = StyleSheet.create({
  logoContainer: {
    marginBottom: heightPixel(100),
    width: '100%',
  },
  buttonsStyles: {
    marginTop: heightPixel(100),
    gap: heightPixel(30),
    width: '100%',
    height: heightPixel(250),
  },
});
