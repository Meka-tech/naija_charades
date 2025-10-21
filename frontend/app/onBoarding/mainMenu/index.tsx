import React, {useEffect, useState} from 'react';
import Logo from 'assets/images/logo.svg';
import styled from '@emotion/native';
import ArtImg from 'assets/images/background_art.png';
import {StrippedButton} from 'src/components';
import {heightPixel, widthPixel} from 'src/utils/pxToDpConvert';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
import {updateQuickPlay} from 'src/features/team_data/team_data';
import {BackHandler} from 'react-native';
import {ConfirmExitModal} from 'src/components/modal';
import * as ScreenOrientation from 'expo-screen-orientation';

import {useSelector, useDispatch} from 'react-redux';
import {RootState} from 'src/redux/store';
import {updateCards} from 'src/features/card_array/card_array';
import NetInfo from '@react-native-community/netinfo';
import {useRouter} from 'expo-router';

export default function MainMenu() {
  const dispatch = useDispatch();

  const router = useRouter();

  const [networkConnected, setNetworkConnected] = useState(false);
  const SavedCardArray = useSelector(
    (state: RootState) => state.reducer.cardArray,
  );

  useEffect(() => {
    const checkConnection = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setNetworkConnected(state.isConnected);
      }
    });
    checkConnection();
  });

  const WindowHeight = Dimensions.get('window').height;
  const WindowWidth = Dimensions.get('window').width;
  const offset = useSharedValue(0);
  const offsetButton = useSharedValue(0);

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withSpring(offset.value * 255)}],
    };
  });
  const ButtonSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(offsetButton.value * 255)}],
    };
  });

  useEffect(() => {
    setTimeout(() => {
      offset.value = -WindowHeight / 800;
      offsetButton.value = WindowWidth / 290; //1.4
    }, 2000);
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
    router.push('/screens/app/Home');
  };

  // useEffect(() => {
  //   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  // }, []);

  return (
    <Main>
      <Image source={ArtImg} resizeMode="cover">
        <Body>
          <ConfirmExitModal
            active={modalActive}
            closeModal={() => setModalActive(false)}
            onPress={() => BackHandler.exitApp()}
          />
          <Animated.View style={[defaultSpringStyles]}>
            <Logo
              width={WindowWidth}
              style={{
                transform: [
                  {scaleY: WindowHeight / 900},
                  {scaleX: WindowWidth / 400},
                ],
              }}
            />
          </Animated.View>
          <Buttons>
            <Animated.View
              style={[
                {height: '100%', justifyContent: 'space-between'},
                ButtonSpringStyles,
              ]}>
              <StrippedButton
                label="Quick Play"
                elevation={5}
                onPress={ClickQuickPlay}
              />
              <StrippedButton
                label="Versus"
                elevation={5}
                onPress={() => router.push('/screens/app/Versus')}
              />
              <StrippedButton
                label="How to play"
                elevation={5}
                onPress={() => router.push('/screens/app/HowToPlay')}
              />
            </Animated.View>
          </Buttons>
        </Body>
        {/* <Art width={WindowWidth} height={WindowHeight} /> */}
      </Image>
    </Main>
  );
}

const Main = styled.View({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(254, 182, 10, 0.95)',
  alignItems: 'center',
  justifyContent: 'center',
});
const Body = styled.View({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});
const Image = styled.ImageBackground({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});

const Buttons = styled.View({
  width: '70%',
  justifyContent: 'space-between',
  height: heightPixel(250),
  position: 'absolute',
  left: widthPixel(-300),
  bottom: heightPixel(150),
});
