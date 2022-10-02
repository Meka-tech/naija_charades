import styled from '@emotion/native';
import React, {FC, useEffect} from 'react';
import {heightPixel, widthPixel} from '../../../utils/pxToDpConvert';
import {GenerateGradient} from '../../../utils/randomGradientGenerator,';

interface IProps {
  title?: string;
  icon?: JSX.Element;
  favourite?: boolean;
}

const Gradient = GenerateGradient();

console.log(Gradient);

export const CategoryCard: FC<IProps> = ({title, icon, favourite}) => {
  return <Container></Container>;
};

const Container = styled.View({
  width: widthPixel(319),
  height: heightPixel(164),
  marginBottom: heightPixel(10),
  borderRadius: widthPixel(15),
  backgroundColor: 'lightblue',
});
