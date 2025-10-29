import {CustomCard, CustomMadeCard, MenuPage} from 'components';
import React, {useEffect, useState} from 'react';
import styled from '@emotion/native';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';
import {FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';

export default function CustomPage() {
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  // const premiumProductIdentifier = 'one_time_purchase';
  const premiumProductIdentifier = 'premium';

  const {customCategoryArray} = useSelector(
    (state: RootState) => state.reducer.customCategories,
  );

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

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      await CheckIfUserIsPremium();
    };
    fetchCustomerInfo();
  }, []);

  return (
    <MenuPage title="CUSTOM" activePage={'Custom'}>
      <Body>
        <CustomCard />
        {!isPremiumUser && (
          <FlatList
            data={customCategoryArray}
            renderItem={({item, index}) => (
              <CustomMadeCard
                title={item.title}
                id={index}
                uniqueId={item.id}
              />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            contentContainerStyle={{paddingBottom: 20}}
          />
        )}
      </Body>
    </MenuPage>
  );
}

export * from './create';

const Body = styled.View({
  flex: 1,
  width: '100%',
});
