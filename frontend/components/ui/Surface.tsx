import React, {FC} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useAppTheme} from 'utils/useAppTheme';
import {radius, shadow, space} from 'utils/theme';

interface IProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
  padded?: boolean;
}

/** Rounded card surface that follows the light/dark palette. */
export const Surface: FC<IProps> = ({
  children,
  style,
  elevated = true,
  padded = true,
}) => {
  const {c, isDark} = useAppTheme();
  return (
    <View
      style={[
        {
          backgroundColor: c.surface,
          borderRadius: radius.lg,
          borderWidth: isDark ? 1 : 0,
          borderColor: c.border,
        },
        padded && {padding: space.xl},
        elevated && !isDark && shadow.md,
        style,
      ]}>
      {children}
    </View>
  );
};
