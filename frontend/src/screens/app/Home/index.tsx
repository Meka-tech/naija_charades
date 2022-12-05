import {CategoryCard, MenuPage} from '../../../components';
import React from 'react';
import styled from '@emotion/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import {CardData} from '../cardData';

export const Home = () => {
  const CardArray = useSelector(
    (state: RootState) => state.reducer.cardArray.cardArray,
  );

  return (
    <MenuPage title="Categories" activePage={'HOME'}>
      <Body>
        {CardArray.map((category, index) => {
          return (
            <CategoryCard
              title={category.title}
              color={category.color}
              description={category.description}
              icon={category.icon}
              key={index * Math.random()}
              index={index}
            />
          );
        })}
      </Body>
    </MenuPage>
  );
};

const Body = styled.ScrollView({
  height: '90%',
});
