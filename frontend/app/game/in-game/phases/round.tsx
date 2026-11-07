/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect, useRef} from 'react';
import styled from '@emotion/native';
import {fonts, palette, radius, space} from 'utils/theme';
import {fontPixel, widthPixel} from 'utils/pxToDpConvert';
import {SecondsToMinutes} from 'utils/function';
import {Accelerometer} from 'expo-sensors';
import {Platform, StyleSheet, View} from 'react-native';
import Animated, {FadeIn, ZoomIn} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Iprops {
  title: string;
  timer: number;
  score?: string;
  correct: () => void;
  skip: () => void;
  card?: string;
}

const Round: FC<Iprops> = ({title, timer, score, correct, skip, card}) => {
  const hasBeenTiltedRef = useRef(true);

  const [canAnswer, setCanAnswer] = useState(true);
  const [isUpright, setIsUpright] = useState(false);
  const [{x, y, z}, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });

    Accelerometer.setUpdateInterval(100); // 10 updates per second

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  useEffect(() => {
    const isScreenVertical = Math.abs(z) < 0.4;
    const hasGravityOnMainAxis = Math.abs(x) > 0.8;
    const isDeviceUpright = isScreenVertical && hasGravityOnMainAxis;
    setIsUpright(isDeviceUpright);

    if (!canAnswer) return;

    // With the phone on the forehead (landscape, screen facing out), tilting
    // forward/back rotates gravity onto the z axis. iOS reports z = +1 when the
    // screen faces the floor; Android reports the opposite sign, so normalise.
    // tiltZ > 0 => screen facing down (tilted down), tiltZ < 0 => facing up.
    const tiltZ = Platform.OS === 'ios' ? z : -z;

    if (tiltZ >= 0.6 && !hasBeenTiltedRef.current) {
      correct();
      hasBeenTiltedRef.current = true;
      setCanAnswer(false);
    }

    if (tiltZ <= -0.6 && !hasBeenTiltedRef.current) {
      skip();
      hasBeenTiltedRef.current = true;
      setCanAnswer(false);
    }

    if (hasBeenTiltedRef.current && Math.abs(tiltZ) < 0.3 && isDeviceUpright) {
      hasBeenTiltedRef.current = false;
    }
  }, [x, y, z, hasBeenTiltedRef.current, canAnswer, title]);

  useEffect(() => {
    if (canAnswer === false) {
      setTimeout(() => setCanAnswer(true), 100);
    }
  }, [canAnswer]);

  const lowTime = timer <= 10;
  // Keep the pills clear of camera cutouts in landscape (Android edge-to-edge, iPhone island).
  const insets = useSafeAreaInsets();
  const sidePad = Math.max(insets.left, insets.right);

  return (
    <Container
      style={{
        paddingHorizontal: Math.max(widthPixel(90), sidePad + space.lg),
        paddingBottom: Math.max(insets.bottom, space.lg),
      }}>
      <Operation
        onPress={() => {
          if (hasBeenTiltedRef.current === false && canAnswer) {
            setCanAnswer(false);
            correct();
          }
        }}
        style={{right: 0}}
      />
      <Operation
        onPress={() => {
          if (hasBeenTiltedRef.current === false && canAnswer) {
            setCanAnswer(false);
            skip();
          }
        }}
        style={{left: 0}}
      />
      <Glow pointerEvents="none" />
      <TopBar pointerEvents="none">
        <Title numberOfLines={1}>{title}</Title>
      </TopBar>
      <ScorePill
        pointerEvents="none"
        style={{right: Math.max(insets.right, space.xl)}}>
        <Ionicons name="star" size={widthPixel(14)} color={palette.gold} />
        <ScoreText>{score}</ScoreText>
      </ScorePill>
      <CardDiv pointerEvents="none">
        {hasBeenTiltedRef.current === false && (
          <Animated.View key={card} entering={ZoomIn.springify().damping(14)}>
            <Card adjustsFontSizeToFit numberOfLines={3}>
              {card}
            </Card>
          </Animated.View>
        )}
        {hasBeenTiltedRef.current && canAnswer && (
          <Animated.View entering={FadeIn} style={styles.reminder}>
            <Ionicons
              name="phone-landscape-outline"
              size={widthPixel(26)}
              color={palette.pinkDeep}
            />
            <Reminder>Hold the phone upright to continue</Reminder>
          </Animated.View>
        )}
      </CardDiv>
      <BottomBar pointerEvents="none">
        <Hint>
          <Ionicons name="arrow-up" size={widthPixel(16)} color="white" />
          <HintText>Tilt up · Pass</HintText>
        </Hint>
        <TimerPill style={lowTime ? styles.timerLow : null}>
          <Ionicons
            name="time-outline"
            size={widthPixel(18)}
            color={lowTime ? palette.white : palette.ink}
          />
          <Timer style={lowTime ? styles.timerTextLow : null}>
            {SecondsToMinutes(timer)}
          </Timer>
        </TimerPill>
        <Hint>
          <HintText>Correct · Tilt down</HintText>
          <Ionicons name="arrow-down" size={widthPixel(16)} color="white" />
        </Hint>
      </BottomBar>
    </Container>
  );
};

