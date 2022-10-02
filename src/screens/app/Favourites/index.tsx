import {MenuPage} from '../../../components';
import React from 'react';
import styled from '@emotion/native';
import Void from '../../../../assets/images/void.png';
import {fontPixel, heightPixel} from '../../../utils/pxToDpConvert';
import {theme} from '../../../utils/theme';

export const Favourites = () => {
  return (
    <MenuPage title="FAVOURITES" activePage={'Favourites'}>
      <NoContentView>
        <Image source={Void} />
        <NoContentText>
          You haven’t added anything to your favourites
        </NoContentText>
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
  marginTop: heightPixel(120),
  marginBottom: heightPixel(30),
});
const NoContentText = styled.Text({
  color: theme.colors.main,
  fontWeight: '600',
  fontSize: fontPixel(20),
  fontFamily: theme.fonts.MonstserratSemibold,
  textAlign: 'center',
  width: '65%',
  lineHeight: heightPixel(25),
});
