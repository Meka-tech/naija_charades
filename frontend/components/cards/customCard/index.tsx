import styled from '@emotion/native';
import React, {FC} from 'react';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';
import {theme} from 'utils/theme';
import NewIcon from 'assets/images/CardIcon/new_card.svg';

import {useRouter} from 'expo-router';

export const CustomCard: FC = ({}) => {
  const router = useRouter();
  return (
    <Container onPress={() => router.push('/custom/create')}>
      <Title>Add New Deck</Title>
      <NewIcon />
    </Container>
  );
};

export * from './custom_made_card';
const Container = styled.TouchableOpacity({
  width: '100%',
  marginBottom: heightPixel(20),
  borderRadius: widthPixel(30),
  paddingVertical: heightPixel(24),
  backgroundColor: theme.colors.gray100,
  position: 'relative',
  alignItems: 'center',
  elevation: 5,
});
const Title = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(24),
  fontFamily: theme.fonts.MonstserratBold,
  marginBottom: heightPixel(5),
});
