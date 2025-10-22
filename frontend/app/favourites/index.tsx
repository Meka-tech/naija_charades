import {CategoryCard, MenuPage} from 'components';
import React from 'react';
import styled from '@emotion/native';
import Void from 'assets/images/void.png';
import {fontPixel, heightPixel} from 'utils/pxToDpConvert';
import {theme} from 'utils/theme';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';
import {ActivityIndicator, FlatList} from 'react-native';
import {useCards} from 'contexts/cardContext';

export default function Favourites() {
  const {isLoading} = useCards();
  const {favouritesArray} = useSelector(
    (state: RootState) => state.reducer.favouriteCategories,
  );
  const CardArray = useSelector(
    (state: RootState) => state.reducer.cardArray.cardArray,
  );

  const favouriteCards = CardArray.filter(category =>
    favouritesArray.includes(category.title),
  );

  return (
    <MenuPage title="FAVOURITES" activePage={'Favourites'}>
      <>
        {favouritesArray?.length === 0 && !isLoading && (
          <NoContentView>
            <Image source={Void} />
            <NoContentText>
              You haven't added anything to your favourites
            </NoContentText>
          </NoContentView>
        )}
        <Body>
          {isLoading ? (
            <ActivityIndicator size="large" color={theme.colors.main} />
          ) : (
            <FlatList
              data={favouriteCards}
              renderItem={({item, index}) => (
                <CategoryCard
                  title={item.title}
                  color={item.color}
                  icon={item.icon}
                  index={index}
                  description={item.description}
                />
              )}
              keyExtractor={(item, index) => `${item.title}-${index}`}
              contentContainerStyle={{paddingBottom: 20}}
            />
          )}
        </Body>
      </>
    </MenuPage>
  );
}

const Body = styled.View({
  width: '100%',
  flex: 1,
});
const NoContentView = styled.View({
  width: '100%',
  height: '100%',
  alignItems: 'center',
});

const Image = styled.Image({
  marginTop: heightPixel(120),
  marginBottom: heightPixel(30),
});
const NoContentText = styled.Text({
  color: theme.colors.main,
  fontWeight: '600',
  fontSize: fontPixel(20),
  fontFamily: theme.fonts.MonstserratSemibold,
  textAlign: 'center',
  width: '100%',
  lineHeight: heightPixel(25),
});
