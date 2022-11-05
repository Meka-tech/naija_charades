import {CategoryCard, MenuPage} from '../../../components';
import React from 'react';
import styled from '@emotion/native';
import {CardData} from '../cardData';

export const Home = () => {
  return (
    <MenuPage title="Categories" activePage={'HOME'}>
      <Body>
        {CardData.map((category, index) => {
          return (
            <CategoryCard
              title={category.title}
              color={category.color}
              description={category.description}
              icon={category.icon}
              key={index * Math.random()}
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
