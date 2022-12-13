import styled from '@emotion/native';
import React from 'react';
import ImgOne from '../../../../../../assets/images/HowToPlayImg/imgOne.png';
import ImgTwo from '../../../../../../assets/images/HowToPlayImg/img2.png';
import ImgThree from '../../../../../../assets/images/HowToPlayImg/img3.png';
import ImgFour from '../../../../../../assets/images/HowToPlayImg/img4.png';
import ImgFive from '../../../../../../assets/images/HowToPlayImg/img5.png';
import ImgSix from '../../../../../../assets/images/HowToPlayImg/img6.png';
import ImgSeven from '../../../../../../assets/images/HowToPlayImg/img7.png';
import ImgEight from '../../../../../../assets/images/HowToPlayImg/img8.png';
import ImgNine from '../../../../../../assets/images/HowToPlayImg/img9.png';
import ImgNineOne from '../../../../../../assets/images/HowToPlayImg/img9_1.png';
import ImgTen from '../../../../../../assets/images/HowToPlayImg/img10.png';
import ImgTenOne from '../../../../../../assets/images/HowToPlayImg/img10_1.png';
import {IsDarkMode} from '../../../../../utils/isDarkMode';
import {
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../../../../utils/pxToDpConvert';
import {theme} from '../../../../../utils/theme';
import {Dimensions, View} from 'react-native';
const ScreenWidth = Dimensions.get('screen').width;

const ScreenHeight = Dimensions.get('screen').height;

export const ItemOne = () => {
  const isDarkMode = IsDarkMode();
  return (
    <Container>
      <Text isDarkMode={isDarkMode} width={'80%'}>
        Select Quick Play or Versus, depending on the mode you want to play
      </Text>
      <Image source={ImgOne} />
    </Container>
  );
};

export const ItemTwo = () => {
  const isDarkMode = IsDarkMode();

  return (
    <Container>
      <Image source={ImgTwo} />
      <Text isDarkMode={isDarkMode} width={'95%'}>
        To play the versus mode, select the number of teams that are to play e.g
        if you’re 6 people playing, you can divide yourselves into 3 teams by
        playing 2 people per team.
      </Text>
    </Container>
  );
};
export const ItemThree = () => {
  const isDarkMode = IsDarkMode();

  return (
    <Container>
      <Image source={ImgThree} />
      <Text isDarkMode={isDarkMode} width={'90%'}>
        3 rounds means if you are 3 teams playing, each team would play the
        selected category 3 times. This means selecting the number of times you
        want to play a particular category.
      </Text>
    </Container>
  );
};

export const ItemFour = () => {
  const isDarkMode = IsDarkMode();

  return (
    <Container>
      <Text isDarkMode={isDarkMode} width={'70%'}>
        Select Any Category
      </Text>
      <Image source={ImgFour} />
    </Container>
  );
};

export const ItemFive = () => {
  const isDarkMode = IsDarkMode();

  return (
    <Container>
      <Text isDarkMode={isDarkMode} width={'80%'}>
        Read the Instruction for that category
      </Text>
      <Image source={ImgFive} />
    </Container>
  );
};

export const ItemSix = () => {
  const isDarkMode = IsDarkMode();

  return (
    <Container>
      <Text isDarkMode={isDarkMode} width={'80%'}>
        Select your preferred method to play
      </Text>
      <Image source={ImgSix} />
    </Container>
  );
};
export const ItemSeven = () => {
  const isDarkMode = IsDarkMode();

  return (
    <Container>
      <Text
        isDarkMode={isDarkMode}
        width={'70%'}
        style={{marginBottom: heightPixel(50), marginTop: heightPixel(100)}}>
        Place your phone on forehead
      </Text>
      <Image source={ImgSeven} />
    </Container>
  );
};

export const ItemEight = () => {
  const isDarkMode = IsDarkMode();

  return (
    <Container>
      <Text
        isDarkMode={isDarkMode}
        width={'80%'}
        style={{marginBottom: heightPixel(50), marginTop: heightPixel(100)}}>
        You can play the game by, tapping the screens for the others guess mode
      </Text>
      <Image source={ImgEight} />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text
          isDarkMode={isDarkMode}
          width={'40%'}
          style={{
            fontFamily: theme.fonts.MonstserratMedium,
            alignSelf: 'flex-start',
            fontSize: fontPixel(14),
            marginTop: heightPixel(-15),
            marginLeft: widthPixel(5),
          }}>
          Tap on this part of the screen to skip and move to the next question
        </Text>
        <Text
          isDarkMode={isDarkMode}
          width={'40%'}
          style={{
            fontFamily: theme.fonts.MonstserratMedium,
            alignSelf: 'flex-end',
            fontSize: fontPixel(14),
            marginTop: heightPixel(-15),
          }}>
          Tap on this part of the screen if you guessed correctly and move to
          the next question
        </Text>
      </View>
    </Container>
  );
};

export const ItemNine = () => {
  const isDarkMode = IsDarkMode();

  return (
    <Container>
      <Text isDarkMode={isDarkMode} width={'70%'}>
        Or you can play the game by, tilting left or right on the you guess mode
      </Text>
      <Image source={ImgNine} />
      <Text
        isDarkMode={isDarkMode}
        width={'60%'}
        style={{alignSelf: 'flex-end', textAlign: 'left'}}>
        Tilt left to skip and move to the next question
      </Text>
      <Image source={ImgNineOne} />
    </Container>
  );
};

export const ItemTen = () => {
  const isDarkMode = IsDarkMode();

  return (
    <Container>
      <Text isDarkMode={isDarkMode} width={'90%'}>
        When your allocated time runs out, it’ll be indicated
      </Text>
      <Image source={ImgTen} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Image source={ImgTenOne} />
        <Text isDarkMode={isDarkMode} width={'40%'}>
          After time runs out, the scoreboard would show your score and cards
          you got right and wrong.
        </Text>
      </View>
    </Container>
  );
};

const Container = styled.View({
  width: ScreenWidth,
  height: '100%',
  paddingVertical: heightPixel(20),
  paddingHorizontal: widthPixel(20),
  alignItems: 'center',
});

const Image = styled.Image(({width, height}) => ({
  marginVertical: heightPixel(20),
  transform: [{scaleY: ScreenHeight / 900}, {scaleX: ScreenWidth / 400}],
}));

const Text = styled.Text(({width, isDarkMode}) => ({
  color: isDarkMode ? theme.colors.white : theme.colors.black,
  fontFamily: theme.fonts.MonstserratSemibold,
  fontSize: fontPixel(18),
  width: width,
  textAlign: 'center',
}));
