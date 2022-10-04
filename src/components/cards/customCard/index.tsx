import styled from '@emotion/native';
import React, {FC} from 'react';
import {fontPixel, heightPixel, widthPixel} from '../../../utils/pxToDpConvert';
import Icon from 'react-native-vector-icons/AntDesign';
import {theme} from '../../../utils/theme';
import NewIcon from '../../../../assets/images/CardIcon/new_card.svg';

export const CustomCard: FC = ({}) => {
  return (
    <Container>
      <Title>Add New Deck</Title>
      <NewIcon />
    </Container>
  );
};

export * from './custom_made_card';
const Container = styled.TouchableOpacity({
  width: widthPixel(319),
  height: heightPixel(164),
  marginBottom: heightPixel(20),
  borderRadius: widthPixel(15),
  backgroundColor: theme.colors.gray100,
  position: 'relative',
  alignItems: 'center',
  paddingVertical: heightPixel(18),
});
const Title = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(24),
  fontFamily: theme.fonts.MonstserratBold,
  marginBottom: heightPixel(5),
});
