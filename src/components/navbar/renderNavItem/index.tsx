import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fontPixel, heightPixel, widthPixel} from '../../../utils/pxToDpConvert';
import {theme} from '../../../utils/theme';

interface IProps {
  active: boolean;
  text?: string;
  Icon?: JSX.Element;
  nav?: string;
}

export const RenderNavItem: FC<IProps> = ({active, text, Icon, nav}) => {
  const {navigate} = useNavigation();
  return (
    <Container active={active} onPress={() => navigate(nav)}>
      <IconView>{Icon}</IconView>
      <TextView>
        <TextAbove active={active}>{text}</TextAbove>
        <TextBelow active={active}>{text}</TextBelow>
      </TextView>
    </Container>
  );
};

interface IContainer {
  active: boolean;
}

const Container = styled.TouchableOpacity<IContainer>(({active}) => ({
  backgroundColor: active ? theme.colors.main : 'white',
  color: active ? theme.colors.white : theme.colors.black,
  paddingLeft: widthPixel(80),
  width: '100%',
  height: heightPixel(40),
  marginBottom: heightPixel(20),
  alignItems: 'center',
  flexDirection: 'row',
}));
interface IText {
  active: boolean;
}
const TextAbove = styled.Text<IText>(({active}) => ({
  fontWeight: '500',
  fontSize: fontPixel(24),
  fontFamily: theme.fonts.Gagalin,
  color: active ? theme.colors.white : theme.colors.black,
  position: 'absolute',
  zIndex: 1,
}));
const TextBelow = styled.Text<IText>(({active}) => ({
  fontWeight: '500',
  fontSize: fontPixel(24),
  fontFamily: theme.fonts.Gagalin,
  color: active ? theme.colors.black : theme.colors.main,
  position: 'absolute',
  bottom: 0,
}));

const IconView = styled.View({});

const TextView = styled.View({
  marginLeft: widthPixel(21),
  position: 'relative',
  justifyContent: 'center',
  height: heightPixel(30),
});
