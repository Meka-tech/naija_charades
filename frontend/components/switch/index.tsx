import React, {FC, useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {widthPixel} from 'utils/pxToDpConvert';
import {palette} from 'utils/theme';
import {useAppTheme} from 'utils/useAppTheme';
import {haptics} from 'utils/haptics';

interface IProps {
  toggle?: () => void;
  active: boolean;
}

const W = widthPixel(54);
const H = widthPixel(32);
const KNOB = H - 6;

/** Animated toggle with a gold "on" track. */
export const Switch: FC<IProps> = ({active, toggle}) => {
  const {c} = useAppTheme();
  const p = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    p.value = withSpring(active ? 1 : 0, {damping: 18, stiffness: 260});
  }, [active, p]);

  const track = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      p.value,
      [0, 1],
      [c.surfaceAlt, palette.gold],
    ),
  }));
  const knob = useAnimatedStyle(() => ({
    transform: [{translateX: p.value * (W - KNOB - 6)}],
  }));

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{checked: active}}
      hitSlop={8}
      onPress={() => {
        haptics.select();
        toggle?.();
      }}>
      <Animated.View style={[styles.track, {borderColor: c.border}, track]}>
        <Animated.View style={[styles.knob, knob]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: W,
    height: H,
    borderRadius: H / 2,
    padding: 3,
    borderWidth: 1,
    justifyContent: 'center',
  },
  knob: {
    width: KNOB,
    height: KNOB,
    borderRadius: KNOB / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
