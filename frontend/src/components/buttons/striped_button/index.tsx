import React, {FC} from 'react';
import styled from '@emotion/native';
import {theme} from '../../../utils/theme';
import {fontPixel, heightPixel, widthPixel} from '../../../utils/pxToDpConvert';

interface IProps {
  width?: string;
  fontSize?: number;
  label: string;
  elevation?: number;
  onPress?: () => void;
}

export const StrippedButton: FC<IProps> = ({
  width,
  fontSize,
  label,
  elevation,
  onPress,
  ...rest
}) => {
  return (
    <Container width={width} elevation={elevation} onPress={onPress} {...rest}>
      <Stripe />
      <Text fontSize={fontSize}>{label}</Text>
      <Stripe />
    </Container>
  );
};

interface IContainer {
  width?: string;
  elevation?: number;
}
const Container = styled.TouchableOpacity<IContainer>(({width, elevation}) => ({
  backgroundColor: theme.colors.main,
  paddingVertical: heightPixel(8),
  width: width ? width : '100%',
  alignItems: 'center',
  borderRadius: widthPixel(10),
  elevation: elevation ? elevation : 0,
}));
interface IText {
  fontSize?: number;
}
const Text = styled.Text<IText>(({fontSize}) => ({
  color: 'white',
  fontSize: fontSize ? fontPixel(fontSize) : fontPixel(24),
  marginVertical: heightPixel(2),
  textTransform: 'uppercase',
  fontFamily: theme.fonts.Gagalin,
}));
const Stripe = styled.View({
  width: '100%',
  borderBottomColor: 'rgba(26, 25, 25, 1)',
  borderBottomWidth: heightPixel(3),
});
