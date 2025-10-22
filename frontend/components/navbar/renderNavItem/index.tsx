import styled from '@emotion/native';
import React, {FC} from 'react';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';
import {theme} from 'utils/theme';
import {IsDarkMode} from 'utils/isDarkMode';
import {useRouter} from 'expo-router';

interface IProps {
  active: boolean;
  text?: string;
  Icon?: JSX.Element;
  nav?: string;
  isPremium?: boolean;
}

export const RenderNavItem: FC<IProps> = ({
  active,
  text,
  Icon,
  nav,
  isPremium,
}) => {
  const router = useRouter();
  const isDarkMode = IsDarkMode();

  return (
    <Container
      active={active}
      isPremium={isPremium}
      onPress={() => {
        if (isPremium) {
          return;
        } else {
          router.push(nav ?? '/');
        }
      }}>
      <IconView>{Icon}</IconView>
      <TextView>
        <TextAbove isDarkMode={isDarkMode} active={active}>
          {text}
        </TextAbove>
        <TextBelow active={active}>{text}</TextBelow>
      </TextView>
    </Container>
  );
};

interface IContainer {
  active: boolean;
  isPremium?: boolean;
}

const Container = styled.TouchableOpacity<IContainer>(
  ({active, isPremium}) => ({
    backgroundColor: active ? theme.colors.main : 'transparent',
    color: active ? theme.colors.white : theme.colors.black,
    paddingLeft: widthPixel(60),
    width: '100%',
    height: heightPixel(40),
    marginBottom: heightPixel(20),
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    opacity: isPremium ? 0.5 : 1,
  }),
);
const IconView = styled.View({});

const TextView = styled.View({
  marginLeft: widthPixel(21),
  position: 'relative',
  justifyContent: 'center',
  height: heightPixel(31),
  width: '100%',
});

interface IText {
  active: boolean;
  isDarkMode?: boolean;
}
const TextAbove = styled.Text<IText>(({active, isDarkMode}) => ({
  fontWeight: '500',
  fontSize: fontPixel(24),
  fontFamily: theme.fonts.Gagalin,
  color: active
    ? theme.colors.white
    : isDarkMode
    ? theme.colors.white
    : theme.colors.black,
  position: 'absolute',
  zIndex: 1,
}));
const TextBelow = styled.Text<IText>(({active}) => ({
  fontWeight: '500',
  fontSize: fontPixel(24),
  fontFamily: theme.fonts.Gagalin,
  color: active ? theme.colors.black : theme.colors.main,
  position: 'absolute',
  bottom: 0,
}));

const PremiumTag = styled.View({
  backgroundColor: theme.colors.main,
  paddingHorizontal: widthPixel(10),
  paddingVertical: heightPixel(5),
  borderRadius: widthPixel(10),
});

const PremiumText = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(12),
  fontFamily: theme.fonts.Gagalin,
  textTransform: 'uppercase',
});
