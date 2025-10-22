import {CategoryCard, MenuPage} from 'components';
import React from 'react';
import styled from '@emotion/native';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {widthPixel} from 'utils/pxToDpConvert';
import {useCards} from 'contexts/cardContext';
import {theme} from 'utils/theme';

export default function Home() {
  const {isLoading, refreshCategories} = useCards();
  const CardArray = useSelector(
    (state: RootState) => state.reducer.cardArray.cardArray,
  );

  const refreshControl = (
    <RefreshControl
      refreshing={isLoading}
      onRefresh={refreshCategories}
      colors={[theme.colors.main]}
    />
  );

  return (
    <MenuPage title="Categories" activePage={'HOME'}>
      <Body>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.colors.main} />
        ) : (
          <FlatList
            refreshControl={refreshControl}
            data={CardArray}
            renderItem={({item, index}) => (
              <CategoryCard
                title={item.title}
                color={item.color}
                description={item.description}
                icon={item.icon}
                index={index}
              />
            )}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            contentContainerStyle={Styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Body>
    </MenuPage>
  );
}

const Body = styled.View({
  width: '100%',
  height: '100%',
});

const Styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: widthPixel(200),
    width: '100%',
  },
});
