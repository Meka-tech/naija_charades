import React, {useEffect, useState} from 'react';
import Logo from '../../../../assets/images/logo.svg';
import styled from '@emotion/native';
import Art from '../../../../assets/images/background_main.svg';
import {StrippedButton} from '../../../components';
import {heightPixel, widthPixel} from '../../../utils/pxToDpConvert';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {OrientationLocker} from 'react-native-orientation-locker';
import {updateQuickPlay} from '../../../features/team_data/team_data';
import {BackHandler} from 'react-native';
import {ConfirmExitModal} from '../../../components/modal';
import database from '@react-native-firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../app/store';
import {updateCards} from '../../../features/card_array/card_array';
import {CreateStringArray} from '../../../utils/function';
import NetInfo from '@react-native-community/netinfo';
import {CardData} from '../../app/cardData';
import {applyMiddleware} from 'redux';

export const MainMenu = () => {
  const dispatch = useDispatch();
  const [networkConnected, setNetworkConnected] = useState(false);
  const SavedCardArray = useSelector(
    (state: RootState) => state.reducer.cardArray,
  );

  useEffect(() => {
    const checkConnection = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setNetworkConnected(state.isConnected);
      }
    });
    checkConnection();
    const getCategories = async () => {
      database()
        .ref('/categories')
        .once('value')
        .then(snapshot => {
          if (snapshot.val() !== SavedCardArray) {
            dispatch(updateCards(snapshot.val()));
          }
          // console.log('card data: ', snapshot.val());
        });
    };
    if (networkConnected) {
      getCategories();
    }
  }, []);

  // const setCategories = () => {
  //   database()
  //     .ref('categories')
  //     .set(CardData)
  //     .then(() => console.log('Data set.'))
  //     .catch(err => console.log(err));
  // };

  // setCategories();

  // console.log(CreateStringArray(String));

  const WindowHeight = Dimensions.get('window').height;
  const WindowWidth = Dimensions.get('window').width;
  const offset = useSharedValue(0);
  const offsetButton = useSharedValue(0);
  const {goBack} = useNavigation();

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withSpring(offset.value * 255)}],
    };
  });
  const ButtonSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(offsetButton.value * 255)}],
    };
  });

  useEffect(() => {
    setTimeout(() => {
      offset.value = -WindowHeight / 800;
      offsetButton.value = WindowWidth / 290; //1.4
    }, 2000);
  }, []);
  const {navigate} = useNavigation();

  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setModalActive(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Main>
      <OrientationLocker orientation={'PORTRAIT'} />
      <Body>
        <ConfirmExitModal
          active={modalActive}
          closeModal={() => setModalActive(false)}
          onPress={() => BackHandler.exitApp()}
        />
        <Animated.View style={[defaultSpringStyles]}>
          <Logo />
        </Animated.View>
        <Buttons>
          <Animated.View
            style={[
              {height: '100%', justifyContent: 'space-between'},
              ButtonSpringStyles,
            ]}>
            <StrippedButton
              label="Quick Play"
              elevation={5}
              onPress={() => {
                navigate('Home');
                dispatch(updateQuickPlay(true));
              }}
            />
            <StrippedButton
              label="Versus"
              elevation={5}
              onPress={() => navigate('Versus')}
            />
            <StrippedButton
              label="How to play"
              elevation={5}
              onPress={() => navigate('HowToPlay')}
            />
          </Animated.View>
        </Buttons>
      </Body>
      <Image>
        <Art width={WindowWidth} height={WindowHeight} />
      </Image>
    </Main>
  );
};

const Main = styled.View({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(254, 182, 10, 0.95)',
  alignItems: 'center',
  justifyContent: 'center',
});
const Body = styled.View({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});
const Image = styled.ImageBackground({
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: -1,
});

const Buttons = styled.View({
  width: '70%',
  justifyContent: 'space-between',
  height: heightPixel(250),
  position: 'absolute',
  left: widthPixel(-300),
  bottom: heightPixel(150),
});
