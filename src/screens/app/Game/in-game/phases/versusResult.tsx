import React from 'react';
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
import Art from '../../../../../../assets/images/background_art2.svg';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../app/store';
import {StrippedButton} from '../../../../../components';

export const VersusResult = () => {
  const {goBack, navigate} = useNavigation();
  const {params} = useRoute();
  const CategoryTitle = params.title;
  const NoOfRounds = useSelector(
    (state: RootState) => state.reducer.gameRules.rounds,
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
        <Title darkMode={isDarkMode}>{CategoryTitle}</Title>
        <RoundTeamText
          darkMode={
            isDarkMode
          }>{`Number of Rounds: ${NoOfRounds} `}</RoundTeamText>
        <ScoreText>Versus Result</ScoreText>
        <CardResults></CardResults>
        <Button>
          <StrippedButton
            label={'Play Again'}
            onPress={() => {
              navigate('Home');
            }}
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
