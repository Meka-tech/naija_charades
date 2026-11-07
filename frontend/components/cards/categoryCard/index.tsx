import React, {FC, useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';
import {
  deleteFavouriteArray,
  updateFavouriteArray,
} from 'redux/features/favourite_category/favouriteCategory';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {useRouter} from 'expo-router';
import {PressableScale} from 'components/ui/PressableScale';
import {fonts, palette, radius, shadow, space} from 'utils/theme';
import {fontPixel, widthPixel} from 'utils/pxToDpConvert';
import {haptics} from 'utils/haptics';

interface IProps {
  title: string;
  icon?: string;
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
      haptics.success();
      setFavourite(true);
      dispatch(updateFavouriteArray(title));
    } else {
      haptics.tap();
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
    <Animated.View
      entering={FadeInDown.delay(Math.min(index, 8) * 60)
        .springify()
        .damping(18)}>
      <PressableScale
        activeScale={0.97}
        accessibilityRole="button"
        accessibilityLabel={`Play ${title}`}
        style={[styles.card, {backgroundColor: color}]}
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
        {/* soft highlight for depth */}
        <View style={styles.glow} pointerEvents="none" />
        <View style={styles.iconWrap}>
          <Image source={{uri: icon}} style={styles.icon} resizeMode="contain" />
        </View>
        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {!!description && (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          )}
        </View>
        <PressableScale
          onPress={updateFavourite}
          haptic={false}
          activeScale={0.8}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={
            favorite ? 'Remove from favourites' : 'Add to favourites'
          }
          style={styles.heart}>
          <MaterialCommunityIcons
            name={favorite ? 'cards-heart' : 'cards-heart-outline'}
            size={widthPixel(22)}
            color="white"
          />
        </PressableScale>
      </PressableScale>
    </Animated.View>
  );
};

// Keeps white text legible on pale category colours.
const textShadow = {
  textShadowColor: 'rgba(0,0,0,0.25)',
  textShadowOffset: {width: 0, height: 1},
  textShadowRadius: 3,
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: space.md,
    marginBottom: space.md,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadow.sm,
  },
  glow: {
    position: 'absolute',
    top: -widthPixel(60),
    right: -widthPixel(40),
    width: widthPixel(180),
    height: widthPixel(180),
    borderRadius: widthPixel(90),
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  iconWrap: {
    width: widthPixel(76),
    height: widthPixel(76),
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: space.md,
  },
  icon: {width: widthPixel(58), height: widthPixel(58)},
  text: {flex: 1, paddingRight: space.xs},
  title: {
    color: palette.white,
    fontFamily: fonts.MonstserratExtraBold,
    fontSize: fontPixel(20),
    marginBottom: space.xxs,
    ...textShadow,
  },
  description: {
    color: 'rgba(255,255,255,0.88)',
    fontFamily: fonts.MonstserratMedium,
    fontSize: fontPixel(13),
    lineHeight: fontPixel(18),
    ...textShadow,
  },
  heart: {
    width: widthPixel(38),
    height: widthPixel(38),
    borderRadius: widthPixel(19),
    backgroundColor: 'rgba(0,0,0,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});
