import {CategoryCard, MenuPage} from 'components';
import React from 'react';
import styled from '@emotion/native';
import {theme, space} from 'utils/theme';
import {EmptyState} from 'components/ui';
import {useRouter} from 'expo-router';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';

import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import {useCards} from 'contexts/cardContext';

export default function New() {
  const {isLoading, refreshCategories} = useCards();
  const router = useRouter();
  const CardArray = useSelector(
    (state: RootState) => state.reducer.cardArray.cardArray,
  );

  const newCards = CardArray.filter(category => category.isNew);

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
              contentContainerStyle={{paddingBottom: 20, flexGrow: 1}}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <NoContentView>
                  <EmptyState
                    icon="sparkles"
                    title="Nothing new yet"
                    message="Fresh categories land here first. Pull down to check again, or play an old favourite."
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

const NoContentView = styled.View({
  flex: 1,
  width: '100%',
  justifyContent: 'center',
  paddingBottom: space.xxxl * 2,
});
const Body = styled.View({
  width: '100%',
  flex: 1,
});
