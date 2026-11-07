import React, {FC} from 'react';
import {Pressable, PressableProps, StyleProp, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {haptics} from 'utils/haptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface PressableScaleProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  /** Scale applied while pressed. */
  activeScale?: number;
  /** Haptic fired on press-in. Set to false to disable. */
  haptic?: keyof typeof haptics | false;
  children?: React.ReactNode;
}

const SPRING = {damping: 18, stiffness: 320, mass: 0.6};

/** Pressable that springs down slightly and gives a haptic tap. */
export const PressableScale: FC<PressableScaleProps> = ({
  style,
  activeScale = 0.96,
  haptic = 'tap',
  onPressIn,
  onPressOut,
  disabled,
  children,
  ...rest
}) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <AnimatedPressable
      {...rest}
      disabled={disabled}
      onPressIn={e => {
        scale.value = withSpring(activeScale, SPRING);
        if (haptic) {
          haptics[haptic]();
        }
        onPressIn?.(e);
      }}
      onPressOut={e => {
        scale.value = withSpring(1, SPRING);
        onPressOut?.(e);
      }}
      style={[style, animatedStyle, disabled ? {opacity: 0.5} : null]}>
      {children}
    </AnimatedPressable>
  );
};
