import {CategoryCard, MenuPage} from 'components';
import React from 'react';
import styled from '@emotion/native';
import {theme, space} from 'utils/theme';
import {EmptyState} from 'components/ui';
import {useRouter} from 'expo-router';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';
import {ActivityIndicator, FlatList} from 'react-native';
import {useCards} from 'contexts/cardContext';

export default function Favourites() {
  const {isLoading} = useCards();
  const router = useRouter();
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
              contentContainerStyle={{paddingBottom: 20, flexGrow: 1}}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <NoContentView>
                  <EmptyState
                    icon="heart"
                    title="No favourites yet"
                    message="Tap the heart on any category and it will show up here for quick play."
                    actionLabel="Browse categories"
                    onAction={() => router.push('/home')}
                  />
                </NoContentView>
              }
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
  flex: 1,
  width: '100%',
  justifyContent: 'center',
  paddingBottom: space.xxxl * 2,
});
