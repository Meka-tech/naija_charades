import {CategoryCard, MenuPage} from '../../../components';
import React, {useState} from 'react';
import styled from '@emotion/native';
import {CardData} from '../cardData';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

export const Home = () => {
  const [data, setData] = useState(CardData);

  const getCategories = async () => {
    // const categoriesCollection = firestore().collection('categories').get();
    // console.log(categoriesCollection);
    database()
      .ref('/categories')
      .once('value')
      .then(snapshot => {
        if (snapshot.val() !== CardData) {
          setData(snapshot.val());
        }
        console.log('User data: ', snapshot.val());
      });
  };

  // const setCategories = () => {
  //   database()
  //     .ref('categories')
  //     .set(CardData)
  //     .then(() => console.log('Data set.'))
  //     .catch(err => console.log(err));
  //   firestore()
  //     .collection('categories')
  //     .add(CardData[17])
  //     .then(() => {
  //       console.log('User added!');
  //     });
  // };

  getCategories();
  // setCategories();
  return (
    <MenuPage title="Categories" activePage={'HOME'}>
      <Body>
        {data.map((category, index) => {
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
