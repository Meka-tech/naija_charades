import {CustomCard, CustomMadeCard, MenuPage} from 'components';
import React from 'react';
import styled from '@emotion/native';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';
import {FlatList} from 'react-native';

export default function CustomPage() {
  const {customCategoryArray} = useSelector(
    (state: RootState) => state.reducer.customCategories,
  );

  return (
    <MenuPage title="CUSTOM" activePage={'Custom'}>
      <Body>
        <CustomCard />
        <FlatList
          data={customCategoryArray}
          renderItem={({item, index}) => (
            <CustomMadeCard title={item.title} id={index} uniqueId={item.id} />
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </Body>
    </MenuPage>
  );
}

export * from './create';

const Body = styled.View({
  flex: 1,
  width: '100%',
});
