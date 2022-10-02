import React, {FC, useState} from 'react';
import styled from '@emotion/native';
import Art from '../../../assets/images/background_art2.png';
import {theme} from '../../utils/theme';
import {fontPixel, heightPixel, widthPixel} from '../../utils/pxToDpConvert';
import HamburgerIcon from '../../../assets/images/hamburger_icon.svg';
import {Navbar} from '../navbar';
interface IProps {
  title?: string;
  activePage?: string;
  children?: JSX.Element;
}

export const MenuPage: FC<IProps> = ({title, activePage, children}) => {
  const [navbarActive, setNavbarActive] = useState(false);

  const closeNav = () => {
    setNavbarActive(false);
  };
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
          <HamburgerIcon width={50} />
        </HamburgerButton>
        <Title>{title}</Title>
      </Head>
      <Body>{children}</Body>

      <Image source={Art} />
    </Container>
  );
};

const Container = styled.View({
  width: '100%',
  height: '100%',
  backgroundColor: theme.colors.white,
});

const Image = styled.Image({
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
const Title = styled.Text({
  fontWeight: '400',
  fontSize: fontPixel(30),
  fontFamily: theme.fonts.Gagalin,
  color: theme.colors.black,
});

const HamburgerButton = styled.TouchableOpacity({
  position: 'absolute',
  left: 25,
  width: widthPixel(50),
});
const Body = styled.View({
  width: '100%',
  alignItems: 'center',
});
