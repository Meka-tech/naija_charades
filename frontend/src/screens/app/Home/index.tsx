import {CategoryCard, MenuPage} from '../../../components';
import React, {useEffect} from 'react';
import styled from '@emotion/native';
import {CardData} from '../cardData';
import axios from 'axios';

type GetCategoryResponse = [
  {
    id: Number;
    title: String;
    icon: String;
    favourite: Boolean;
    color: String;
    description: String;
    cards: [];
  },
];

export const Home = () => {
  useEffect(() => {
    const fetchCategories = () => {
      fetch('https://localhost:5000/api/categories')
        .then(response => response.json())
        .catch(error => {
          console.error(error);
        });
    };

    fetchCategories();
  }, []);

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
