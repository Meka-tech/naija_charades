import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import {PressableScale} from 'components/ui/PressableScale';
import {useAppTheme} from 'utils/useAppTheme';
import {fonts, palette, radius, space} from 'utils/theme';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';

interface IProps {
  active: boolean;
  text?: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  nav?: string;
  isPremium?: boolean;
}

export const RenderNavItem: FC<IProps> = ({
  active,
  text,
  icon,
  nav,
  isPremium,
}) => {
  const router = useRouter();
  const {c} = useAppTheme();

  return (
    <PressableScale
      haptic="select"
      activeScale={0.97}
      accessibilityRole="button"
      accessibilityState={{selected: active}}
      style={[
        styles.container,
        {backgroundColor: active ? palette.gold : 'transparent'},
        isPremium && {opacity: 0.5},
      ]}
      onPress={() => {
        if (!isPremium) {
          router.push(nav ?? '/');
        }
      }}>
      <View style={styles.icon}>
        {!!icon && (
          <Ionicons
            name={icon}
            size={widthPixel(24)}
            color={active ? palette.white : c.text}
          />
        )}
      </View>
      <View>
        {/* Gold drop-shadow text is part of the original brand look. */}
        <Text
          style={[
            styles.label,
            styles.shadowLabel,
            {color: active ? palette.ink : palette.gold},
          ]}>
          {text}
        </Text>
        <Text style={[styles.label, {color: active ? palette.white : c.text}]}>
          {text}
        </Text>
      </View>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: heightPixel(54),
    marginHorizontal: space.md,
    paddingHorizontal: space.lg,
    borderRadius: radius.md,
  },
  icon: {
    width: widthPixel(32),
    alignItems: 'center',
    marginRight: space.md,
  },
  label: {
    fontFamily: fonts.Gagalin,
    fontSize: fontPixel(22),
  },
  shadowLabel: {
    position: 'absolute',
    top: 2,
    left: 1,
  },
});
