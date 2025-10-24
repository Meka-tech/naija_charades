import {CategoryCard, MenuPage} from 'components';
import React from 'react';
import styled from '@emotion/native';
import Astronaught from 'assets/images/astronaught.png';
import {fontPixel, heightPixel} from 'utils/pxToDpConvert';
import {theme} from 'utils/theme';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';

import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import {useCards} from 'contexts/cardContext';

export default function New() {
  const {isLoading, refreshCategories} = useCards();
  const CardArray = useSelector(
    (state: RootState) => state.reducer.cardArray.cardArray,
  );

  const newCards = CardArray.filter(category => category.isNew);

  console.log(newCards);

  const refreshControl = (
    <RefreshControl
      refreshing={isLoading}
      onRefresh={refreshCategories}
      colors={[theme.colors.main]}
    />
  );

  return (
    <MenuPage title="NEW" activePage={'New'}>
      <>
        {newCards.length === 0 && !isLoading && (
          <NoContentView>
            <Image source={Astronaught} />
            <NoContentText>Sorry, No new Items Here</NoContentText>
          </NoContentView>
        )}
        <Body>
          {isLoading ? (
            <ActivityIndicator size="large" color={theme.colors.main} />
          ) : (
            <FlatList
              refreshControl={refreshControl}
              data={newCards}
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

const NoContentView = styled.View({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

const Image = styled.Image({
  marginBottom: heightPixel(30),
});
const NoContentText = styled.Text({
  color: theme.colors.main,
  fontWeight: '600',
  fontSize: fontPixel(20),
  fontFamily: theme.fonts.MonstserratSemibold,
});
const Body = styled.View({
  width: '100%',
  flex: 1,
});
