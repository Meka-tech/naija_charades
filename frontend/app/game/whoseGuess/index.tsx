import React, {FC, useEffect, useState} from 'react';
import styled from '@emotion/native';
import {SecondaryMenuPage, StrippedButton} from 'components';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';

import {theme} from 'utils/theme';
import {IsDarkMode} from 'utils/isDarkMode';

import {useLocalSearchParams, useRouter} from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';

interface IGuessBlock {
  active?: boolean;
  title?: string;
  description?: string;
  onPress?: () => void;
}
const GuessBlock: FC<IGuessBlock> = ({active, title, description, onPress}) => {
  const isDarkMode = IsDarkMode();
  return (
    <GuessView isDarkMode={isDarkMode} onPress={onPress}>
      <GoldRing onPress={onPress}>{active ? <ActiveRing /> : null}</GoldRing>
      <GuessText>
        <GuessTitle isDarkMode={isDarkMode}>{title}</GuessTitle>
        <GuessDescription isDarkMode={isDarkMode}>
          {description}
        </GuessDescription>
      </GuessText>
    </GuessView>
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
    <SecondaryMenuPage>
      <Body>
        <Guesses>
          <GuessBlock
            active={selectedGuess === 'you'}
            onPress={ClickYouGuess}
            title="You Guess"
            description="Place the screen on your forehead and try to guess, while your teammates describe or act out the words."
          />
          <GuessBlock
            active={selectedGuess === 'others'}
            onPress={ClickOtherGuess}
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

interface useDark {
  isDarkMode: boolean;
}

const Body = styled.View({
  width: '100%',
  flex: 1,
  alignItems: 'center',
  position: 'relative',
});

const Button = styled.View({
  width: '100%',
  marginBottom: heightPixel(20),
  marginTop: 'auto',
});

const Guesses = styled.View({
  gap: heightPixel(40),
  marginTop: heightPixel(150),
  width: '100%',
});

const GuessView = styled.TouchableOpacity<useDark>(({isDarkMode}) => ({
  elevation: 10,
  shadowColor: 'rgba(0, 0, 0, 0.25)',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  width: '100%',
  backgroundColor: isDarkMode
    ? theme.colors.darkbackground
    : theme.colors.white,
  borderRadius: widthPixel(15),
  flexDirection: 'row',
  justifyContent: 'center',
  paddingVertical: heightPixel(24),
}));

const GuessText = styled.View({
  width: '80%',
  justifyContent: 'center',
});
const GuessTitle = styled.Text<useDark>(({isDarkMode}) => ({
  fontSize: fontPixel(18),
  fontFamily: theme.fonts.MonstserratBold,
  color: isDarkMode ? theme.colors.white : theme.colors.black,
  textAlign: 'left',
  marginBottom: heightPixel(10),
}));
const GuessDescription = styled.Text<useDark>(({isDarkMode}) => ({
  fontSize: fontPixel(14),
  fontFamily: theme.fonts.MonstserratMedium,
  color: isDarkMode ? theme.colors.white : theme.colors.black,
  textAlign: 'left',
}));

const GoldRing = styled.TouchableOpacity({
  width: widthPixel(25),
  height: heightPixel(25),
  borderRadius: widthPixel(50),
  borderColor: theme.colors.main,
  borderWidth: widthPixel(2),
  alignSelf: 'center',
  marginRight: widthPixel(20),
  alignItems: 'center',
  justifyContent: 'center',
});

const ActiveRing = styled.View({
  width: widthPixel(15),
  height: heightPixel(15),
  borderRadius: widthPixel(50),
  backgroundColor: theme.colors.main,
});
