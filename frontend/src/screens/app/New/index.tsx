import {CategoryCard, MenuPage} from '../../../components';
import React from 'react';
import styled from '@emotion/native';
import Astronaught from '../../../../assets/images/astronaught.png';
import {fontPixel, heightPixel} from '../../../utils/pxToDpConvert';
import {theme} from '../../../utils/theme';
import {useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import {CardData} from '../cardData';

export const New = () => {
  const CardArray = useSelector(
    (state: RootState) => state.reducer.cardArray.cardArray,
  );
  return (
    <MenuPage title="NEW" activePage={'New'}>
      <>
        {CardArray.length === CardData.length && (
          <NoContentView>
            <Image source={Astronaught} />
            <NoContentText>Sorry, No new Items Here</NoContentText>
          </NoContentView>
        )}
        <Body>
          {CardArray.map((category, index) => {
            const OldArray = CardData.map((_, i) => {
              return CardData[i].title;
            });
            return (
              !OldArray.includes(category.title) && (
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
  height: '90%',
  alignItems: 'center',
  justifyContent: 'center',
});

const Image = styled.Image({
  marginBottom: heightPixel(30),
});
const NoContentText = styled.Text({
  color: theme.colors.main,
  fontWeight: '600',
  fontSize: fontPixel(20),
  fontFamily: theme.fonts.MonstserratSemibold,
});
const Body = styled.ScrollView({height: '90%'});
