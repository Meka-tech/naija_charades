import React, {useEffect, useState} from 'react';
import Logo from '../../../../assets/images/logo.svg';
import styled from '@emotion/native';
import Art from '../../../../assets/images/background_main.svg';
import {StrippedButton} from '../../../components';
import {heightPixel, widthPixel} from '../../../utils/pxToDpConvert';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Dimensions} from 'react-native';
import {OrientationLocker} from 'react-native-orientation-locker';
import {updateQuickPlay} from '../../../features/team_data/team_data';
import {BackHandler, Alert} from 'react-native';
import {ConfirmExitModal} from '../../../components/modal';

export const MainMenu = ({}) => {
  const offset = useSharedValue(0);
  const offsetButton = useSharedValue(0);
  const dispatch = useDispatch();
  const {goBack} = useNavigation();

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
      offset.value = -1;
      offsetButton.value = 1.4;
    }, 2000);
  }, []);
  const {navigate} = useNavigation();

  const WindowHeight = Dimensions.get('window').height;
  const WindowWidth = Dimensions.get('window').width;
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

  return (
    <Main>
      <OrientationLocker orientation={'PORTRAIT'} />
      <Body>
        <ConfirmExitModal
          active={modalActive}
          closeModal={() => setModalActive(false)}
          onPress={() => BackHandler.exitApp()}
        />
        <Animated.View style={[defaultSpringStyles]}>
          <Logo />
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
              onPress={() => {
                navigate('Home');
                dispatch(updateQuickPlay(true));
              }}
            />
            <StrippedButton
              label="Versus"
              elevation={5}
              onPress={() => navigate('Versus')}
            />
            <StrippedButton
              label="How to play"
              elevation={5}
              onPress={() => navigate('HowToPlay')}
            />
          </Animated.View>
        </Buttons>
      </Body>
      <Image>
        <Art width={WindowWidth} height={WindowHeight} />
      </Image>
    </Main>
  );
};

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
const Image = styled.View({
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: -1,
});

const Buttons = styled.View({
  width: '70%',
  justifyContent: 'space-between',
  height: heightPixel(250),
  position: 'absolute',
  left: widthPixel(-300),
  bottom: heightPixel(150),
});
