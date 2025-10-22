import React, {FC, useState, useCallback, useEffect} from 'react';
import styled from '@emotion/native';
import {IsDarkMode} from 'utils/isDarkMode';
import {theme} from 'utils/theme';
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
} from 'components/howToPlay/carouselData';
import ProgressBar from 'components/howToPlay/progressBar';
import {FlatList} from 'react-native-gesture-handler';
import {heightPixel, widthPixel} from 'utils/pxToDpConvert';
import {Dimensions} from 'react-native';
import SafeAreaViewWrapper from 'components/safeAreaViewWrapper';
import Entypo from '@expo/vector-icons/Entypo';

interface ICarouselItem {
  children: JSX.Element;
  id: string;
}

const Item: FC<ICarouselItem> = ({id, children}) => {
  return <CarouselItem key={id}>{children}</CarouselItem>;
};

export default function HowToPlay() {
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
    <SafeAreaViewWrapper darkmode={isDarkMode}>
      <Body darkMode={isDarkMode}>
        <GobackView
          onPress={() => {
            goBack();
          }}>
          <Entypo name="chevron-left" size={30} color={theme.colors.main} />
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
    </SafeAreaViewWrapper>
  );
}

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
  top: heightPixel(10),
  left: widthPixel(15),
});

const CarouselBody = styled.View({
  width: '100%',
  height: '90%',
  alignItems: 'center',
  justifyContent: 'center',
});

const CarouselItem = styled.View({});

const Header = styled.View({
  marginTop: heightPixel(20),
  marginBottom: heightPixel(20),
});
