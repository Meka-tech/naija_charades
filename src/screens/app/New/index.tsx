import {MenuPage} from '../../../components';
import React from 'react';
import styled from '@emotion/native';
import Astronaught from '../../../../assets/images/astronaught.png';
import {fontPixel, heightPixel} from '../../../utils/pxToDpConvert';
import {theme} from '../../../utils/theme';

export const New = () => {
  return (
    <MenuPage title="NEW" activePage={'New'}>
      <NoContentView>
        <Image source={Astronaught} />
        <NoContentText>Sorry, No new Items Here</NoContentText>
      </NoContentView>
    </MenuPage>
  );
};

const NoContentView = styled.View({
  width: '100%',
  height: '100%',
  alignItems: 'center',
});

const Image = styled.Image({
  marginTop: heightPixel(70),
  marginBottom: heightPixel(30),
});
const NoContentText = styled.Text({
  color: theme.colors.main,
  fontWeight: '600',
  fontSize: fontPixel(20),
  fontFamily: theme.fonts.MonstserratSemibold,
});
