import React, {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {PressableScale} from './PressableScale';
import {useAppTheme} from 'utils/useAppTheme';
import {sizes} from 'utils/theme';

interface IProps {
  name: React.ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
  /** 'surface' = soft filled circle, 'glass' = translucent white for coloured backgrounds. */
  variant?: 'surface' | 'glass';
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export const IconButton: FC<IProps> = ({
  name,
  onPress,
  variant = 'surface',
  color,
  size = sizes.iconButton,
  style,
  accessibilityLabel,
}) => {
  const {c} = useAppTheme();
  const bg = variant === 'glass' ? 'rgba(255,255,255,0.22)' : c.surfaceAlt;
  const fg = color ?? (variant === 'glass' ? '#FFFFFF' : c.text);

  return (
    <PressableScale
      onPress={onPress}
      hitSlop={8}
      activeScale={0.9}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.base,
        {width: size, height: size, borderRadius: size / 2, backgroundColor: bg},
        style,
      ]}>
      <Ionicons name={name} size={size * 0.5} color={fg} />
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  base: {alignItems: 'center', justifyContent: 'center'},
});
