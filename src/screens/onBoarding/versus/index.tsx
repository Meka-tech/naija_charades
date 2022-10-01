import React, {useState} from 'react';
import styled from '@emotion/native';
import Art from '../../../../assets/images/background_art.png';
import Logo from '../../../../assets/images/logo.svg';
import {Dropdown, StrippedButton} from '../../../components';
import {fontPixel, heightPixel, widthPixel} from '../../../utils/pxToDpConvert';
import {theme} from '../../../utils/theme';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

export const Versus = ({}) => {
  const Teamlist = [2, 3, 4];
  const [noOfTeams, setNoOfTeams] = useState<number>(2);
  const SetTeams = (number: React.SetStateAction<number>) => {
    setNoOfTeams(number);
  };

  const Roundslist = [3, 5, 7];
  const [noOfRounds, setNoOfRounds] = useState<number>(3);
  const SetRounds = (number: React.SetStateAction<number>) => {
    setNoOfRounds(number);
  };
  const navigation = useNavigation();
  return (
    <Main>
      <Body>
        <Logo />
        <Card>
          <Cross onPress={() => navigation.goBack()}>
            <Icon name={'cross'} size={30} color={theme.colors.black} />
          </Cross>
          <Title>Select number of teams</Title>
          <DropDownContainer>
            <Dropdown
              list={Teamlist}
              groupName={'Teams'}
              selected={noOfTeams}
              setSelected={SetTeams}
            />
          </DropDownContainer>
          <Title>Select number of rounds</Title>
          <DropDownContainer>
            <Dropdown
              list={Roundslist}
              groupName={'Rounds'}
              selected={noOfRounds}
              setSelected={SetRounds}
            />
          </DropDownContainer>
          <Button>
            <StrippedButton label="Next" />
          </Button>
        </Card>
      </Body>
      <Image source={Art} />
    </Main>
  );
};

const Main = styled.View({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(254, 182, 10, 0.95)',
  alignItems: 'center',
  justifyContent: 'center',
});
const Body = styled.View({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});
const Image = styled.Image({
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: -1,
});

const Card = styled.View({
  backgroundColor: theme.colors.white,
  width: '80%',
  paddingHorizontal: widthPixel(45),
  paddingTop: heightPixel(49),
  paddingBottom: heightPixel(45),
  borderRadius: widthPixel(15),
  alignItems: 'center',
  position: 'relative',
  marginTop: heightPixel(115),
});
const Title = styled.Text({
  marginBottom: heightPixel(17),
  fontWeight: '600',
  fontSize: fontPixel(16),
  color: theme.colors.black,
  fontFamily: theme.fonts.MonstserratSemibold,
});
const Button = styled.View({
  width: widthPixel(141),
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
