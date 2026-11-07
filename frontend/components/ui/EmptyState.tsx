import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import {StrippedButton} from 'components/buttons/striped_button';
import {useAppTheme} from 'utils/useAppTheme';
import {palette, radius, space, type} from 'utils/theme';
import {widthPixel} from 'utils/pxToDpConvert';

interface IProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Smaller variant for use inside cards (no illustration stack, no button). */
  compact?: boolean;
}

const CARD_W = widthPixel(78);
const CARD_H = widthPixel(104);

/**
 * Branded empty state: a fanned stack of game cards (echoing the app icon)
 * with a floating icon, a Gagalin title, a short hint and an optional action.
 */
export const EmptyState: FC<IProps> = ({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  compact,
}) => {
  const {c} = useAppTheme();
  const float = useSharedValue(0);

  useEffect(() => {
    float.value = withRepeat(
      withSequence(
        withTiming(-6, {duration: 1400}),
        withTiming(0, {duration: 1400}),
      ),
      -1,
    );
  }, [float]);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{translateY: float.value}],
  }));

  if (compact) {
    return (
      <View style={styles.compact}>
        <Ionicons name={icon} size={widthPixel(26)} color={c.textMuted} />
        <Text style={[type.caption, styles.compactText, {color: c.textMuted}]}>
          {title}
        </Text>
      </View>
    );
  }

  return (
    <Animated.View
      entering={FadeInDown.springify().damping(18)}
      style={styles.wrap}>
      <Animated.View style={[styles.stack, floatStyle]}>
        <View
          style={[
            styles.card,
            {backgroundColor: palette.sky, transform: [{rotate: '-14deg'}]},
            styles.back,
          ]}
        />
        <View
          style={[
            styles.card,
            {backgroundColor: palette.coral, transform: [{rotate: '-5deg'}]},
            styles.middle,
          ]}
        />
        <View
          style={[
            styles.card,
            styles.front,
            {backgroundColor: palette.gold, transform: [{rotate: '7deg'}]},
          ]}>
          <Ionicons name={icon} size={widthPixel(38)} color={palette.white} />
        </View>
      </Animated.View>
      <Text style={[type.title, styles.title, {color: c.text}]}>{title}</Text>
      {!!message && (
        <Text style={[type.body, styles.message, {color: c.textMuted}]}>
          {message}
        </Text>
      )}
      {!!actionLabel && !!onAction && (
        <View style={styles.action}>
          <StrippedButton label={actionLabel} onPress={onAction} />
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: space.lg,
  },
  stack: {
    width: CARD_W * 1.9,
    height: CARD_H * 1.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.xl,
  },
  card: {
    position: 'absolute',
    width: CARD_W,
    height: CARD_H,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },
  back: {left: CARD_W * 0.15, opacity: 0.95},
  middle: {left: CARD_W * 0.45},
  front: {left: CARD_W * 0.8},
  title: {textAlign: 'center', marginBottom: space.xs},
  message: {
    textAlign: 'center',
    lineHeight: widthPixel(22),
    maxWidth: widthPixel(300),
  },
  action: {width: '100%', marginTop: space.xl},
  compact: {
    alignItems: 'center',
    paddingVertical: space.lg,
    gap: space.xs,
    opacity: 0.8,
  },
  compactText: {textAlign: 'center'},
});
