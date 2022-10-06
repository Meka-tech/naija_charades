/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import styled from '@emotion/native';
import {IsDarkMode} from '../../../../../utils/isDarkMode';
import {theme} from '../../../../../utils/theme';
import {fontPixel, heightPixel} from '../../../../../utils/pxToDpConvert';
import {SecondsToMinutes} from '../../../../../utils/function';

interface Iprops {
  title: string;
  timer: number;
  score?: string;
  correct: () => void;
  skip: () => void;
}

export const Round: FC<Iprops> = ({title, timer, score, correct, skip}) => {
  return (
    <Container>
      <Operation onPress={correct} style={{right: 0}} />
      <Operation onPress={skip} style={{left: 0}} />
      <Title>{title}</Title>
      <Card>Shoki</Card>
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

const Card = styled.Text({
  color: theme.colors.white,
  fontFamily: theme.fonts.MonstserratBold,
  fontSize: fontPixel(70),
  fontWeight: '500',
  marginBottom: heightPixel(60),
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
