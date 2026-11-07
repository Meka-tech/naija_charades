import React from 'react';
import styled from '@emotion/native';
import Animated, {FadeIn, ZoomIn} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import {fonts, palette, space} from 'utils/theme';
import {fontPixel, widthPixel} from 'utils/pxToDpConvert';

interface Iprops {
  status: string;
}

export default function EndCard({status}: Iprops) {
  const correct = status === 'Correct';
  return (
    <Animated.View
      entering={FadeIn.duration(120)}
      style={[
        containerStyle,
        {backgroundColor: correct ? palette.green : palette.gold},
      ]}>
      <Animated.View entering={ZoomIn.springify().damping(11)}>
        <Ionicons
          name={correct ? 'checkmark-circle' : 'play-skip-forward-circle'}
          size={widthPixel(110)}
          color={palette.white}
        />
      </Animated.View>
      <Status>{correct ? 'Correct!' : 'Pass'}</Status>
    </Animated.View>
  );
}

const containerStyle = {
  width: '100%' as const,
  height: '100%' as const,
  position: 'absolute' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  zIndex: 20,
};

const Status = styled.Text({
  color: palette.white,
  fontFamily: fonts.Gagalin,
  fontSize: fontPixel(64),
  marginTop: space.sm,
});
