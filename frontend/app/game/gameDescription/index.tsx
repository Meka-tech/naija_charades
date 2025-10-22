import React from 'react';
import styled from '@emotion/native';
import {SecondaryMenuPage, StrippedButton} from 'components';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';
import {theme} from 'utils/theme';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';
import {useLocalSearchParams, useRouter} from 'expo-router';

export default function GameDescription() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const CategoryTitle = params.title;
  const CategoryDescription = params.description;
  const CategoryIndex = params.index;
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
              router.push({
                pathname: '/game/whoseGuess',
                params: {
                  title: CategoryTitle,
                  custom: 'false',
                  id: CategoryIndex?.toString(),
                },
              })
            }
          />
        </Button>
      </Body>
    </SecondaryMenuPage>
  );
}

const Body = styled.View({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  position: 'relative',
});

const Button = styled.View({
  width: '100%',
  marginTop: 'auto',
  marginBottom: heightPixel(20),
});

const DescriptionBox = styled.View({
  backgroundColor: 'rgba(91, 193, 255, 1)',
  width: '100%',
  height: 'auto',
  borderRadius: widthPixel(15),
  elevation: 10,
  marginTop: heightPixel(30),
  paddingVertical: heightPixel(40),
  alignItems: 'center',
});

const Title = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(24),
  fontWeight: '400',
  fontFamily: theme.fonts.Gagalin,
  marginBottom: heightPixel(15),
});

const DescriptionText = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(18),
  fontWeight: '500',
  fontFamily: theme.fonts.MonstserratMedium,
  textAlign: 'center',
  width: '90%',
});
