import React, {useEffect} from 'react';
import styled from '@emotion/native';
import {
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../../../../utils/pxToDpConvert';
import {theme} from '../../../../../utils/theme';
import {OrientationLocker} from 'react-native-orientation-locker';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {IsDarkMode} from '../../../../../utils/isDarkMode';
import Art2 from '../../../../../../assets/images/background_art.svg';
import Art2Img from '../../../../../../assets/images/background_art.png';
import Art from '../../../../../../assets/images/background_art2.svg';
import ArtImg from '../../../../../../assets/images/background_art2.png';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../app/store';
import {StrippedButton} from '../../../../../components';
import {IRootNavgation} from '../../../../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useInterstitialAd, TestIds} from 'react-native-google-mobile-ads';

export const VersusResult = () => {
  const {navigate} = useNavigation<NativeStackNavigationProp<IRootNavgation>>();
  const {params} = useRoute();
  const CategoryTitle = params.title;
  const NoOfRounds = useSelector(
    (state: RootState) => state.reducer.gameRules.rounds,
  );

  const TeamArray = useSelector((state: RootState) => state.teamData.teamArray);
  const isDarkMode = IsDarkMode();

  const TeamScores = TeamArray.map(team => {
    return [team.team, team.score];
  });

  const SortedArray = TeamScores.sort((a, b) => b[1] - a[1]);

  //ads
  const adUnitId = __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-4708275943185751/5078352735';

  const {isLoaded, isClosed, load, show} = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    load();
  }, [load]);

  const ClickNext = () => {
    if (isLoaded) {
      show();
      navigate('Home');
    } else {
      navigate('Home');
    }
  };
  useEffect(() => {
    if (isClosed) {
      load();
    }
  }, [isClosed, load]);

  return (
    <Container darkMode={isDarkMode}>
      <Image source={isDarkMode ? Art2Img : ArtImg} resizeMode="cover">
        <OrientationLocker orientation={'PORTRAIT'} />
        <ArrowButton
          onPress={() => {
            navigate('Home');
          }}>
          <Icon name="arrowleft" color={theme.colors.main} size={30} />
        </ArrowButton>
        <Body>
          <Title darkMode={isDarkMode}>{CategoryTitle}</Title>
          <RoundTeamText
            darkMode={
              isDarkMode
            }>{`Number of Rounds: ${NoOfRounds} `}</RoundTeamText>
          <ScoreText>Versus Result</ScoreText>
          <TeamResults>
            <ResultHeader>
              <HeaderText>POS</HeaderText>
              <HeaderText>TEAMS</HeaderText>
              <HeaderText>SCORES</HeaderText>
            </ResultHeader>
            {SortedArray.map((item, index) => {
              return (
                <ResultItem key={index} pos={index}>
                  <PositionText>
                    {index === 0
                      ? '1st'
                      : index === 1
                      ? '2nd'
                      : index === 2
                      ? '3rd'
                      : '4th'}
                  </PositionText>
                  <ResultItemText>{item[0]}</ResultItemText>
                  <ResultScoreText>{item[1]}</ResultScoreText>
                </ResultItem>
              );
            })}
            <AnnounceResultText>{`${SortedArray[0][0]} wins`}</AnnounceResultText>
          </TeamResults>
          <Button>
            <StrippedButton label={'Play Again'} onPress={ClickNext} />
          </Button>
        </Body>
      </Image>
    </Container>
  );
};

interface IuseDark {
  darkMode: boolean;
}

const Container = styled.View<IuseDark>(({darkMode}) => ({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  position: 'relative',
  zIndex: 50,
  backgroundColor: darkMode ? theme.colors.darkbackground : theme.colors.white,
}));

const Body = styled.View({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  paddingHorizontal: widthPixel(25),
});
const ArrowButton = styled.TouchableOpacity({
  position: 'absolute',
  left: 25,
  top: 30,
  width: widthPixel(50),
});
const Image = styled.ImageBackground({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});
const Button = styled.View({
  width: widthPixel(254),
});

const Title = styled.Text<IuseDark>(({darkMode}) => ({
  color: darkMode ? theme.colors.white : theme.colors.black,
  fontSize: fontPixel(24),
  fontWeight: '400',
  fontFamily: theme.fonts.Gagalin,
  marginBottom: heightPixel(20),
  marginTop: heightPixel(50),
}));

const RoundTeamText = styled.Text<IuseDark>(({darkMode}) => ({
  color: darkMode ? theme.colors.white : theme.colors.black,
  fontSize: fontPixel(20),
  fontWeight: '400',
  fontFamily: theme.fonts.MonstserratSemibold,
  marginBottom: heightPixel(25),
}));

const ScoreText = styled.Text({
  color: 'rgba(63, 131, 254, 1)',
  fontSize: fontPixel(32),
  fontWeight: '400',
  fontFamily: theme.fonts.MonstserratBold,
  marginBottom: heightPixel(15),
});

const TeamResults = styled.View({
  backgroundColor: 'rgba(0, 159, 255, 0.3)',
  width: '100%',
  height: heightPixel(480),
  borderRadius: widthPixel(25),
  marginBottom: heightPixel(70),
  alignItems: 'center',
  flexDirection: 'column',
});

const ResultHeader = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: widthPixel(35),
  marginTop: heightPixel(15),
  marginBottom: heightPixel(25),
  width: '100%',
});

const HeaderText = styled.Text({
  fontSize: fontPixel(25),
  fontFamily: theme.fonts.Gagalin,
  color: theme.colors.white,
});

interface Iresult {
  pos: number;
}
const ResultItem = styled.View<Iresult>(({pos}) => ({
  width: '100%',
  flexDirection: 'row',
  paddingHorizontal: widthPixel(35),
  marginBottom: heightPixel(15),
  backgroundColor:
    pos === 0
      ? 'rgba(91, 193, 255, 1)'
      : pos === 1
      ? 'rgba(254, 182, 10, 1)'
      : pos === 2
      ? 'rgba(252, 94, 94, 1)'
      : 'rgba(159, 163, 166, 1)',
  height: heightPixel(56),
  alignItems: 'center',
}));

const ResultItemText = styled.Text({
  fontSize: fontPixel(25),
  fontFamily: theme.fonts.MonstserratBold,
  color: theme.colors.white,
  textTransform: 'uppercase',
  width: widthPixel(150),
});
const PositionText = styled.Text({
  fontSize: fontPixel(25),
  fontFamily: theme.fonts.MonstserratBold,
  color: theme.colors.white,
  width: widthPixel(100),
});
const ResultScoreText = styled.Text({
  fontSize: fontPixel(25),
  fontFamily: theme.fonts.MonstserratSemibold,
  color: theme.colors.white,
});

const AnnounceResultText = styled.Text({
  fontSize: fontPixel(32),
  fontFamily: theme.fonts.Gagalin,
  color: theme.colors.white,
  alignSelf: 'center',
  height: '100%',
  marginTop: heightPixel(60),
});
