import React, {FC, useState, useEffect} from 'react';
import styled from '@emotion/native';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';
import {theme} from 'utils/theme';
import {View} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Purchases from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppTheme} from 'utils/useAppTheme';
import {radius, space} from 'utils/theme';
import {haptics} from 'utils/haptics';

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
  const {c, isDark} = useAppTheme();

  // const premiumProductIdentifier = 'one_time_purchase';
  const premiumProductIdentifier = 'premium';

  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const CheckIfUserIsPremium = async () => {
    const isStoredPremiumUser = await AsyncStorage.getItem('isPremiumUser');

    if (isStoredPremiumUser === 'true') {
      setIsPremiumUser(true);
      return true;
    }

    const customerInfo = await Purchases.getCustomerInfo();

    if (
      customerInfo.allPurchasedProductIdentifiers.includes(
        premiumProductIdentifier,
      )
    ) {
      setIsPremiumUser(true);
      await AsyncStorage.setItem('isPremiumUser', 'true');
      return true;
    }
    return false;
  };

  const PresentPaywallIfNeeded = async () => {
    try {
      await RevenueCatUI.presentPaywallIfNeeded({
        requiredEntitlementIdentifier: 'premium',
      });

      await CheckIfUserIsPremium();
    } catch (e) {}
  };

  const OnDropdownItemPress = async (item: {
    no: number;
    isPremium: boolean;
  }) => {
    if (item.isPremium) {
      try {
        const isPremiumUserResult = await CheckIfUserIsPremium();
        if (isPremiumUserResult) {
          setSelected(item);
          setActive(false);
          return;
        } else {
          await PresentPaywallIfNeeded();
        }
      } catch (e) {}
    } else {
      setSelected(item);
      setActive(false);
    }
  };

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      await CheckIfUserIsPremium();
    };
    fetchCustomerInfo();
  }, []);

  return (
    <Container
      style={{
        backgroundColor: isDark ? c.surfaceAlt : c.surface,
      }}>
      <Main
        onPress={() => {
          haptics.select();
          setActive(!active);
        }}>
        <Text active={true} style={{color: c.text}}>
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
                      onPress={() => OnDropdownItemPress(item)}
                      key={index * Math.random()}>
                      <Text style={{color: c.textMuted}}>
                        {item.no} {groupName}
                      </Text>
                      {item.isPremium && !isPremiumUser && (
                        <MaterialCommunityIcons
                          name="star"
                          size={24}
                          color="gold"
                        />
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
  borderRadius: radius.md,
  paddingVertical: heightPixel(8),
  paddingHorizontal: space.sm,
  position: 'relative',
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
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
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
