import React, {FC, useState, useCallback, useEffect} from 'react';
import styled from '@emotion/native';
import {IsDarkMode} from '../../../utils/isDarkMode';
import {theme} from '../../../utils/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {
  ItemEight,
  ItemFive,
  ItemFour,
  ItemNine,
  ItemOne,
  ItemSeven,
  ItemSix,
  ItemTen,
  ItemThree,
  ItemTwo,
  ProgressBar,
} from './components';
import {FlatList} from 'react-native-gesture-handler';
import {heightPixel} from '../../../utils/pxToDpConvert';
import {Dimensions} from 'react-native';

interface ICarouselItem {
  children: JSX.Element;
  id: string;
}

const Item: FC<ICarouselItem> = ({id, children}) => {
  return <CarouselItem key={id}>{children}</CarouselItem>;
};

export const HowToPlay = () => {
  const isDarkMode = IsDarkMode();
  const {goBack} = useNavigation();

  const Data = [
    {id: '1', children: <ItemOne />},
    {id: '2', children: <ItemTwo />},
    {id: '3', children: <ItemThree />},
    {id: '4', children: <ItemFour />},
    {id: '5', children: <ItemFive />},
    {id: '6', children: <ItemSix />},
    {id: '7', children: <ItemSeven />},
    {id: '8', children: <ItemEight />},
    {id: '9', children: <ItemNine />},
    {id: '10', children: <ItemTen />},
  ];
  const [ViewableItems, setViewableItem] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const OnViewableItemsChanged = useCallback(({viewableItems}) => {
    setViewableItem(viewableItems);
  }, []);

  useEffect(() => {
    ViewableItems.length !== 0 && setActiveSlide(ViewableItems[0].index);
  }, [ViewableItems]);

  return (
    <Body darkMode={isDarkMode}>
      <GobackView
        onPress={() => {
          goBack();
        }}>
        <Icon name="arrowleft" color={theme.colors.main} size={30} />
      </GobackView>
      <Header>
        <ProgressBar items={10} activeSlide={activeSlide} />
      </Header>
      <CarouselBody>
        <FlatList
          data={Data}
          renderItem={({item}) => (
            <Item key={item.id} children={item.children} id={item.id} />
          )}
          keyExtractor={listItem => listItem.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 75,
            minimumViewTime: 0,
          }}
          onViewableItemsChanged={OnViewableItemsChanged}
          decelerationRate={'fast'}
          snapToAlignment="start"
          snapToInterval={Dimensions.get('window').width}
        />
      </CarouselBody>
    </Body>
  );
};

interface IuseDark {
  darkMode: boolean;
}
const Body = styled.View<IuseDark>(({darkMode}) => ({
  width: '100%',
  height: '100%',
  backgroundColor: darkMode ? theme.colors.darkbackground : theme.colors.white,
  alignItems: 'center',
}));

const GobackView = styled.TouchableOpacity({
  position: 'absolute',
  top: 25,
  left: 25,
});

const CarouselBody = styled.View({
  width: '100%',
  height: '90%',
  alignItems: 'center',
  justifyContent: 'center',
});

const CarouselItem = styled.View({});

const Header = styled.View({
  marginTop: heightPixel(60),
  marginBottom: heightPixel(40),
});
