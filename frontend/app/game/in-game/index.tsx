import styled from '@emotion/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useCountDown} from 'hooks';
import {theme} from 'utils/theme';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from 'redux/app/store';
import {CreateTeamData} from 'utils/function';
import {fontPixel, widthPixel} from 'utils/pxToDpConvert';
import * as ScreenOrientation from 'expo-screen-orientation';
import Round from './phases/round';
import RoundResult from './phases/roundResult';
import StartGame from './phases/startGame';
import EndCard from './phases/endCard';
import {
  clearCards,
  updateCorrectArray,
  updateSkipArray,
  updateTeamData,
  updateTeamScore,
} from 'redux/features/team_data/team_data';
import {useKeepAwake} from 'expo-keep-awake';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useAudioPlayer} from 'expo-audio';
import Entypo from '@expo/vector-icons/Entypo';

const startGameSource = require('assets/sounds/start_game.mp3');
const correctSource = require('assets/sounds/correct_answer.mp3');
const wrongSource = require('assets/sounds/wrong_answer.mp3');
const endGameSource = require('assets/sounds/end_game.mp3');
const timerSource = require('assets/sounds/ticking_timer.mp3');

export default function InGame() {
  const dispatch = useDispatch();
  const router = useRouter();

  const startGamePlayer = useAudioPlayer(startGameSource);
  const correctAnswerPlayer = useAudioPlayer(correctSource);
  const wrongAnswerPlayer = useAudioPlayer(wrongSource);
  const endGameSoundPlayer = useAudioPlayer(endGameSource);
  const tickingTimerPlayer = useAudioPlayer(timerSource);

  const {soundLevel: SoundLevel, sound: Sound} = useSelector(
    (state: RootState) => state.reducer.userPreference,
  );

  tickingTimerPlayer.volume = SoundLevel;
  startGamePlayer.volume = SoundLevel;
  correctAnswerPlayer.volume = SoundLevel;
  wrongAnswerPlayer.volume = SoundLevel;
  endGameSoundPlayer.volume = SoundLevel;

  const {
    title: CategoryTitle,
    youGuess: whoGuess,
    custom,
    id: CategoryId,
  } = useLocalSearchParams();

  const youGuess = whoGuess === 'true';

  const {
    timer: UserRoundTime,
    rounds: NoOfRounds,
    teams: NoOfTeams,
  } = useSelector((state: RootState) => state.reducer.gameRules);

  const TeamData = useSelector((state: RootState) => state.teamData.teamArray);

  const CustomCardArray = useSelector(
    (state: RootState) =>
      state.reducer.customCategories.customCategoryArray.find(
        customCategory => customCategory.title === CategoryTitle,
      )?.cards,
  );

  const SavedCardArray = useSelector(
    (state: RootState) =>
      state.reducer.cardArray.cardArray.find(
        category => category.title === CategoryTitle,
      )?.cards,
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
  const [gameCardArray, setGameCardArray] = useState<string[]>([]);
  const [presentCard, setPresentCard] = useState('');
  const [usedCardArray, setUsedCardArray] = useState<string[]>([]);
  const ArrayLength = gameCardArray?.length;

  ///Gyroscope///

  //set CardArray
  useEffect(() => {
    if (custom && CustomCardArray) {
      setGameCardArray(CustomCardArray);
    } else {
      setGameCardArray(SavedCardArray || []);
    }
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  ///Functions
  const NewCard = useCallback(() => {
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
      usedCardArray.length !== gameCardArray?.length
    ) {
      NewCard();
      return;
    } else {
      setUsedCardArray([]);
      //avoided recursion error
      setPresentCard(gameCardArray[0]);
      return;
    }
  }, [gameCardArray, usedCardArray, ArrayLength]);

  //When press "Starts game"
  const OnClickStartGame = () => {
    setGameStarting(true);
    NewCard();
  };

  //press right side of the screen
  const OnCorrectCard = () => {
    setCardStatus('Correct');
    NewCard();
    if (Sound) {
      correctAnswerPlayer.seekTo(0);
      correctAnswerPlayer.play();
    }
    dispatch(updateTeamScore({score: 1, team: activeTeam}));
    dispatch(updateCorrectArray({card: presentCard, team: activeTeam}));
  };

  //press left side of the screen
  const OnSkipCard = () => {
    setCardStatus('Skip');
    NewCard();
    if (Sound) {
      wrongAnswerPlayer.seekTo(0);
      wrongAnswerPlayer.play();
    }
    dispatch(updateSkipArray({card: presentCard, team: activeTeam}));
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
      router.push({
        pathname: '/game/versusResult',
        params: {title: CategoryTitle},
      });
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

  //if players did not pick "you guess" start round immediately
  useEffect(() => {
    if (youGuess === false) {
      setRoundStarting(true);
    }
    if (gameCardArray?.length !== 0) {
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
    if (roundTimerDone && Sound) {
      endGameSoundPlayer.volume = SoundLevel;
      endGameSoundPlayer.seekTo(0);
      endGameSoundPlayer.play();
      setTimeUp(true);
      setTimeout(() => {
        setTeamRoundEnded(true);
        setRoundStartingReset(true);
        setTimeUp(false);
        setRoundStarting(false);
      }, 2000);
    }
  }, [
    roundTimerDone,
    activeTeam,
    NoOfTeams,
    activeRound,
    NoOfRounds,
    SoundLevel,
    Sound,
    endGameSoundPlayer,
  ]);

  ///sounds

  useEffect(() => {
    if (gameStarting && Sound) {
      startGamePlayer.seekTo(0);
      startGamePlayer.play();
    }
  }, [Sound, gameStarting, startGamePlayer]);

  useEffect(() => {
    if (Sound) {
      if (roundTimer === 10) {
        tickingTimerPlayer.seekTo(0);
        tickingTimerPlayer.play();
      }
      if (roundTimer === 0) {
        tickingTimerPlayer.pause();
      }
    }
  }, [Sound, roundTimer, roundStarting, tickingTimerPlayer]);

  useKeepAwake();

  useEffect(() => {
    if (teamRoundEnded) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    } else {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
      );
    }
  }, []);
  return (
    <Container>
      <GoBack
        onPress={() => {
          router.back();
          tickingTimerPlayer.pause();
        }}>
        <Entypo name="chevron-left" size={widthPixel(36)} color={'white'} />
      </GoBack>
      {BeginTimer >= 0 && youGuess && (
        <StartGame
          startAction={OnClickStartGame}
          timer={BeginTimer}
          gameStarting={gameStarting}
        />
      )}
      {roundStarting && (
        <Round
          skip={OnSkipCard}
          correct={OnCorrectCard}
          title={CategoryTitle as string}
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
          title={CategoryTitle as string}
          team={activeTeam}
          round={activeRound}
          onClick={TeamEndsRound}
        />
      )}
    </Container>
  );
}

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
