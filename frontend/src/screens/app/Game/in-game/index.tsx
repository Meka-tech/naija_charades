import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import {useCountDown} from '../../../../hooks';
import Icon from 'react-native-vector-icons/AntDesign';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {theme} from '../../../../utils/theme';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../../app/store';
import {CreateTeamData} from '../../../../utils/function';
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
import {
  CorrectCardSound,
  EndGameSound,
  StartGameSound,
  TimerSound,
  WrongCardSound,
} from './sounds';
import {IRootNavgation} from '../../../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Barometer} from 'expo-sensors';

export const InGame = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation<NativeStackNavigationProp<IRootNavgation>>();
  const {goBack} = useNavigation();
  const {params} = useRoute<RouteProp<IRootNavgation>>();

  const {title: CategoryTitle, youGuess, custom, id: CategoryId} = params;

  const {
    timer: UserRoundTime,
    rounds: NoOfRounds,
    teams: NoOfTeams,
  } = useSelector((state: RootState) => state.reducer.gameRules);

  const {soundLevel: SoundLevel, sound: Sound} = useSelector(
    (state: RootState) => state.reducer.userPreference,
  );

  const TeamData = useSelector((state: RootState) => state.teamData.teamArray);

  const CustomCardArray = useSelector(
    (state: RootState) =>
      state.reducer.customCategories.customCategoryArray[CategoryId]?.cards,
  );

  const SavedCardArray = useSelector(
    (state: RootState) => state.reducer.cardArray.cardArray[CategoryId]?.cards,
  );

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
  const ArrayLength = gameCardArray?.length;

  ///Gyroscope///
  const [{pressure, relativeAltitude}, setData] = useState({
    pressure: 0,
    relativeAltitude: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const toggleListener = () => {
    subscription ? unsubscribe() : subscribe();
  };

  const subscribe = () => {
    setSubscription(Barometer.addListener(setData));
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };
  useEffect(() => {
    console.log(pressure);
  }, [pressure]);
  //set CardArray
  useEffect(() => {
    if (custom) {
      setGameCardArray(CustomCardArray);
    } else {
      setGameCardArray(SavedCardArray);
    }
  }, []);
  // console.log(custom);

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
    if (Sound) {
      CorrectCardSound.setVolume(SoundLevel);
      CorrectCardSound.play();
    }
  };

  //press left side of the screen
  const OnSkipCard = () => {
    setCardStatus('Skip');
    dispatch(updateSkipArray({card: presentCard, team: activeTeam}));
    NewCard();

    if (Sound) {
      WrongCardSound.setVolume(SoundLevel);
      WrongCardSound.play();
    }
  };

  // increase Round and team by 1 , team goes back to one if last team
  //functions to restart the game for new round
  const TeamEndsRound = () => {
    setGameStarting(false);
    // to start game immediately
    if (youGuess === false) {
      setRoundStarting(true);
    }
    ////
    setTeamRoundEnded(false);
    setBeginTimerReset(true);
    ////
    NewCard();

    //clearCards
    dispatch(clearCards(activeTeam - 1));
    //
    if (activeTeam === NoOfTeams) {
      setActiveTeam(1);
      setActiveRound(activeRound + 1);
    } else {
      setActiveTeam(activeTeam + 1);
    }
    if (activeRound === NoOfRounds && activeTeam === NoOfTeams) {
      navigate('VersusResult', {title: CategoryTitle});
    }
  };

  ////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  //start Round

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
      EndGameSound.play();
      setTimeUp(true);
      setTimeout(() => {
        setTeamRoundEnded(true);
        setRoundStartingReset(true);
        setTimeUp(false);
        setRoundStarting(false);
      }, 2000);
    }
  }, [roundTimerDone, activeTeam, NoOfTeams, activeRound, NoOfRounds]);

  ///sounds

  useEffect(() => {
    if (gameStarting) {
      if (Sound) {
        StartGameSound.setVolume(SoundLevel);
        StartGameSound.play(success => {
          if (success) {
            // console.log('successfully finished playing');
          } else {
            // console.log('playback failed due to audio decoding errors');
          }
        });
      }
    }
  }, [Sound, SoundLevel, gameStarting]);

  useEffect(() => {
    if (Sound) {
      TimerSound.setVolume(SoundLevel);
      if (roundTimer === 10) {
        TimerSound.play();
      }
      if (roundTimer === 0) {
        TimerSound.stop();
      }
    }
  }, [Sound, SoundLevel, roundTimer]);

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