export default Round;

const styles = StyleSheet.create({
  reminder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    backgroundColor: palette.white,
    paddingHorizontal: space.xl,
    paddingVertical: space.md,
    borderRadius: radius.pill,
  },
  timerLow: {backgroundColor: palette.orange},
  timerTextLow: {color: palette.white},
});

const Container = styled.View({
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: palette.pink,
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: space.lg,
  paddingHorizontal: widthPixel(90),
  overflow: 'hidden',
});

const Glow = styled.View({
  position: 'absolute',
  width: widthPixel(520),
  height: widthPixel(520),
  borderRadius: widthPixel(260),
  backgroundColor: 'rgba(255,255,255,0.10)',
  top: '50%',
  marginTop: -widthPixel(260),
  alignSelf: 'center',
});

const TopBar = styled.View({
  alignItems: 'center',
  minHeight: widthPixel(40),
  justifyContent: 'center',
});

const Title = styled.Text({
  color: palette.white,
  fontFamily: fonts.Gagalin,
  fontSize: fontPixel(24),
  opacity: 0.95,
});

const ScorePill = styled.View({
  position: 'absolute',
  right: space.xl,
  top: space.lg,
  flexDirection: 'row',
  alignItems: 'center',
  gap: space.xxs,
  backgroundColor: 'rgba(0,0,0,0.16)',
  paddingHorizontal: space.md,
  paddingVertical: space.xs,
  borderRadius: radius.pill,
});

const ScoreText = styled.Text({
  color: palette.white,
  fontFamily: fonts.MonstserratBold,
  fontSize: fontPixel(16),
});

const CardDiv = styled.View({
  flex: 1,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

const Card = styled.Text({
  color: palette.white,
  fontFamily: fonts.MonstserratBlack,
  fontSize: fontPixel(46),
  textAlign: 'center',
  textShadowColor: 'rgba(0,0,0,0.18)',
  textShadowOffset: {width: 0, height: 3},
  textShadowRadius: 8,
});

const Reminder = styled.Text({
  color: palette.ink,
  fontFamily: fonts.MonstserratBold,
  fontSize: fontPixel(20),
  textAlign: 'center',
});

const BottomBar = styled.View({
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Hint = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: space.xxs,
  opacity: 0.8,
  width: widthPixel(170),
});

const HintText = styled.Text({
  color: palette.white,
  fontFamily: fonts.MonstserratSemibold,
  fontSize: fontPixel(13),
});

const TimerPill = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: space.xs,
  backgroundColor: palette.white,
  paddingHorizontal: space.lg,
  paddingVertical: space.xs,
  borderRadius: radius.pill,
});

const Timer = styled.Text({
  color: palette.ink,
  fontFamily: fonts.MonstserratExtraBold,
  fontSize: fontPixel(22),
  fontVariant: ['tabular-nums'],
});

const Operation = styled.TouchableOpacity({
  height: '100%',
  width: '25%',
  position: 'absolute',
  zIndex: 5,
});
