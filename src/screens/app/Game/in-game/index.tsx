import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import {useCountDown} from '../../../../hooks';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import {theme} from '../../../../utils/theme';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../../app/store';
import {CreateTeamData, SecondsToMinutes} from '../../../../utils/function';
import {fontPixel} from '../../../../utils/pxToDpConvert';
import {OrientationLocker} from 'react-native-orientation-locker';
import {Round, RoundResult, StartGame} from './phases';
import {EndCard} from './phases/endCard';
import {
  clearCards,
  updateCorrectArray,
  updateSkipArray,
  updateTeamData,
  updateTeamScore,
} from '../../../../features/team_data/team_data';

export const InGame = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const UserRoundTime = useSelector(
    (state: RootState) => state.reducer.gameRules.timer,
  );
  const NoOfTeams = useSelector(
    (state: RootState) => state.reducer.gameRules.teams,
  );

  const NoOfRounds = useSelector(
    (state: RootState) => state.reducer.gameRules.rounds,
  );

  const TeamData = useSelector((state: RootState) => state.teamData.teamArray);

  const {params} = useRoute();
  const {title: CategoryTitle, youGuess, custom, id: CustomId} = params;

  const CustomCardArray = useSelector(
    (state: RootState) =>
      state.reducer.customCategories.customCategoryArray[CustomId]?.cards,
  );

  const {goBack} = useNavigation();
  const [gameStarting, setGameStarting] = useState(false);

  const [beginTimerReset, setBeginTimerReset] = useState(false);
  const {currentNumber: BeginTimer, timerDone: BeginTimerDone} = useCountDown({
    number: 3,
    beginTimer: gameStarting,
    reset: beginTimerReset,
    setReset: setBeginTimerReset,
  });

  const [roundStarting, setRoundStarting] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const [endCard, setEndCard] = useState(false);
  const [cardStatus, setCardStatus] = useState('');

  const [roundStartingReset, setRoundStartingReset] = useState(false);
  const {currentNumber: roundTimer, timerDone: roundTimerDone} = useCountDown({
    number: UserRoundTime,
    beginTimer: roundStarting,
    reset: roundStartingReset,
    setReset: setRoundStartingReset,
  });

  const [activeTeam, setActiveTeam] = useState(1);
  const [activeRound, setActiveRound] = useState(1);
  const [teamRoundEnded, setTeamRoundEnded] = useState(false);
  const [gameCardArray, setGameCardArray] = useState([]);
  const [presentCard, setPresentCard] = useState('');
  const [usedCardArray, setUsedCardArray] = useState([]);
  const ArrayLength = gameCardArray.length;
  /////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  ///Functions
  const NewCard = () => {
    const Card = gameCardArray[Math.floor(Math.random() * ArrayLength)];
    if (Card !== undefined) {
      setUsedCardArray([...usedCardArray, Card]);
    }
    //so as to not repeatCards
    if (usedCardArray.includes(Card) === false) {
      setPresentCard(Card);
      return;
    } else if (
      usedCardArray.includes(Card) &&
      usedCardArray.length !== gameCardArray.length
    ) {
      NewCard();
      return;
    } else {
      setUsedCardArray([]);
      //avoided recursion error
      setPresentCard(gameCardArray[0]);
      return;
    }
  };

  //When press "Touch screen"
  const OnClickStartGame = () => {
    setGameStarting(true);
    NewCard();
  };

  //press right side of the screen
  const OnCorrectCard = () => {
    setCardStatus('Correct');
    dispatch(updateTeamScore({score: 1, team: activeTeam}));
    dispatch(updateCorrectArray({card: presentCard, team: activeTeam}));
    NewCard();
  };

  //press left side of the screen
  const OnSkipCard = () => {
    setCardStatus('Skip');
    dispatch(updateSkipArray({card: presentCard, team: activeTeam}));
    NewCard();
  };

  // increase Round and team by 1 , team goes back to one if last team
  //functions to restart the game for new round
  const TeamEndsRound = () => {
    setGameStarting(false);
    if (youGuess === false) {
      setRoundStarting(true);
    }
    setTeamRoundEnded(false);
    setBeginTimerReset(true);
    NewCard();
    dispatch(clearCards(activeTeam - 1));
    if (activeTeam === NoOfTeams) {
      setActiveTeam(1);
    } else {
      setActiveTeam(activeTeam + 1);
    }
    if (activeTeam === NoOfTeams) {
      setActiveRound(activeRound + 1);
    }
    if (activeRound === NoOfRounds && activeTeam === NoOfTeams) {
      navigate('VersusResult', {title: CategoryTitle});
    }
  };

  ////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  //start Round

  //set CardArray
  useEffect(() => {
    if (custom) {
      setGameCardArray(CustomCardArray);
    }
  }, []);

  //Create Number of team data array
  useEffect(() => {
    const teamData = CreateTeamData(NoOfTeams);
    dispatch(updateTeamData(teamData));
    if (youGuess === false) {
      setRoundStarting(true);
    }
  }, []);

  //placeholder countdown done ,  start round
  useEffect(() => {
    if (BeginTimerDone) {
      setRoundStarting(true);
    }
    if (youGuess === false) {
      setRoundStarting(true);
    }
  }, [BeginTimerDone, youGuess]);

  //if players pick "you guess" start round immediately
  useEffect(() => {
    if (youGuess === false) {
      setRoundStarting(true);
    }
    if (gameCardArray.length !== 0) {
      NewCard();
      return;
    }
  }, [gameCardArray, youGuess, ArrayLength]);

  //when you Skip or Correct Card
  useEffect(() => {
    if (cardStatus !== '') {
      setEndCard(true);
      setTimeout(() => {
        setEndCard(false);
        setCardStatus('');
      }, 1000);
    }
  }, [cardStatus]);

  // end Round
  useEffect(() => {
    if (roundTimerDone) {
      setTimeUp(true);
      setTimeout(() => {
        setTeamRoundEnded(true);
        setRoundStartingReset(true);
        setTimeUp(false);
        setRoundStarting(false);
      }, 2000);
    }
  }, [roundTimerDone, activeTeam, NoOfTeams, activeRound, NoOfRounds]);

  return (
    <Container>
      <OrientationLocker orientation={'LANDSCAPE'} />
      <GoBack onPress={() => goBack()}>
        <Icon name="arrowleft" color={theme.colors.main} size={35} />
        <Text>back</Text>
      </GoBack>
      {BeginTimer >= 0 && youGuess && (
        <StartGame startAction={OnClickStartGame} timer={BeginTimer} />
      )}
      {roundStarting && (
        <Round
          skip={OnSkipCard}
          correct={OnCorrectCard}
          title={CategoryTitle}
          timer={roundTimer}
          score={`${TeamData[activeTeam - 1].score}`}
          card={presentCard}
        />
      )}
      {endCard && <EndCard status={cardStatus} />}
      {timeUp && (
        <TimesUp>
          <TimesupSmallText>Oops</TimesupSmallText>
          <TimesupBigText>Times Up!</TimesupBigText>
        </TimesUp>
      )}
      {teamRoundEnded && (
        <RoundResult
          title={CategoryTitle}
          team={activeTeam}
          round={activeRound}
          onClick={TeamEndsRound}
        />
      )}
    </Container>
  );
};

export * from './phases/versusResult';

const Container = styled.View({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  position: 'relative',
});

const Text = styled.Text({
  fontFamily: theme.fonts.MonstserratMedium,
  color: theme.colors.main,
  fontSize: fontPixel(16),
});

const GoBack = styled.TouchableOpacity({
  zIndex: 10,
  alignItems: 'center',
  position: 'absolute',
  left: 25,
  top: 20,
});

const TimesUp = styled.View({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(254, 69, 10, 1)',
  position: 'absolute',
  zIndex: 15,
  alignItems: 'center',
  justifyContent: 'center',
});

const TimesupSmallText = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(24),
  fontFamily: theme.fonts.MonstserratBold,
});
const TimesupBigText = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(60),
  fontFamily: theme.fonts.MonstserratBold,
});
