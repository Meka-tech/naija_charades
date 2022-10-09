import React, {FC} from 'react';
import styled from '@emotion/native';
import {
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../../../../utils/pxToDpConvert';
import {theme} from '../../../../../utils/theme';
import {OrientationLocker} from 'react-native-orientation-locker';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {IsDarkMode} from '../../../../../utils/isDarkMode';
import Art2 from '../../../../../../assets/images/background_art.svg';
import Art from '../../../../../../assets/images/background_art2.svg';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../app/store';
import {StrippedButton} from '../../../../../components';

interface IProps {
  round: number;
  team: number;
  title: string;
  onClick: () => void;
}

export const RoundResult: FC<IProps> = ({team, round, title, onClick}) => {
  const {goBack, navigate} = useNavigation();
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

  const isDarkMode = IsDarkMode();
  return (
    <Container darkMode={isDarkMode}>
      <OrientationLocker orientation={'PORTRAIT'} />
      <ArrowButton
        onPress={() => {
          goBack();
        }}>
        <Icon name="arrowleft" color={theme.colors.main} size={30} />
      </ArrowButton>
      <Body>
        <Title darkMode={isDarkMode}>{title}</Title>
        {!QuickPlay && (
          <RoundTeamText
            darkMode={
              isDarkMode
            }>{`Round ${round} : Team ${team}`}</RoundTeamText>
        )}

        <ScoreText>{`Score : ${score}`}</ScoreText>
        <CardResults>
          <CardCategory>
            <CategoryTitle cardCate="Correct">CORRECT</CategoryTitle>
            {CorrectCards.map((card, index) => {
              return (
                <CardNames key={index} darkMode={isDarkMode}>
                  {card}
                </CardNames>
              );
            })}
          </CardCategory>
          <CardCategory>
            <CategoryTitle>SKIPPED</CategoryTitle>
            {SkippedCards.map((card, index) => {
              return (
                <CardNames cardCate={'skipped'} key={index}>
                  {card}
                </CardNames>
              );
            })}
          </CardCategory>
        </CardResults>
        <Button>
          <StrippedButton
            label={
              QuickPlay
                ? 'Play Again'
                : TotalRounds === round && team === TotalTeams
                ? 'Game Result'
                : 'Next Team'
            }
            onPress={
              QuickPlay
                ? () => {
                    navigate('Home');
                  }
                : onClick
            }
          />
        </Button>
      </Body>
      <Image>
        {isDarkMode ? (
          <Art2 width={'100%'} height={'100%'} />
        ) : (
          <Art width={'100%'} height={'100%'} />
        )}
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
const Image = styled.View({
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: -1,
});
const Button = styled.View({
  width: widthPixel(254),
});

const Title = styled.Text<IuseDark>(({darkMode}) => ({
  color: darkMode ? theme.colors.white : theme.colors.black,
  fontSize: fontPixel(24),
  fontWeight: '400',
  fontFamily: theme.fonts.Gagalin,
  marginBottom: heightPixel(15),
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

const CardResults = styled.View({
  backgroundColor: 'rgba(0, 159, 255, 0.3)',
  width: '100%',
  height: heightPixel(480),
  borderRadius: widthPixel(25),
  marginBottom: heightPixel(70),
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  paddingHorizontal: widthPixel(15),
});

const CardCategory = styled.View({
  height: '90%',
  width: '45%',
  alignItems: 'center',
});

interface ICardTitle {
  cardCate?: string;
}

const CategoryTitle = styled.Text<ICardTitle>(({cardCate}) => ({
  color:
    cardCate === 'Correct' ? 'rgba(78, 203, 113, 1)' : 'rgba(254, 182, 10, 1)',
  fontSize: fontPixel(20),
  fontFamily: theme.fonts.MonstserratBold,
  marginBottom: heightPixel(10),
}));
interface ICards {
  cardCate?: string;
  darkMode?: boolean;
}
const CardNames = styled.Text<ICards>(({cardCate, darkMode}) => ({
  color:
    cardCate === 'skipped'
      ? 'rgba(175, 194, 205, 1)'
      : darkMode
      ? theme.colors.white
      : theme.colors.black,
  fontSize: fontPixel(20),
  fontFamily: theme.fonts.MonstserratBold,
  marginBottom: heightPixel(10),
  textDecorationLine: cardCate === 'skipped' ? 'line-through' : 'none',
}));
