import styled from '@emotion/native';
import React, {FC} from 'react';
import {fontPixel, heightPixel, widthPixel} from '../../../utils/pxToDpConvert';
import Icon from 'react-native-vector-icons/FontAwesome';
import {theme} from '../../../utils/theme';
import customImage from '../../../../assets/images/CardIcon/custom_image.png';

interface IProps {
  title?: string;
}

export const CustomMadeCard: FC<IProps> = ({title}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Image source={customImage} />
      <Trash>
        <Icon name={'trash-o'} color="white" size={22} />
      </Trash>
    </Container>
  );
};

const Container = styled.TouchableOpacity({
  width: widthPixel(319),
  height: heightPixel(164),
  marginBottom: heightPixel(20),
  borderRadius: widthPixel(15),
  backgroundColor: 'rgba(254, 72, 10, 1)',
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
const Image = styled.Image({});
const Trash = styled.View({
  position: 'absolute',
  right: 15,
  top: 15,
});
