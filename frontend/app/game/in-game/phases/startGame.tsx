import React, {FC, useState, useEffect} from 'react';
import styled from '@emotion/native';
import {IsDarkMode} from 'utils/isDarkMode';
import {fonts, palette, radius, space} from 'utils/theme';
import {fontPixel, widthPixel} from 'utils/pxToDpConvert';
import Animated, {
  FadeIn,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import {haptics} from 'utils/haptics';
import {DeviceMotion, Accelerometer} from 'expo-sensors';

interface Iprops {
  startAction: () => void;
  timer: number;
  gameStarting: boolean;
}

const StartGame: FC<Iprops> = ({startAction, timer, gameStarting}) => {
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

    if (
      data?.z > -2 &&
      y < 0.05 &&
      y > -0.05 &&
      x > 0.7 &&
      gameStarting === false
    ) {
      startAction();
      setTimerStarted(true);
    }
    return () => {
      _unsubscribeAccel();
      _unsubscribe();
    };
  }, [data, x, y, z]);

  // Gentle bob on the phone icon while waiting.
  const bob = useSharedValue(0);
  useEffect(() => {
    bob.value = withRepeat(
      withSequence(
        withTiming(-8, {duration: 700}),
        withTiming(0, {duration: 700}),
      ),
      -1,
    );
  }, [bob]);
  const bobStyle = useAnimatedStyle(() => ({
    transform: [{translateY: bob.value}],
  }));

  useEffect(() => {
    if (TimerStarted) {
      timer > 0 ? haptics.press() : haptics.success();
    }
  }, [timer, TimerStarted]);

  return (
    <Container
      darkMode={isDarkMode}
      timerStarted={TimerStarted}
      onPress={() => {
        startAction();
        setTimerStarted(true);
      }}>
      {!TimerStarted && (
        <Animated.View entering={FadeIn} style={{alignItems: 'center'}}>
          <Animated.View style={bobStyle}>
            <Ionicons
              name="phone-landscape-outline"
              size={widthPixel(56)}
              color={palette.white}
            />
          </Animated.View>
          <PlaceText>Place on Forehead</PlaceText>
          <TouchPill>
            <TouchText>Tap anywhere to start</TouchText>
          </TouchPill>
        </Animated.View>
      )}
      {TimerStarted && (
        <Animated.View key={timer} entering={ZoomIn.springify().damping(12)}>
          <TimerText>{timer > 0 ? timer : 'GO!'}</TimerText>
        </Animated.View>
      )}
    </Container>
  );
};

export default StartGame;
interface IContainer {
  darkMode?: boolean;
  timerStarted?: boolean;
}
const Container = styled.TouchableOpacity<IContainer>(({timerStarted}) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: timerStarted ? palette.pink : palette.pinkDeep,
  alignItems: 'center',
  justifyContent: 'center',
}));

const PlaceText = styled.Text({
  fontFamily: fonts.Gagalin,
  fontSize: fontPixel(56),
  color: palette.white,
  marginTop: space.md,
  marginBottom: space.lg,
});

const TouchPill = styled.View({
  backgroundColor: palette.white,
  paddingHorizontal: space.xl,
  paddingVertical: space.sm,
  borderRadius: radius.pill,
});

const TouchText = styled.Text({
  fontFamily: fonts.MonstserratBold,
  fontSize: fontPixel(18),
  color: palette.pinkDeep,
});

const TimerText = styled.Text({
  fontFamily: fonts.Gagalin,
  fontSize: fontPixel(120),
  color: palette.white,
});
