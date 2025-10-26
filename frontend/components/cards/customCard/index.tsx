import styled from '@emotion/native';
import React, {FC, useEffect, useState} from 'react';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';
import {theme} from 'utils/theme';
import NewIcon from 'assets/images/CardIcon/new_card.svg';

import {useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const CustomCard: FC = ({}) => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const router = useRouter();

  const CheckIfUserIsPremium = async () => {
    const isStoredPremiumUser = await AsyncStorage.getItem('isPremiumUser');
    if (isStoredPremiumUser) {
      setIsPremiumUser(true);
      return true;
    }

    const customerInfo = await Purchases.getCustomerInfo();

    if (
      customerInfo.allPurchasedProductIdentifiers.includes('one_time_purchase')
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

  const OnPress = async () => {
    try {
      const isPremiumUserResult = await CheckIfUserIsPremium();
      if (isPremiumUserResult) {
        router.push('/custom/create');
      } else {
        await PresentPaywallIfNeeded();
      }
    } catch (e) {}
  };

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      await CheckIfUserIsPremium();
    };
    fetchCustomerInfo();
  }, []);

  return (
    <Container onPress={OnPress}>
      <HeaderView>
        {!isPremiumUser && (
          <MaterialCommunityIcons
            name="crown"
            size={fontPixel(36)}
            color="gold"
          />
        )}
        <Title>Add New Deck</Title>
      </HeaderView>

      <NewIcon />
    </Container>
  );
};

export * from './custom_made_card';
const Container = styled.TouchableOpacity({
  width: '100%',
  marginBottom: heightPixel(20),
  borderRadius: widthPixel(30),
  paddingVertical: heightPixel(24),
  backgroundColor: 'black',
  position: 'relative',
  alignItems: 'center',
  elevation: 5,
});
const HeaderView = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: widthPixel(10),
});
const Title = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(24),
  fontFamily: theme.fonts.MonstserratBold,
  marginBottom: heightPixel(5),
});
