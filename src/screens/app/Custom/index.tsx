import {
  CustomCard,
  CustomMadeCard,
  MenuPage,
  TextInput,
} from '../../../components';
import React, {useState} from 'react';
import styled from '@emotion/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../app/store';

export const CustomPage = () => {
  const {customCategoryArray} = useSelector(
    (state: RootState) => state.reducer.customCategories,
  );

  return (
    <MenuPage title="CUSTOM" activePage={'Custom'}>
      <Body>
        <CustomCard />
        {customCategoryArray.length !== 0 &&
          customCategoryArray.map(category => {
            return (
              <CustomMadeCard
                title={category.title}
                key={category.id}
                id={category.id}
              />
            );
          })}
      </Body>
    </MenuPage>
  );
};

export * from './createNewCategory';

const Body = styled.ScrollView({
  height: '90%',
});
