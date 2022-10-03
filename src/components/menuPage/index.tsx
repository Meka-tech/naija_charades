import React, {FC, useState} from 'react';
import styled from '@emotion/native';

import Art from '../../../assets/images/background_art2.svg';
import {theme} from '../../utils/theme';
import {fontPixel, heightPixel, widthPixel} from '../../utils/pxToDpConvert';
import HamburgerIcon from '../../../assets/images/hamburger_icon.svg';
import {Navbar} from '../navbar';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import Art2 from '../../../assets/images/background_art.svg';
import HamburgerIconDark from '../../../assets/images/DarkMode/hamburger_light.svg';

interface IProps {
  title?: string;
  activePage?: string;
  children?: JSX.Element;
}

export const MenuPage: FC<IProps> = ({title, activePage, children}) => {
  const [navbarActive, setNavbarActive] = useState(false);
  const {darkMode: isDarkMode} = useSelector(
    (state: RootState) => state.reducer.userPreference,
  );

  const closeNav = () => {
    setNavbarActive(false);
  };

  const Container = styled.View({
    width: '100%',
    height: '100%',
    backgroundColor: isDarkMode
      ? theme.colors.darkbackground
      : theme.colors.white,
  });

  const Title = styled.Text({
    fontWeight: '400',
    fontSize: fontPixel(30),
    fontFamily: theme.fonts.Gagalin,
    color: isDarkMode ? theme.colors.white : theme.colors.black,
  });

  return (
    <Container>
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
        <Title>{title}</Title>
      </Head>
      <Body>{children}</Body>

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

const HamburgerButton = styled.TouchableOpacity({
  position: 'absolute',
  left: 25,
  width: widthPixel(50),
});
const Body = styled.View({
  width: '100%',
  alignItems: 'center',
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
