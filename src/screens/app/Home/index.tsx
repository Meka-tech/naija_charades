import {CategoryCard, MenuPage} from '../../../components';
import React from 'react';

export const Home = () => {
  return (
    <MenuPage title="Categories" activePage={'HOME'}>
      <CategoryCard />
    </MenuPage>
  );
};
