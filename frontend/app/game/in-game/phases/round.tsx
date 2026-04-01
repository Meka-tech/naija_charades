/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect, useRef} from 'react';
import styled from '@emotion/native';
import {theme} from 'utils/theme';
import {fontPixel, heightPixel} from 'utils/pxToDpConvert';
import {SecondsToMinutes} from 'utils/function';
import {Accelerometer} from 'expo-sensors';

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

    if (y >= 0.5 && !hasBeenTiltedRef.current) {
      correct();
      hasBeenTiltedRef.current = true;
      setCanAnswer(false);
    }

    if (y <= -0.5 && !hasBeenTiltedRef.current) {
      skip();
      hasBeenTiltedRef.current = true;
      setCanAnswer(false);
    }

    if (hasBeenTiltedRef.current && Math.abs(y) < 0.2 && isUpright) {
      hasBeenTiltedRef.current = false;
    }
  }, [x, y, hasBeenTiltedRef.current, canAnswer, title]);

  useEffect(() => {
    if (canAnswer === false) {
      setTimeout(() => setCanAnswer(true), 100);
    }
  }, [canAnswer]);

  return (
    <Container>
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
      <Title>{title}</Title>
      <CardDiv>
        {hasBeenTiltedRef.current === false && <Card>{card}</Card>}
        {hasBeenTiltedRef.current && canAnswer && (
          <Reminder>(Hold device horizontally upright to continue!)</Reminder>
        )}
      </CardDiv>
      <Timer>{SecondsToMinutes(timer)}</Timer>
      <ScoreText>SCORE : {score}</ScoreText>
    </Container>
  );
};

export default Round;

const Container = styled.View({
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: 'rgba(244, 131, 155, 1)',
  alignItems: 'center',
  paddingVertical: heightPixel(20),
});

const Title = styled.Text({
  color: theme.colors.white,
  fontFamily: theme.fonts.Gagalin,
  fontSize: fontPixel(24),
  fontWeight: '500',
  marginBottom: heightPixel(80),
});

const CardDiv = styled.View({
  height: heightPixel(155),
  marginBottom: heightPixel(60),
  maxWidth: '80%',
  alignItems: 'center',
  justifyContent: 'center',
});
const Card = styled.Text({
  color: theme.colors.white,
  fontFamily: theme.fonts.MonstserratBold,
  fontSize: fontPixel(36),
  fontWeight: '500',
  textAlign: 'center',
});
const Reminder = styled.Text({
  color: theme.colors.main,
  fontFamily: theme.fonts.MonstserratBold,
  fontSize: fontPixel(40),
  fontWeight: '600',
  textAlign: 'center',
});

const Timer = styled.Text({
  color: theme.colors.main,
  fontFamily: theme.fonts.MonstserratBold,
  fontSize: fontPixel(24),
  fontWeight: '500',
});

const ScoreText = styled.Text({
  color: theme.colors.white,
  fontFamily: theme.fonts.MonstserratSemibold,
  fontSize: fontPixel(16),
  position: 'absolute',
  right: 20,
  top: 20,
});

const Operation = styled.TouchableOpacity({
  height: '100%',
  width: '25%',
  position: 'absolute',
});
