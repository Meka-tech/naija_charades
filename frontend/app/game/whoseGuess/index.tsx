import React, {FC, useEffect, useState} from 'react';
import styled from '@emotion/native';
import {SecondaryMenuPage, StrippedButton} from 'components';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';

import {palette, radius, shadow, space, type} from 'utils/theme';
import {useAppTheme} from 'utils/useAppTheme';
import {PressableScale} from 'components/ui';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {StyleSheet, View} from 'react-native';

import {useLocalSearchParams, useRouter} from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';

interface IGuessBlock {
  active?: boolean;
  title?: string;
  description?: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  index: number;
  onPress?: () => void;
}
const GuessBlock: FC<IGuessBlock> = ({
  active,
  title,
  description,
  icon,
  index,
  onPress,
}) => {
  const {c, isDark} = useAppTheme();
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 90)
        .springify()
        .damping(18)}>
      <PressableScale
        onPress={onPress}
        haptic="select"
        activeScale={0.98}
        accessibilityRole="radio"
        accessibilityState={{selected: !!active}}
        style={[
          styles.block,
          {
            backgroundColor: active ? palette.gold : c.surface,
          },
          !isDark && shadow.sm,
        ]}>
        <View
          style={[
            styles.iconWrap,
            {backgroundColor: active ? palette.ink : c.surfaceAlt},
          ]}>
          <Ionicons
            name={icon}
            size={widthPixel(26)}
            color={active ? palette.gold : c.textMuted}
          />
        </View>
        <GuessText>
          <GuessTitle style={{color: active ? palette.ink : c.text}}>
            {title}
          </GuessTitle>
          <GuessDescription
            style={{color: active ? 'rgba(26,25,25,0.75)' : c.textMuted}}>
            {description}
          </GuessDescription>
        </GuessText>
        <View
          style={[
            styles.radio,
            {backgroundColor: active ? palette.ink : c.surfaceAlt},
          ]}>
          {active ? <View style={styles.radioDot} /> : null}
        </View>
      </PressableScale>
    </Animated.View>
  );
};

export default function WhoseGuess() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [selectedGuess, setSelectedGuess] = useState<'you' | 'others'>(
    params.youGuess === 'false' ? 'others' : 'you',
  );
  const CategoryTitle = params.title;
  const Custom = params.custom;
  const Id = params.id;

  const ClickYouGuess = () => {
    setSelectedGuess('you');
  };

  const ClickOtherGuess = () => {
    setSelectedGuess('others');
  };

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return (
    <SecondaryMenuPage title="Who's guessing?">
      <Body>
        <Guesses>
          <GuessBlock
            active={selectedGuess === 'you'}
            onPress={ClickYouGuess}
            icon="phone-portrait-outline"
            index={0}
            title="You Guess"
            description="Place the screen on your forehead and try to guess, while your teammates describe or act out the words."
          />
          <GuessBlock
            active={selectedGuess === 'others'}
            onPress={ClickOtherGuess}
            icon="people-outline"
            index={1}
            title="Others Guess"
            description="Describe or act out the words on the screen, while your teammates guess the word"
          />
        </Guesses>
        <Button>
          <StrippedButton
            label="Next"
            onPress={() =>
              router.push({
                pathname: '/game/in-game',
                params: {
                  title: CategoryTitle,
                  youGuess: selectedGuess === 'you' ? 'true' : 'false',
                  custom: Custom,
                  id: Id,
                },
              })
            }
          />
        </Button>
      </Body>
    </SecondaryMenuPage>
  );
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: space.lg,
    borderRadius: radius.lg,
  },
  iconWrap: {
    width: widthPixel(52),
    height: widthPixel(52),
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: space.md,
  },
  radio: {
    width: widthPixel(24),
    height: widthPixel(24),
    borderRadius: widthPixel(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: space.sm,
  },
  radioDot: {
    width: widthPixel(12),
    height: widthPixel(12),
    borderRadius: widthPixel(6),
    backgroundColor: palette.gold,
  },
});

const Body = styled.View({
  width: '100%',
  flex: 1,
  alignItems: 'center',
});

const Button = styled.View({
  width: '100%',
  marginBottom: space.lg,
  marginTop: 'auto',
});

const Guesses = styled.View({
  gap: space.md,
  marginTop: heightPixel(60),
  width: '100%',
});

const GuessText = styled.View({
  flex: 1,
});
const GuessTitle = styled.Text({
  ...type.heading,
  fontSize: type.subheading.fontSize,
  marginBottom: space.xxs,
});
const GuessDescription = styled.Text({
  ...type.body,
  fontSize: fontPixel(13),
  lineHeight: fontPixel(19),
});
