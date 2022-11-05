import React, {FC} from 'react';
import styled from '@emotion/native';
import {fontPixel, heightPixel, widthPixel} from '../../utils/pxToDpConvert';
import {theme} from '../../utils/theme';

interface IProps {
  toggle?: () => void;
  active: boolean;
}

export const Switch: FC<IProps> = ({active, toggle}) => {
  return (
    <Container onPress={toggle}>
      <Body active={active}>
        <Text active={active}> {active ? 'On' : 'Off'}</Text>
        <Handle active={active} />
      </Body>
    </Container>
  );
};

interface ISwitch {
  active: boolean;
}
const Container = styled.TouchableOpacity({
  position: 'relative',
});

const Body = styled.View<ISwitch>(({active}) => ({
  width: widthPixel(75),
  height: heightPixel(29),
  backgroundColor: active ? theme.colors.main : theme.colors.gray100,
  borderRadius: widthPixel(10),
  justifyContent: 'center',
  alignItems: active ? 'flex-end' : 'flex-start',
  position: 'relative',
}));

const Handle = styled.View<ISwitch>(({active}) => ({
  width: widthPixel(34),
  height: heightPixel(34),
  backgroundColor: active ? theme.colors.white : theme.colors.gray,
  borderRadius: widthPixel(10),
  elevation: 10,
}));

const Text = styled.Text<ISwitch>(({active}) => ({
  position: 'absolute',
  color: active ? theme.colors.white : theme.colors.main,
  fontWeight: '500',
  fontFamily: theme.fonts.MonstserratMedium,
  fontSize: fontPixel(14),
  left: active ? 4 : 40,
}));
