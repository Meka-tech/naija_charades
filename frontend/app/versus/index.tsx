import React, {useEffect, useState} from 'react';
import styled from '@emotion/native';
import ArtImg from 'assets/images/background_art.png';
import Logo from 'assets/images/logo.svg';
import {Dropdown, StrippedButton} from 'components';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';
import {theme} from 'utils/theme';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateNoOfRounds,
  updateNoOfTeams,
} from 'redux/features/game_rules/gameRulesSlice';
import {updateQuickPlay} from 'redux/features/team_data/team_data';
import {useRouter} from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';

export default function Versus() {
  const router = useRouter();

  const dispatch = useDispatch();

  ////Teams
  const Teamlist = [
    {no: 2, isPremium: false},
    {no: 3, isPremium: true},
    {no: 4, isPremium: true},
    {no: 5, isPremium: true},
  ];
  const [noOfTeams, setNoOfTeams] = useState<{no: number; isPremium: boolean}>(
    Teamlist[0],
  );

  const SetTeams = (item: {no: number; isPremium: boolean}) => {
    setNoOfTeams(item);
    dispatch(updateNoOfTeams(item.no));
  };

  ////Rounds
  const Roundslist = [
    {no: 3, isPremium: false},
    {no: 5, isPremium: true},
    {no: 7, isPremium: true},
    {no: 9, isPremium: true},
  ];
  const [noOfRounds, setNoOfRounds] = useState<{
    no: number;
    isPremium: boolean;
  }>(Roundslist[0]);

  const SetRounds = (item: {no: number; isPremium: boolean}) => {
    setNoOfRounds(item);
    dispatch(updateNoOfRounds(item.no));
  };

  const OnClickNext = () => {
    dispatch(updateQuickPlay(false));
    router.push('/home');
  };

  return (
    <Main>
      <Image source={ArtImg} resizeMode="contain">
        <Body>
          <LogoContainer>
            <Logo width={'100%'} />
          </LogoContainer>
          <Card>
            <Cross onPress={() => router.back()}>
              <Entypo name="cross" size={30} color={theme.colors.black} />
            </Cross>
            <Title>Select number of teams</Title>
            <DropDownContainer style={{zIndex: 10}}>
              <Dropdown
                list={Teamlist}
                groupName={'Teams'}
                selected={noOfTeams.no}
                setSelected={SetTeams}
              />
            </DropDownContainer>
            <Title>Select number of rounds</Title>
            <DropDownContainer style={{zIndex: 5}}>
              <Dropdown
                list={Roundslist}
                groupName={'Rounds'}
                selected={noOfRounds.no}
                setSelected={SetRounds}
              />
            </DropDownContainer>
            <Button>
              <StrippedButton label="Next" onPress={OnClickNext} />
            </Button>
          </Card>
        </Body>
      </Image>
    </Main>
  );
}

const Main = styled.View({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(254, 182, 10, 0.95)',
  alignItems: 'center',
  justifyContent: 'center',
});

const LogoContainer = styled.View({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});
const Body = styled.View({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: widthPixel(20),
});
const Image = styled.ImageBackground({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});

const Card = styled.View({
  backgroundColor: theme.colors.white,
  width: '100%',
  paddingHorizontal: widthPixel(36),
  paddingTop: heightPixel(20),
  paddingBottom: heightPixel(45),
  borderRadius: widthPixel(15),
  alignItems: 'center',
  position: 'relative',
  marginTop: heightPixel(115),
});
const Title = styled.Text({
  marginBottom: heightPixel(10),
  fontWeight: '600',
  fontSize: fontPixel(16),
  color: theme.colors.black,
  fontFamily: theme.fonts.MonstserratSemibold,
});
const Button = styled.View({
  width: '100%',
  marginTop: heightPixel(17),
});

const DropDownContainer = styled.View({
  height: heightPixel(150),
  width: '100%',
});

const Cross = styled.TouchableOpacity({
  position: 'absolute',
  left: 15,
  top: 15,
});
