import React, {FC} from 'react';
import styled from '@emotion/native';
import {heightPixel, widthPixel} from '../../../../../utils/pxToDpConvert';
import {theme} from '../../../../../utils/theme';

interface IProps {
  items: number;
  activeSlide: number;
}

export const ProgressBar: FC<IProps> = ({items, activeSlide}) => {
  const Length = Array.from({length: items}, (v, i) => i);
  return (
    <Container>
      {Length.map((_, index) => (
        <Ball active={activeSlide === index} key={index} />
      ))}
    </Container>
  );
};

const Container = styled.View({
  flexDirection: 'row',
});

interface IBall {
  active: boolean;
}

const Ball = styled.View<IBall>(({active}) => ({
  width: widthPixel(10),
  height: heightPixel(10),
  backgroundColor: active ? theme.colors.main : theme.colors.gray,
  borderRadius: widthPixel(50),
  marginRight: widthPixel(5),
}));
