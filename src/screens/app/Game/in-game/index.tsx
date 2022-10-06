import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import {useCountDown} from '../../../../hooks';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import {theme} from '../../../../utils/theme';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../app/store';
import {SecondsToMinutes} from '../../../../utils/function';
import {fontPixel} from '../../../../utils/pxToDpConvert';
import {OrientationLocker} from 'react-native-orientation-locker';
import {Round, StartGame} from './phases';
import {EndCard} from './phases/endCard';

export const InGame = () => {
  const UserRoundTime = useSelector(
    (state: RootState) => state.reducer.gameRules.timer,
  );
  const {params} = useRoute();
  const {title: CategoryTitle, youGuess} = params;

  const {goBack} = useNavigation();
  const [gameStarting, setGameStarting] = useState(false);
  const {currentNumber: BeginTimer, timerDone: BeginTimerDone} = useCountDown({
    number: 3,
    beginTimer: gameStarting,
  });

  const [roundStarting, setRoundStarting] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const [endCard, setEndCard] = useState(false);
  const [cardStatus, setCardStatus] = useState('');

  const {currentNumber: roundTimer, timerDone: roundTimerDone} = useCountDown({
    number: UserRoundTime,
    beginTimer: roundStarting,
  });

  ///Functions
  const OnClickStartGame = () => {
    setGameStarting(true);
  };

  const OnCorrectCard = () => {
    setCardStatus('Correct');
  };

  const OnSkipCard = () => {
    setCardStatus('Skip');
  };

  //start Round
  useEffect(() => {
    if (BeginTimerDone) {
      setRoundStarting(true);
    }
    if (youGuess === false) {
      setRoundStarting(true);
    }
  }, [BeginTimerDone, youGuess]);

  useEffect(() => {
    if (youGuess === false) {
      setRoundStarting(true);
    }
  }, []);

  // Skip or Correct Card
  useEffect(() => {
    if (cardStatus !== '') {
      setEndCard(true);
      setTimeout(() => setEndCard(false), 1000);
    }
  }, [cardStatus]);

  // end Round
  useEffect(() => {
    if (roundTimerDone) {
      setTimeUp(true);
    }
  }, [roundTimerDone]);

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
      {BeginTimerDone || youGuess === false ? (
        <Round
          skip={OnSkipCard}
          correct={OnCorrectCard}
          title={CategoryTitle}
          timer={roundTimer}
        />
      ) : null}
      {endCard && <EndCard status={cardStatus} />}
      {timeUp && (
        <TimesUp>
          <TimesupSmallText>Oops</TimesupSmallText>
          <TimesupBigText>Times Up!</TimesupBigText>
        </TimesUp>
      )}
    </Container>
  );
};

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
