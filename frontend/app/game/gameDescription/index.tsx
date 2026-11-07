import React from 'react';
import styled from '@emotion/native';
import {SecondaryMenuPage, StrippedButton} from 'components';
import {heightPixel, widthPixel} from 'utils/pxToDpConvert';
import {fonts, palette, radius, shadow, space, type} from 'utils/theme';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';
import {useLocalSearchParams, useRouter} from 'expo-router';
import Animated, {FadeInDown, ZoomIn} from 'react-native-reanimated';
import {Image, StyleSheet, View} from 'react-native';

export default function GameDescription() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const CategoryTitle = params.title;
  const CategoryDescription = params.description;
  const CategoryIndex = params.index;
  const QuickPlay = useSelector((state: RootState) => state.teamData.quickPlay);

  // Use the category's own colour and icon when available.
  const category = useSelector((state: RootState) =>
    state.reducer.cardArray.cardArray.find(
      (item: any) => item.title === CategoryTitle,
    ),
  );
  const color = category?.color ?? palette.sky;

  return (
    <SecondaryMenuPage title={QuickPlay ? '' : 'Round 1 · Team 1'}>
      <Body>
        <Animated.View
          entering={FadeInDown.springify().damping(18)}
          style={[styles.card, {backgroundColor: color}]}>
          <View style={styles.glow} pointerEvents="none" />
          {!!category?.icon && (
            <Animated.View
              entering={ZoomIn.delay(150).springify()}
              style={styles.iconWrap}>
              <Image
                source={{uri: category.icon}}
                style={styles.icon}
                resizeMode="contain"
              />
            </Animated.View>
          )}
          <Title>{CategoryTitle}</Title>
          <DescriptionText>{CategoryDescription}</DescriptionText>
          {category?.cards?.length ? (
            <Chip>
              <ChipText>{category.cards.length} cards</ChipText>
            </Chip>
          ) : null}
        </Animated.View>
        <Button>
          <StrippedButton
            label="Play"
            onPress={() =>
              router.push({
                pathname: '/game/whoseGuess',
                params: {
                  title: CategoryTitle,
                  custom: 'false',
                  id: CategoryIndex?.toString(),
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
  card: {
    width: '100%',
    borderRadius: radius.xl,
    marginTop: space.lg,
    paddingVertical: space.xxl,
    paddingHorizontal: space.xl,
    alignItems: 'center',
    overflow: 'hidden',
    ...shadow.md,
  },
  glow: {
    position: 'absolute',
    top: -widthPixel(80),
    right: -widthPixel(60),
    width: widthPixel(240),
    height: widthPixel(240),
    borderRadius: widthPixel(120),
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  iconWrap: {
    width: widthPixel(110),
    height: widthPixel(110),
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.lg,
  },
  icon: {width: widthPixel(84), height: widthPixel(84)},
});

const Body = styled.View({
  width: '100%',
  flex: 1,
  alignItems: 'center',
});

const Button = styled.View({
  width: '100%',
  marginTop: 'auto',
  marginBottom: space.lg,
});

const textShadow = {
  textShadowColor: 'rgba(0,0,0,0.25)',
  textShadowOffset: {width: 0, height: 1},
  textShadowRadius: 3,
};

const Title = styled.Text({
  ...type.title,
  ...textShadow,
  color: palette.white,
  textAlign: 'center',
  marginBottom: space.sm,
});

const DescriptionText = styled.Text({
  ...type.body,
  fontSize: type.subheading.fontSize,
  lineHeight: heightPixel(26),
  color: 'rgba(255,255,255,0.95)',
  textAlign: 'center',
  ...textShadow,
});

const Chip = styled.View({
  marginTop: space.lg,
  paddingHorizontal: space.md,
  paddingVertical: space.xs,
  borderRadius: radius.pill,
  backgroundColor: 'rgba(0,0,0,0.15)',
});
const ChipText = styled.Text({
  fontFamily: fonts.MonstserratBold,
  fontSize: type.caption.fontSize,
  color: palette.white,
  letterSpacing: 0.5,
});
