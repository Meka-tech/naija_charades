import styled from '@emotion/native';
import React, {FC, useState, useEffect} from 'react';
import {fontPixel, heightPixel, widthPixel} from '../../../utils/pxToDpConvert';
import Icon from 'react-native-vector-icons/AntDesign';
import {theme} from '../../../utils/theme';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import {
  deleteFavouriteArray,
  updateFavouriteArray,
} from '../../../features/favourite_category/favouriteCategory';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {IRootNavgation} from '../../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface IProps {
  title: string;
  icon?: string; //JSX.Element
  color: string;
  description: string;
}

export const CategoryCard: FC<IProps> = ({title, icon, color, description}) => {
  const {navigate} = useNavigation<NativeStackNavigationProp<IRootNavgation>>();
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
        navigate('GameDescription', {
          title: title,
          description: description,
        })
      }>
      <Title>{title}</Title>
      <Heart onPress={updateFavourite}>
        <Icon name={favorite ? 'heart' : 'hearto'} color="white" size={25} />
      </Heart>
    </Container>
  );
};

interface IContainer {
  color: string;
}
const Container = styled.TouchableOpacity<IContainer>(({color}) => ({
  width: widthPixel(319),
  height: heightPixel(164),
  marginBottom: heightPixel(20),
  borderRadius: widthPixel(15),
  backgroundColor: color,
  position: 'relative',
  alignItems: 'center',
  paddingVertical: heightPixel(18),
}));
const Title = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(24),
  fontFamily: theme.fonts.MonstserratBold,
  marginBottom: heightPixel(5),
});
const Heart = styled.TouchableOpacity({
  position: 'absolute',
  bottom: 15,
  right: 15,
});
