import React, {FC} from 'react';
import styled from '@emotion/native';
import {theme} from '../../../../../utils/theme';
import {fontPixel, heightPixel} from '../../../../../utils/pxToDpConvert';
import CorrectIcon from '../../../../../../assets/images/correct_icon.svg';
import SkipIcon from '../../../../../../assets/images/skip_icon.svg';

interface Iprops {
  status: string;
}

export const EndCard: FC<Iprops> = ({status}) => {
  return (
    <Container>
      <Status status={status}>{status}</Status>
      {status === 'Correct' ? <CorrectIcon /> : <SkipIcon />}
    </Container>
  );
};

const Container = styled.View({
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: theme.colors.white,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 20,
});

interface IStatus {
  status: string;
}
const Status = styled.Text<IStatus>(({status}) => ({
  color: status === 'Correct' ? 'rgba(19, 202, 70, 1)' : theme.colors.main,
  fontFamily: theme.fonts.MonstserratBold,
  fontSize: fontPixel(60),
  fontWeight: '500',
  marginBottom: heightPixel(15),
}));
