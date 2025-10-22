import styled from '@emotion/native';
import React, {FC, useState, useEffect} from 'react';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';

import {theme} from 'utils/theme';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';
import {
  deleteFavouriteArray,
  updateFavouriteArray,
} from 'redux/features/favourite_category/favouriteCategory';
import {useIsFocused} from '@react-navigation/native';

import {Dimensions} from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {useRouter} from 'expo-router';

const ScreenHeight = Dimensions.get('window').height;

interface IProps {
  title: string;
  icon?: string; //JSX.Element
  color: string;
  description: string;
  index: number;
}

export const CategoryCard: FC<IProps> = ({
  title,
  icon,
  color,
  description,
  index,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {favouritesArray} = useSelector(
    (state: RootState) => state.reducer.favouriteCategories,
  );
  const isFocused = useIsFocused();
  const [favorite, setFavourite] = useState(favouritesArray.includes(title));

  const updateFavourite = () => {
    if (favorite === false) {
      setFavourite(true);
      dispatch(updateFavouriteArray(title));
    } else {
      setFavourite(false);
      const NewArray = favouritesArray.filter(item => item !== title);
      dispatch(deleteFavouriteArray(NewArray));
    }
  };
  useEffect(
    () => setFavourite(favouritesArray.includes(title)),
    [favouritesArray, title, isFocused],
  );

  return (
    <Container
      color={color}
      onPress={() =>
        router.push({
          pathname: '/game/gameDescription',
          params: {
            title: title,
            description: description,
            index: index,
          },
        })
      }>
      <Title>{title}</Title>
      <Image
        source={{
          uri: icon,
        }}
      />
      <Heart onPress={updateFavourite}>
        <MaterialCommunityIcons
          name={favorite ? 'cards-heart' : 'cards-heart-outline'}
          size={30}
          color="white"
        />
      </Heart>
    </Container>
  );
};

interface IContainer {
  color: string;
}
const Container = styled.TouchableOpacity<IContainer>(({color}) => ({
  width: '100%',
  height: 'auto',
  marginBottom: heightPixel(20),
  borderRadius: widthPixel(30),
  paddingVertical: heightPixel(24),
  backgroundColor: color,
  position: 'relative',
  alignItems: 'center',
  elevation: 5,
  shadowColor: 'rgba(0, 0, 0, 0.25)',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
}));
const Title = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(24),
  fontFamily: theme.fonts.MonstserratBold,
  marginBottom: heightPixel(10),
});
const Heart = styled.TouchableOpacity({
  position: 'absolute',
  bottom: widthPixel(15),
  right: widthPixel(20),
});
const Image = styled.Image({
  height: heightPixel(100),
  width: widthPixel(100),
  transform: [{scaleY: ScreenHeight / 900}],
});
