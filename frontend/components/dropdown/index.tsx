import React, {FC, useState} from 'react';
import styled from '@emotion/native';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';
import {theme} from 'utils/theme';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface IProps {
  list: {no: number; isPremium: boolean}[];
  selected?: number;
  groupName?: string;
  setSelected: Function;
}

export const Dropdown: FC<IProps> = ({
  list,
  selected,
  groupName = '',
  setSelected,
}) => {
  const [active, setActive] = useState(false);

  return (
    <Container>
      <Main onPress={() => setActive(!active)}>
        <Text active={true}>
          {selected ? selected : list[0].no} {groupName}
        </Text>

        <AntDesign
          name={active ? 'caret-up' : 'caret-down'}
          size={20}
          color={theme.colors.main}
        />
      </Main>
      {active && (
        <ItemList>
          {list?.map(
            (item: {no: number; isPremium: boolean}, index: number) => {
              return (
                <View key={index * Math.random()}>
                  {item.no !== selected && (
                    <Item
                      onPress={() => {
                        if (item.isPremium) {
                          return;
                        } else {
                          setSelected(item);
                          setActive(false);
                        }
                      }}
                      key={index * Math.random()}>
                      <Text>
                        {item.no} {groupName}
                      </Text>
                      {item.isPremium && (
                        <PremiumTag>
                          <PremiumText>coming soon</PremiumText>
                        </PremiumTag>
                      )}
                    </Item>
                  )}
                </View>
              );
            },
          )}
        </ItemList>
      )}
    </Container>
  );
};

const Container = styled.View({
  width: '100%',
  borderRadius: widthPixel(15),
  paddingVertical: heightPixel(9),
  backgroundColor: theme.colors.white,
  paddingHorizontal: widthPixel(10),
  elevation: 5,
  position: 'relative',
  shadowColor: 'rgba(0, 0, 0, 0.25)',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
});

interface IText {
  active?: boolean;
}
const Main = styled.TouchableOpacity({
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: widthPixel(16),
  paddingVertical: heightPixel(6),
});
const Text = styled.Text<IText>(({active}) => ({
  fontWeight: '400',
  fontSize: fontPixel(18),
  color: active ? 'rgba(45, 45, 45, 1)' : 'rgba(110, 110, 110, 1)',
  fontFamily: theme.fonts.Gagalin,
}));
const ItemList = styled.View({
  marginTop: heightPixel(10),
});
const Item = styled.TouchableOpacity({
  paddingVertical: heightPixel(10),
  paddingLeft: widthPixel(16),
  width: '100%',
  position: 'relative',
});

const PremiumTag = styled.View({
  position: 'absolute',
  bottom: 0,
  right: 0,
  // backgroundColor: theme.colors.main,
  paddingHorizontal: widthPixel(10),
  paddingVertical: heightPixel(5),
  borderRadius: widthPixel(10),
});

const PremiumText = styled.Text({
  color: theme.colors.black,
  fontSize: fontPixel(12),
  fontFamily: theme.fonts.Gagalin,
  textTransform: 'uppercase',
});
