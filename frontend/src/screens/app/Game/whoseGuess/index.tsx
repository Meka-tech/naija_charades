import React, {FC, useState} from 'react';
import styled from '@emotion/native';
import {SecondaryMenuPage, StrippedButton} from '../../../../components';
import {
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../../../utils/pxToDpConvert';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {theme} from '../../../../utils/theme';
import {IsDarkMode} from '../../../../utils/isDarkMode';
import {IRootNavgation} from '../../../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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

export const WhoseGuess = () => {
  const {params} = useRoute<RouteProp<IRootNavgation>>();
  const {navigate} = useNavigation<NativeStackNavigationProp<IRootNavgation>>();

  const [youGuessActive, setYouGuessActive] = useState(true);
  const [othersGuessActive, setOthersGuessActive] = useState(false);
  const CategoryTitle = params?.title;
  const Custom = params?.custom;
  const Id = params?.id;

  const ClickYouGuess = () => {
    if (othersGuessActive) {
      setOthersGuessActive(false);
      setYouGuessActive(true);
    } else {
      setYouGuessActive(true);
    }
  };

  const ClickOtherGuess = () => {
    if (youGuessActive) {
      setYouGuessActive(false);
      setOthersGuessActive(true);
    } else {
      setOthersGuessActive(true);
    }
  };

  return (
    <SecondaryMenuPage>
      <Body>
        <Guesses>
          <GuessBlock
            active={youGuessActive}
            onPress={ClickYouGuess}
            title="You Guess"
            description="Place the screen on your forehead and try to guess, while your teammates describe or act out the words."
          />
          <GuessBlock
            active={othersGuessActive}
            onPress={ClickOtherGuess}
            title="Others Guess"
            description="Describe or act out the words on the screen, while your teammates guess the word"
          />
        </Guesses>
        <Button>
          <StrippedButton
            label="Next"
            onPress={() =>
              navigate('InGame', {
                title: CategoryTitle,
                youGuess: youGuessActive,
                custom: Custom,
                id: Id,
              })
            }
          />
        </Button>
      </Body>
    </SecondaryMenuPage>
  );
};

interface useDark {
  isDarkMode: boolean;
}

const Body = styled.View({
  width: '100%',
  height: '85%',
  alignItems: 'center',
  position: 'relative',
});

const Button = styled.View({
  width: widthPixel(254),
  position: 'absolute',
  bottom: 4,
});

const Guesses = styled.View({
  height: heightPixel(330),
  justifyContent: 'space-between',
  marginTop: heightPixel(150),
});

const GuessView = styled.TouchableOpacity<useDark>(({isDarkMode}) => ({
  elevation: 10,
  width: widthPixel(291),
  height: heightPixel(136),
  backgroundColor: isDarkMode
    ? theme.colors.darkbackground
    : theme.colors.white,
  borderRadius: widthPixel(15),
  flexDirection: 'row',
  justifyContent: 'center',
  paddingVertical: heightPixel(15),
}));

const GuessText = styled.View({
  width: '70%',
  alignItems: 'center',
  justifyContent: 'center',
});
const GuessTitle = styled.Text<useDark>(({isDarkMode}) => ({
  fontSize: fontPixel(18),
  fontFamily: theme.fonts.MonstserratBold,
  color: isDarkMode ? theme.colors.white : theme.colors.black,
  textAlign: 'center',
}));
const GuessDescription = styled.Text<useDark>(({isDarkMode}) => ({
  fontSize: fontPixel(12),
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
