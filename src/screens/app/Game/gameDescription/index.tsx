import React from 'react';
import styled from '@emotion/native';
import {SecondaryMenuPage, StrippedButton} from '../../../../components';
import {
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../../../utils/pxToDpConvert';
import {useNavigation, useRoute} from '@react-navigation/native';
import {theme} from '../../../../utils/theme';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../app/store';
import {IRootNavgation} from '../../../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const GameDescription = () => {
  const {params} = useRoute();
  const {navigate} = useNavigation<NativeStackNavigationProp<IRootNavgation>>();

  const CategoryTitle = params.title;
  const CategoryDescription = params.description;
  const QuickPlay = useSelector((state: RootState) => state.teamData.quickPlay);

  return (
    <SecondaryMenuPage title={QuickPlay ? '' : 'Round 1: Team 1'}>
      <Body>
        <DescriptionBox>
          <Title>{CategoryTitle}</Title>
          <DescriptionText>{CategoryDescription}</DescriptionText>
        </DescriptionBox>
        <Button>
          <StrippedButton
            label="Play"
            onPress={() =>
              navigate('WhoseGuess', {
                title: CategoryTitle,
                custom: false,
                id: null,
              })
            }
          />
        </Button>
      </Body>
    </SecondaryMenuPage>
  );
};

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

const DescriptionBox = styled.View({
  backgroundColor: 'rgba(91, 193, 255, 1)',
  width: widthPixel(325),
  height: heightPixel(216),
  borderRadius: widthPixel(15),
  elevation: 10,
  marginTop: heightPixel(30),
  paddingVertical: heightPixel(16),
  alignItems: 'center',
});

const Title = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(24),
  fontWeight: '400',
  fontFamily: theme.fonts.Gagalin,
  marginBottom: heightPixel(30),
});

const DescriptionText = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(18),
  fontWeight: '500',
  fontFamily: theme.fonts.MonstserratMedium,
  textAlign: 'center',
  width: '80%',
});
