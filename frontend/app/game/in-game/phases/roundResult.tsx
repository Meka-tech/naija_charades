import React, {FC, useEffect} from 'react';
import styled from '@emotion/native';
import {fontPixel, widthPixel} from 'utils/pxToDpConvert';
import {fonts, palette, radius, shadow, space, type} from 'utils/theme';
import {useAppTheme} from 'utils/useAppTheme';
import {EmptyState, IconButton, ScreenHeader} from 'components/ui';
import SafeAreaViewWrapper from 'components/safeAreaViewWrapper';
import Animated, {FadeInDown, ZoomIn} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import {ScrollView, StyleSheet, View} from 'react-native';

import Art2Img from 'assets/images/background_art.png';
import ArtImg from 'assets/images/background_art2.png';

import {useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';
import {StrippedButton} from 'components';
import * as ScreenOrientation from 'expo-screen-orientation';
import {useRouter} from 'expo-router';

interface IProps {
  round: number;
  team: number;
  title: string;
  onClick: () => void;
}

const RoundResult: FC<IProps> = ({team, round, title, onClick}) => {
  const router = useRouter();
  const QuickPlay = useSelector((state: RootState) => state.teamData.quickPlay);
  const score = useSelector(
    (state: RootState) => state.teamData.teamArray[team - 1].score,
  );

  const CorrectCards = useSelector(
    (state: RootState) => state.teamData.teamArray[team - 1].cards.correct,
  );
  const SkippedCards = useSelector(
    (state: RootState) => state.teamData.teamArray[team - 1].cards.skip,
  );

  const TotalRounds = useSelector(
    (state: RootState) => state.reducer.gameRules.rounds,
  );

  const TotalTeams = useSelector(
    (state: RootState) => state.reducer.gameRules.teams,
  );

  const {isDark: isDarkMode, c} = useAppTheme();

  const ClickNext = () => {
    router.push('/home');
  };

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return (
    <Container style={{backgroundColor: c.background}}>
      <Image
        source={isDarkMode ? Art2Img : ArtImg}
        resizeMode="cover"
        imageStyle={{opacity: isDarkMode ? 0.35 : 1}}>
        <SafeAreaViewWrapper darkmode={isDarkMode} style={styles.safe}>
          <ScreenHeader
            title={title}
            left={
              <IconButton
                name="chevron-back"
                accessibilityLabel="Go back"
                onPress={() => router.back()}
              />
            }
          />
          {!QuickPlay && (
            <RoundChip>
              <RoundChipText>{`Round ${round} · Team ${team}`}</RoundChipText>
            </RoundChip>
          )}

          <Animated.View entering={ZoomIn.springify().damping(12)}>
            <ScoreText>{score}</ScoreText>
          </Animated.View>
          <ScoreLabel style={{color: c.textMuted}}>points</ScoreLabel>

          <Animated.View
            entering={FadeInDown.delay(120).springify().damping(18)}
            style={styles.columns}>
            <View
              style={[
                styles.column,
                {backgroundColor: c.surface},
                !isDarkMode && shadow.sm,
              ]}>
              <ColumnHeader>
                <Ionicons
                  name="checkmark-circle"
                  size={widthPixel(18)}
                  color={palette.green}
                />
                <CategoryTitle style={{color: palette.green}}>
                  Correct · {CorrectCards.length}
                </CategoryTitle>
              </ColumnHeader>
              <ScrollView showsVerticalScrollIndicator={false}>
                {CorrectCards.length === 0 && (
                  <EmptyState
                    compact
                    icon="happy-outline"
                    title="None this round"
                  />
                )}
                {CorrectCards.map((card, index) => (
                  <CardNames key={index} style={{color: c.text}}>
                    {card}
                  </CardNames>
                ))}
              </ScrollView>
            </View>
            <View
              style={[
                styles.column,
                {backgroundColor: c.surface},
                !isDarkMode && shadow.sm,
              ]}>
              <ColumnHeader>
                <Ionicons
                  name="play-skip-forward-circle"
                  size={widthPixel(18)}
                  color={palette.gold}
                />
                <CategoryTitle style={{color: palette.gold}}>
                  Passed · {SkippedCards.length}
                </CategoryTitle>
              </ColumnHeader>
              <ScrollView showsVerticalScrollIndicator={false}>
                {SkippedCards.length === 0 && (
                  <EmptyState
                    compact
                    icon="thumbs-up-outline"
                    title="No passes!"
                  />
                )}
                {SkippedCards.map((card, index) => (
                  <CardNames
                    key={index}
                    style={{
                      color: c.textMuted,
                      textDecorationLine: 'line-through',
                    }}>
                    {card}
                  </CardNames>
                ))}
              </ScrollView>
            </View>
          </Animated.View>
          <Button>
            <StrippedButton
              label={
                QuickPlay
                  ? 'Main Menu'
                  : TotalRounds === round && team === TotalTeams
                  ? 'Game Result'
                  : 'Next Team'
              }
              onPress={QuickPlay ? ClickNext : onClick}
            />
          </Button>
        </SafeAreaViewWrapper>
      </Image>
    </Container>
  );
};

export default RoundResult;

const styles = StyleSheet.create({
  safe: {paddingHorizontal: space.lg, alignItems: 'center'},
  columns: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    gap: space.sm,
    marginTop: space.lg,
    marginBottom: space.lg,
  },
  column: {
    flex: 1,
    borderRadius: radius.lg,
    padding: space.md,
  },
});

const Container = styled.View({
  width: '100%',
  height: '100%',
  zIndex: 50,
});

const Image = styled.ImageBackground({
  flex: 1,
  width: '100%',
});

const Button = styled.View({
  width: '100%',
  marginBottom: space.sm,
});

const RoundChip = styled.View({
  marginTop: -space.xs,
  backgroundColor: palette.gold,
  paddingHorizontal: space.md,
  paddingVertical: space.xxs,
  borderRadius: radius.pill,
});
const RoundChipText = styled.Text({
  ...type.caption,
  color: palette.ink,
});

const ScoreText = styled.Text({
  color: palette.blue,
  fontSize: fontPixel(72),
  fontFamily: fonts.Gagalin,
  marginTop: space.md,
  lineHeight: fontPixel(84),
});

const ScoreLabel = styled.Text({
  ...type.caption,
  textTransform: 'uppercase',
  letterSpacing: 1.5,
  marginTop: -space.xs,
});

const ColumnHeader = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: space.xxs,
  marginBottom: space.sm,
});

const CategoryTitle = styled.Text({
  fontFamily: fonts.MonstserratExtraBold,
  fontSize: fontPixel(14),
  textTransform: 'uppercase',
  letterSpacing: 0.5,
});

const CardNames = styled.Text({
  fontSize: fontPixel(16),
  fontFamily: fonts.MonstserratBold,
  marginBottom: space.xs,
  textAlign: 'center',
});
