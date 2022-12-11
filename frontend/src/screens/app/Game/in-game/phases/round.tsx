/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect} from 'react';
import styled from '@emotion/native';
import {theme} from '../../../../../utils/theme';
import {fontPixel, heightPixel} from '../../../../../utils/pxToDpConvert';
import {SecondsToMinutes} from '../../../../../utils/function';
import {Accelerometer} from 'expo-sensors';

interface Iprops {
  title: string;
  timer: number;
  score?: string;
  correct: () => void;
  skip: () => void;
  card?: string;
}

export const Round: FC<Iprops> = ({
  title,
  timer,
  score,
  correct,
  skip,
  card,
}) => {
  const [hasBeenTilted, setHasBeenTilted] = useState(true);
  const [{x, y, z}, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    if (y >= 0.5 && hasBeenTilted === false) {
      correct();
      setHasBeenTilted(true);
    }
    if (y <= -0.5 && hasBeenTilted === false) {
      skip();
      setHasBeenTilted(true);
    }
    if (hasBeenTilted && y < 0.04 && y > -0.04 && x > 0.7) {
      setHasBeenTilted(false);
    }
    return () => _unsubscribe();
  }, [x, y]);

  return (
    <Container>
      <Operation onPress={correct} style={{right: 0}} />
      <Operation onPress={skip} style={{left: 0}} />
      <Title>{title}</Title>
      <CardDiv>
        {hasBeenTilted === false && <Card>{card}</Card>}
        {hasBeenTilted && (
          <Reminder>(Hold device upright to continue!)</Reminder>
        )}
      </CardDiv>
      <Timer>{SecondsToMinutes(timer)}</Timer>
      <ScoreText>SCORE : {score}</ScoreText>
    </Container>
  );
};

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
  fontSize: fontPixel(20),
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
  fontSize: fontPixel(50),
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
