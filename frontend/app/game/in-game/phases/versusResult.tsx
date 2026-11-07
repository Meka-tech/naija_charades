import React, {useEffect} from 'react';
import styled from '@emotion/native';
import {fontPixel, widthPixel} from 'utils/pxToDpConvert';
import {fonts, palette, radius, shadow, space, type} from 'utils/theme';
import {useAppTheme} from 'utils/useAppTheme';
import {IconButton, ScreenHeader} from 'components/ui';
import SafeAreaViewWrapper from 'components/safeAreaViewWrapper';
import Animated, {FadeInDown, ZoomIn} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import {StyleSheet, View} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

import Art2Img from 'assets/images/background_art.png';

import ArtImg from 'assets/images/background_art2.png';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';
import {StrippedButton} from 'components';

import {useLocalSearchParams, useRouter} from 'expo-router';

export default function VersusResult() {
  const router = useRouter();
  const {title: CategoryTitle} = useLocalSearchParams();
  const NoOfRounds = useSelector(
    (state: RootState) => state.reducer.gameRules.rounds,
  );

  const TeamArray = useSelector((state: RootState) => state.teamData.teamArray);
  const {isDark: isDarkMode, c} = useAppTheme();

  const TeamScores = TeamArray.map(team => {
    return [team.team, team.score];
  });

  const SortedArray = TeamScores.sort((a, b) => {
    const scoreA = Number(b[1]);
    const scoreB = Number(a[1]);
    return scoreA - scoreB;
  });

  const ClickNext = () => {
    router.push('/home');
  };

  const rankColors = [palette.sky, palette.gold, palette.coral, palette.slate];
  const ordinal = (i: number) => ['1st', '2nd', '3rd'][i] ?? `${i + 1}th`;

  return (
    <Container style={{backgroundColor: c.background}}>
      <Image
        source={isDarkMode ? Art2Img : ArtImg}
        resizeMode="cover"
        imageStyle={{opacity: isDarkMode ? 0.35 : 1}}>
        <SafeAreaViewWrapper darkmode={isDarkMode} style={styles.safe}>
          <ScreenHeader
            title={CategoryTitle as string}
            left={
              <IconButton
                name="chevron-back"
                accessibilityLabel="Back to categories"
                onPress={() => router.push('/home')}
              />
            }
          />
          <RoundTeamText style={{color: c.textMuted}}>
            {`${NoOfRounds} rounds played`}
          </RoundTeamText>

          <Animated.View
            entering={ZoomIn.springify().damping(12)}
            style={styles.winner}>
            <Ionicons
              name="trophy"
              size={widthPixel(44)}
              color={palette.white}
            />
            <WinnerText>{`${SortedArray[0][0]} wins!`}</WinnerText>
          </Animated.View>

          <View
            style={[
              styles.board,
              {backgroundColor: c.surface},
              !isDarkMode && shadow.md,
            ]}>
            <ResultHeader>
              <HeaderText style={{color: c.textMuted, width: widthPixel(70)}}>
                Pos
              </HeaderText>
              <HeaderText style={{color: c.textMuted, flex: 1}}>
                Team
              </HeaderText>
              <HeaderText style={{color: c.textMuted}}>Score</HeaderText>
            </ResultHeader>
            {SortedArray.map((item, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(200 + index * 90)
                  .springify()
                  .damping(18)}
                style={[
                  styles.row,
                  {backgroundColor: index === 0 ? c.surfaceAlt : 'transparent'},
                ]}>
                <View style={{width: widthPixel(70)}}>
                  <View
                    style={[
                      styles.badge,
                      {backgroundColor: rankColors[Math.min(index, 3)]},
                    ]}>
                    <BadgeText>{ordinal(index)}</BadgeText>
                  </View>
                </View>
                <ResultItemText style={{color: c.text}}>
                  {item[0]}
                </ResultItemText>
                <ResultScoreText style={{color: c.text}}>
                  {item[1]}
                </ResultScoreText>
              </Animated.View>
            ))}
          </View>
          <Button>
            <StrippedButton label={'Play Again'} onPress={ClickNext} />
          </Button>
        </SafeAreaViewWrapper>
      </Image>
    </Container>
  );
}

const styles = StyleSheet.create({
  safe: {paddingHorizontal: space.lg, alignItems: 'center'},
  winner: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: palette.blue,
    borderRadius: radius.xl,
    paddingVertical: space.xl,
    marginTop: space.lg,
    ...shadow.md,
  },
  board: {
    width: '100%',
    borderRadius: radius.lg,
    paddingVertical: space.md,
    paddingHorizontal: space.sm,
    marginTop: space.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.sm,
    paddingVertical: space.sm,
    borderRadius: radius.md,
    marginBottom: space.xxs,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: space.sm,
    paddingVertical: space.xxs,
    borderRadius: radius.pill,
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
  marginTop: 'auto',
  marginBottom: space.sm,
});

const RoundTeamText = styled.Text({
  ...type.subheading,
  marginTop: -space.xs,
});

const WinnerText = styled.Text({
  fontFamily: fonts.Gagalin,
  fontSize: fontPixel(36),
  color: palette.white,
  textTransform: 'capitalize',
  marginTop: space.xs,
});

const ResultHeader = styled.View({
  flexDirection: 'row',
  paddingHorizontal: space.sm,
  marginBottom: space.xs,
});

const HeaderText = styled.Text({
  ...type.caption,
  textTransform: 'uppercase',
  letterSpacing: 1,
});

const BadgeText = styled.Text({
  fontFamily: fonts.MonstserratExtraBold,
  fontSize: fontPixel(13),
  color: palette.white,
});

const ResultItemText = styled.Text({
  flex: 1,
  fontSize: fontPixel(18),
  fontFamily: fonts.MonstserratBold,
  textTransform: 'capitalize',
});
const ResultScoreText = styled.Text({
  fontSize: fontPixel(20),
  fontFamily: fonts.MonstserratExtraBold,
  minWidth: widthPixel(50),
  textAlign: 'right',
});
