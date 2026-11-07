import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppTheme} from 'utils/useAppTheme';
import {sizes, space, type} from 'utils/theme';

interface IProps {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  /** 'brand' uses Gagalin, 'plain' uses Montserrat. */
  variant?: 'brand' | 'plain';
}

/** Three-slot header: round action on the left, centred title, optional right action. */
export const ScreenHeader: FC<IProps> = ({
  title,
  left,
  right,
  variant = 'brand',
}) => {
  const {c} = useAppTheme();
  return (
    <View style={styles.row}>
      <View style={styles.side}>{left}</View>
      <Text
        numberOfLines={1}
        style={[
          variant === 'brand' ? type.title : type.heading,
          styles.title,
          {color: c.text},
        ]}>
        {title}
      </Text>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: sizes.iconButton,
    marginTop: space.xs,
    marginBottom: space.lg,
  },
  side: {width: sizes.iconButton},
  right: {alignItems: 'flex-end'},
  title: {flex: 1, textAlign: 'center'},
});
