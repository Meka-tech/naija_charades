import React, {FC, useState, useCallback, useEffect, useRef} from 'react';
import styled from '@emotion/native';
import {useAppTheme} from 'utils/useAppTheme';
import {space} from 'utils/theme';
import {IconButton} from 'components/ui';
import {StrippedButton} from 'components/buttons';
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

interface ICarouselItem {
  children: JSX.Element;
  id: string;
}

const Item: FC<ICarouselItem> = ({id, children}) => {
  return <CarouselItem key={id}>{children}</CarouselItem>;
};

export default function HowToPlay() {
  const {isDark: isDarkMode, c} = useAppTheme();
  const {goBack} = useNavigation();
  const listRef = useRef<any>(null);

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

  const isLast = activeSlide === Data.length - 1;
  const onNext = () => {
    if (isLast) {
      goBack();
      return;
    }
    listRef.current?.scrollToIndex({index: activeSlide + 1, animated: true});
  };

  return (
    <Body style={{backgroundColor: c.background}}>
      <SafeAreaViewWrapper darkmode={isDarkMode}>
        <Header>
          <IconButton
            name="chevron-back"
            accessibilityLabel="Go back"
            onPress={() => goBack()}
          />
          <ProgressBar items={10} activeSlide={activeSlide} />
          <HeaderSpacer />
        </Header>
        <CarouselBody>
          <FlatList
            ref={listRef}
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
            getItemLayout={(_, index) => ({
              length: Dimensions.get('window').width,
              offset: Dimensions.get('window').width * index,
              index,
            })}
          />
        </CarouselBody>
        <Footer>
          <StrippedButton
            label={isLast ? "Let's play" : 'Next'}
            variant={isLast ? 'primary' : 'secondary'}
            onPress={onNext}
          />
        </Footer>
      </SafeAreaViewWrapper>
    </Body>
  );
}

const Body = styled.View({
  flex: 1,
  width: '100%',
});

const Header = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: space.lg,
  marginTop: space.xs,
  marginBottom: space.sm,
});

const HeaderSpacer = styled.View({
  width: widthPixel(44),
});

const CarouselBody = styled.View({
  flex: 1,
  width: '100%',
});

const CarouselItem = styled.View({});

const Footer = styled.View({
  paddingHorizontal: space.lg,
  paddingTop: space.sm,
  paddingBottom: space.xs,
});
