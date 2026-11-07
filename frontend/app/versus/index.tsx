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
import {IconButton} from 'components/ui';
import SafeAreaViewWrapper from 'components/safeAreaViewWrapper';
import {useAppTheme} from 'utils/useAppTheme';
import {palette, radius, shadow, space, type} from 'utils/theme';
import Animated, {FadeInUp} from 'react-native-reanimated';

export default function Versus() {
  const router = useRouter();

  const dispatch = useDispatch();
  const {c, isDark} = useAppTheme();

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
    {no: 2, isPremium: false},
    {no: 3, isPremium: true},
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
      <Image source={ArtImg} resizeMode="cover">
        <SafeAreaViewWrapper style={{paddingHorizontal: space.lg}}>
          <Body>
            <LogoContainer>
              <Logo width={'100%'} />
            </LogoContainer>
            <Animated.View
              entering={FadeInUp.springify().damping(18)}
              style={[
                cardStyle,
                {backgroundColor: c.surface},
                !isDark && shadow.md,
              ]}>
              <CardHeader>
                <IconButton
                  name="close"
                  accessibilityLabel="Close"
                  onPress={() => router.back()}
                />
                <CardTitle style={{color: c.text}}>Versus setup</CardTitle>
                <Spacer />
              </CardHeader>
              <Title style={{color: c.textMuted}}>Number of teams</Title>
              <DropDownContainer style={{zIndex: 10}}>
                <DropDownFloat>
                  <Dropdown
                    list={Teamlist}
                    groupName={'Teams'}
                    selected={noOfTeams.no}
                    setSelected={SetTeams}
                  />
                </DropDownFloat>
              </DropDownContainer>
              <Title style={{color: c.textMuted}}>Number of rounds</Title>
              <DropDownContainer style={{zIndex: 5}}>
                <DropDownFloat>
                  <Dropdown
                    list={Roundslist}
                    groupName={'Rounds'}
                    selected={noOfRounds.no}
                    setSelected={SetRounds}
                  />
                </DropDownFloat>
              </DropDownContainer>
              <Button>
                <StrippedButton label="Next" onPress={OnClickNext} />
              </Button>
            </Animated.View>
          </Body>
        </SafeAreaViewWrapper>
      </Image>
    </Main>
  );
}

const cardStyle = {
  width: '100%' as const,
  paddingHorizontal: space.xl,
  paddingTop: space.lg,
  paddingBottom: space.xl,
  borderRadius: radius.xl,
  marginTop: heightPixel(60),
};

const Main = styled.View({
  flex: 1,
  backgroundColor: palette.gold,
});

const LogoContainer = styled.View({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});
const Body = styled.View({
  flex: 1,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});
const Image = styled.ImageBackground({
  flex: 1,
  width: '100%',
});
const CardHeader = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: space.lg,
});
const CardTitle = styled.Text({
  ...type.heading,
});
const Spacer = styled.View({
  width: widthPixel(44),
});
const Title = styled.Text({
  ...type.caption,
  textTransform: 'uppercase',
  letterSpacing: 1,
  marginBottom: space.xs,
  marginLeft: space.xxs,
});
const Button = styled.View({
  width: '100%',
  marginTop: space.md,
});

// Fixed slot for the closed dropdown; the open list floats over what follows.
const DropDownContainer = styled.View({
  height: heightPixel(62),
  width: '100%',
  marginBottom: space.lg,
});
const DropDownFloat = styled.View({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
});
