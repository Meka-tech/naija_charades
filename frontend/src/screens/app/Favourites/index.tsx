import {CategoryCard, MenuPage} from '../../../components';
import React from 'react';
import styled from '@emotion/native';
import Void from '../../../../assets/images/void.png';
import {fontPixel, heightPixel} from '../../../utils/pxToDpConvert';
import {theme} from '../../../utils/theme';
import {useSelector} from 'react-redux';
import {RootState} from '../../../app/store';

export const Favourites = () => {
  const {favouritesArray} = useSelector(
    (state: RootState) => state.reducer.favouriteCategories,
  );
  const CardArray = useSelector(
    (state: RootState) => state.reducer.cardArray.cardArray,
  );

  return (
    <MenuPage title="FAVOURITES" activePage={'Favourites'}>
      <>
        {favouritesArray?.length === 0 && (
          <NoContentView>
            <Image source={Void} />
            <NoContentText>
              You haven’t added anything to your favourites
            </NoContentText>
          </NoContentView>
        )}
        <Body>
          {CardArray.map((category, index) => {
            return (
              favouritesArray.includes(category.title) && (
                <CategoryCard
                  title={category.title}
                  color={category.color}
                  icon={category.icon}
                  key={index * Math.random()}
                  index={index}
                  description={category.description}
                />
              )
            );
          })}
        </Body>
      </>
    </MenuPage>
  );
};

const NoContentView = styled.View({
  width: '100%',
  height: '100%',
  alignItems: 'center',
});

const Image = styled.Image({
  marginTop: heightPixel(120),
  marginBottom: heightPixel(30),
});
const NoContentText = styled.Text({
  color: theme.colors.main,
  fontWeight: '600',
  fontSize: fontPixel(20),
  fontFamily: theme.fonts.MonstserratSemibold,
  textAlign: 'center',
  width: '65%',
  lineHeight: heightPixel(25),
});

const Body = styled.ScrollView({height: '90%'});
