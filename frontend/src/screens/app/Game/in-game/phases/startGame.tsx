import React, {FC, useState, useEffect} from 'react';
import styled from '@emotion/native';
import {IsDarkMode} from '../../../../../utils/isDarkMode';
import {theme} from '../../../../../utils/theme';
import {fontPixel, heightPixel} from '../../../../../utils/pxToDpConvert';
import {DeviceMotion, Accelerometer} from 'expo-sensors';

interface Iprops {
  startAction: () => void;
  timer: number;
}

export const StartGame: FC<Iprops> = ({startAction, timer}) => {
  const isDarkMode = IsDarkMode();
  const [TimerStarted, setTimerStarted] = useState(false);
  const [data, setData] = useState({});
  const [{x, y, z}, setAccelData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscriptionAccel, setSubscriptionAccel] = useState(null);

  const _setInterval = () => {
    DeviceMotion.setUpdateInterval(100);
  };

  const _subscribe = () => {
    //Adding the Listener
    DeviceMotion.addListener(devicemotionData => {
      setData(devicemotionData.accelerationIncludingGravity);
    });
    //Calling setInterval Function after adding the listener
    _setInterval();
  };

  const _unsubscribe = () => {
    //Removing all the listeners at end of screen unload
    DeviceMotion.removeAllListeners();
  };
  const _subscribeAccel = () => {
    setSubscriptionAccel(Accelerometer.addListener(setAccelData));
  };

  const _unsubscribeAccel = () => {
    subscriptionAccel && subscriptionAccel.remove();
    setSubscriptionAccel(null);
  };

  useEffect(() => {
    _subscribe();
    _subscribeAccel();
    if (data?.z > -1 && y < 0.04 && y > -0.04) {
      startAction();
      setTimerStarted(true);
    }
    return () => {
      _unsubscribeAccel();
      _unsubscribe();
    };
  }, [data, x, y, z]);

  return (
    <Container
      darkMode={isDarkMode}
      timerStarted={TimerStarted}
      onPress={() => {
        startAction();
        setTimerStarted(true);
      }}>
      {!TimerStarted && (
        <>
          <PlaceText>Place on Forehead</PlaceText>
          <TouchText>Touch screen to Start</TouchText>
        </>
      )}
      {TimerStarted && <TimerText>{timer > 0 ? timer : 'G0!'}</TimerText>}
    </Container>
  );
};

interface IContainer {
  darkMode?: boolean;
  timerStarted?: boolean;
}
const Container = styled.TouchableOpacity<IContainer>(
  ({darkMode, timerStarted}) => ({
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: timerStarted
      ? 'rgba(244, 131, 155, 1)'
      : darkMode
      ? theme.colors.darkbackground
      : theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  }),
);

const PlaceText = styled.Text({
  fontFamily: theme.fonts.MonstserratBold,
  fontSize: fontPixel(60),
  color: 'rgba(64, 132, 254, 1)',
  marginBottom: heightPixel(30),
});

const TouchText = styled.Text({
  fontFamily: theme.fonts.MonstserratBold,
  fontSize: fontPixel(24),
  color: theme.colors.main,
});

const TimerText = styled.Text({
  fontFamily: theme.fonts.MonstserratBold,
  fontSize: fontPixel(96),
  color: theme.colors.white,
});
