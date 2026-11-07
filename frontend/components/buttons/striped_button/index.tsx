import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PressableScale} from 'components/ui/PressableScale';
import {palette, radius, shadow, space, type} from 'utils/theme';
import {fontPixel, heightPixel} from 'utils/pxToDpConvert';
import {useAppTheme} from 'utils/useAppTheme';

interface IProps {
  width?: string;
  fontSize?: number;
  label: string;
  elevation?: number;
  onPress?: () => void;
  /** 'primary' = danfo gold, 'secondary' = neutral surface with gold label. */
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

/**
 * The signature Naija Charades button, styled after a Lagos danfo: yellow
 * body, black stripes and a black bumper edge. Springs and taps on press.
 */
export const StrippedButton: FC<IProps> = ({
  width,
  fontSize,
  label,
  elevation,
  onPress,
  variant = 'primary',
  disabled,
}) => {
  const {c, isDark} = useAppTheme();
  const primary = variant === 'primary';
  const bg = primary ? palette.gold : c.surface;
  const edge = primary ? palette.ink : c.border;
  const stripe = primary ? palette.ink : palette.gold;
  const labelColor = primary ? palette.white : palette.gold;

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      haptic="press"
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[
        styles.container,
        {
          width: (width ?? '100%') as any,
          backgroundColor: bg,
          borderBottomColor: edge,
          borderWidth: variant === 'secondary' ? 1 : 0,
          borderColor: c.border,
        },
        (elevation ?? 0) > 0 && !isDark ? shadow.md : null,
      ]}>
      <View
        style={[
          styles.stripe,
          {borderBottomColor: stripe},
        ]}
      />
      <Text
        style={[
          type.button,
          styles.label,
          {
            color: labelColor,
            fontSize: fontSize ? fontPixel(fontSize) : type.button.fontSize,
          },
        ]}>
        {label}
      </Text>
      <View
        style={[
          styles.stripe,
          {borderBottomColor: stripe},
        ]}
      />
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: heightPixel(58),
    borderRadius: radius.md,
    borderBottomWidth: 4,
    paddingVertical: space.xs,
    paddingHorizontal: space.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stripe: {
    width: '100%',
    borderBottomWidth: 2.5,
    opacity: 0.9,
    borderRadius: 2,
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginVertical: space.xxs,
  },
});
