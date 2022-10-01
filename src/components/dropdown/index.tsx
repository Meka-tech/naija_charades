import React, {FC, useState} from 'react';
import styled from '@emotion/native';
import {fontPixel, heightPixel, widthPixel} from '../../utils/pxToDpConvert';
import {theme} from '../../utils/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import {View} from 'react-native';

interface IProps {
  list: number[];
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
      <Main>
        <Text active={true}>
          {selected ? selected : list[0]} {groupName}
        </Text>
        <Button onPress={() => setActive(!active)}>
          <Icon
            name={active ? 'caretup' : 'caretdown'}
            size={20}
            color={theme.colors.main}
          />
        </Button>
      </Main>
      {active && (
        <ItemList>
          {list?.map((item, index) => {
            return (
              <View key={index * Math.random()}>
                {item !== selected && (
                  <Item
                    onPress={() => setSelected(item)}
                    key={index * Math.random()}>
                    <Text>
                      {item} {groupName}
                    </Text>
                  </Item>
                )}
              </View>
            );
          })}
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
});

interface IText {
  active?: boolean;
}
const Main = styled.View({
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: widthPixel(16),
});
const Text = styled.Text<IText>(({active}) => ({
  fontWeight: '400',
  fontSize: fontPixel(18),
  color: active ? 'rgba(45, 45, 45, 1)' : 'rgba(110, 110, 110, 1)',
  fontFamily: theme.fonts.Gagalin,
}));
const ItemList = styled.View({});
const Item = styled.TouchableOpacity({
  paddingVertical: heightPixel(9),
  paddingLeft: widthPixel(16),
  width: '100%',
});

const Button = styled.TouchableOpacity({});
