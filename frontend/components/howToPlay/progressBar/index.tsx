import React, {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {widthPixel} from 'utils/pxToDpConvert';
import {palette} from 'utils/theme';
import {useAppTheme} from 'utils/useAppTheme';

interface IProps {
  items: number;
  activeSlide: number;
}

const DOT = widthPixel(8);
const ACTIVE = widthPixel(26);

const Dot: FC<{active: boolean; idle: string}> = ({active, idle}) => {
  const w = useSharedValue(active ? ACTIVE : DOT);
  useEffect(() => {
    w.value = withSpring(active ? ACTIVE : DOT, {damping: 18, stiffness: 220});
  }, [active, w]);
  const style = useAnimatedStyle(() => ({width: w.value}));
  return (
    <Animated.View
      style={[
        styles.dot,
        style,
        {backgroundColor: active ? palette.gold : idle},
      ]}
    />
  );
};

/** Pager indicator: the active dot stretches into a gold pill. */
const ProgressBar: FC<IProps> = ({items, activeSlide}) => {
  const {c} = useAppTheme();
  return (
    <View style={styles.row}>
      {Array.from({length: items}, (_, i) => (
        <Dot key={i} active={activeSlide === i} idle={c.border} />
      ))}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center', gap: widthPixel(6)},
  dot: {height: DOT, borderRadius: DOT / 2},
});
