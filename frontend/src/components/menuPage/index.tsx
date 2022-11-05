import React, {FC, useState} from 'react';
import styled from '@emotion/native';
import Art from '../../../assets/images/background_art2.svg';
import {theme} from '../../utils/theme';
import {fontPixel, heightPixel, widthPixel} from '../../utils/pxToDpConvert';
import HamburgerIcon from '../../../assets/images/hamburger_icon.svg';
import {Navbar} from '../navbar';
import Art2 from '../../../assets/images/background_art.svg';
import HamburgerIconDark from '../../../assets/images/DarkMode/hamburger_light.svg';
import {Dimensions} from 'react-native';
import {IsDarkMode} from '../../utils/isDarkMode';
import {OrientationLocker} from 'react-native-orientation-locker';

interface IProps {
  title?: string;
  activePage?: string;
  children?: JSX.Element;
}

export const MenuPage: FC<IProps> = ({title, activePage, children}) => {
  const [navbarActive, setNavbarActive] = useState(false);

  const isDarkMode = IsDarkMode();
  const closeNav = () => {
    setNavbarActive(false);
  };

  return (
    <Container isDarkMode={isDarkMode}>
      <Navbar
        activePage={activePage}
        active={navbarActive}
        closeNav={() => closeNav()}
      />
      <Head>
        <HamburgerButton
          onPress={() => {
            setNavbarActive(true);
          }}>
          {isDarkMode ? <HamburgerIconDark /> : <HamburgerIcon width={50} />}
        </HamburgerButton>
        <Title isDarkMode={isDarkMode}>{title}</Title>
      </Head>
      <Body>
        <OrientationLocker orientation={'PORTRAIT'} />
        {children}
      </Body>

      <Image>
        {isDarkMode ? (
          <Art2 width={'100%'} height={'100%'} />
        ) : (
          <Art width={'100%'} height={'100%'} />
        )}
      </Image>
    </Container>
  );
};

const WindowHeight = Dimensions.get('window').height;

interface IContainer {
  isDarkMode: boolean;
}
const Container = styled.View<IContainer>(({isDarkMode}) => ({
  width: '100%',
  height: '100%',
  backgroundColor: isDarkMode
    ? theme.colors.darkbackground
    : theme.colors.white,
}));
interface ITitle {
  isDarkMode: boolean;
}
const Title = styled.Text<ITitle>(({isDarkMode}) => ({
  fontWeight: '400',
  fontSize: fontPixel(30),
  fontFamily: theme.fonts.Gagalin,
  color: isDarkMode ? theme.colors.white : theme.colors.black,
}));

const HamburgerButton = styled.TouchableOpacity({
  position: 'absolute',
  left: 25,
  width: widthPixel(50),
});
const Body = styled.View({
  width: '100%',
  alignItems: 'center',
  height: WindowHeight - heightPixel(78),
});
const Image = styled.View({
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: -1,
});

const Head = styled.View({
  width: '100%',
  height: heightPixel(60),
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: heightPixel(18),
});
