import React, {useState} from 'react';
import styled from '@emotion/native';
import {
  CustomKeyboardAvoidingWrapper,
  SecondaryMenuPage,
  StrippedButton,
  TextInput,
} from 'components';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';
import {theme} from 'utils/theme';
import {newCustomCard} from 'redux/features/custom_category/customCategory';
import {useDispatch} from 'react-redux';

import {IsDarkMode} from 'utils/isDarkMode';
import {useRouter} from 'expo-router';
import KeyboardAvoidingWrapper from 'components/keyboardAvoidingWrapper';
import {View, FlatList} from 'react-native';

export default function CreateNewCategory() {
  const dispatch = useDispatch();
  const [cardArray, setCardArray] = useState<string[]>([]);
  const [titleInput, setTitleInput] = useState('');
  const [cardInput, setCardInput] = useState<string>('');
  const router = useRouter();

  const DarkMode = IsDarkMode();
  const updateArray = () => {
    if (cardInput !== '') {
      setCardArray(current => [...current, cardInput]);
      setCardInput('');
    }
  };

  const CreateDeck = () => {
    if (titleInput !== '' && cardArray.length > 0) {
      const Id = Math.floor(Math.random() * 40);
      dispatch(newCustomCard({id: Id, title: titleInput, cards: cardArray}));
      router.push('/custom');
    }
  };

  return (
    <SecondaryMenuPage>
      <KeyboardAvoidingWrapper style={{width: '100%'}}>
        <Body>
          <TextInput
            placeholder="Enter Deck Name"
            value={titleInput}
            onChangeText={text => setTitleInput(text)}
          />
          <AddCards>
            <AddCardHeader>
              <TextInput
                placeholder="Add Card"
                width={'70%'}
                onChangeText={text => setCardInput(text)}
                value={cardInput}
                border={false}
              />
              <StrippedButton label="Add" width={'25%'} onPress={updateArray} />
            </AddCardHeader>
            <Cards>
              <FlatList
                data={cardArray}
                renderItem={({item, index}) => (
                  <CardItem darkMode={DarkMode} key={index}>
                    {item}
                  </CardItem>
                )}
                keyExtractor={(item, index) => `${item}-${index}`}
                contentContainerStyle={{paddingBottom: 10}}
                showsVerticalScrollIndicator={false}
              />
            </Cards>
          </AddCards>
          <View style={{marginTop: 'auto'}}>
            <StrippedButton label="Create Deck" onPress={CreateDeck} />
          </View>
        </Body>
      </KeyboardAvoidingWrapper>
    </SecondaryMenuPage>
  );
}

const Body = styled.View({
  width: '100%',
  flex: 1,
});

const AddCards = styled.View({
  marginTop: heightPixel(30),
  width: '100%',
  height: '60%',
  backgroundColor: 'rgba(254, 182, 10, 0.17)',
  paddingVertical: heightPixel(10),
  paddingHorizontal: widthPixel(10),

  borderRadius: widthPixel(15),
});

const AddCardHeader = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Cards = styled.View({
  marginTop: heightPixel(20),
  alignSelf: 'center',
  width: '100%',
  flex: 1,
});

interface useDark {
  darkMode: boolean;
}
const CardItem = styled.Text<useDark>(({darkMode}) => ({
  marginBottom: heightPixel(10),
  color: darkMode ? theme.colors.white : theme.colors.black,
  fontWeight: '500',
  fontSize: fontPixel(18),
  fontFamily: theme.fonts.MonstserratMedium,
  textTransform: 'uppercase',
  textAlign: 'center',
}));
