import React, {useState} from 'react';
import styled from '@emotion/native';
import {
  CustomKeyboardAvoidingWrapper,
  SecondaryMenuPage,
  StrippedButton,
  TextInput,
} from '../../../../components';
import {
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../../../utils/pxToDpConvert';
import {theme} from '../../../../utils/theme';
import {newCustomCard} from '../../../../features/custom_category/customCategory';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {IsDarkMode} from '../../../../utils/isDarkMode';

export const CreateNewCategory = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [cardArray, setCardArray] = useState<string[]>([]);
  const [titleInput, setTitleInput] = useState('');
  const [cardInput, setCardInput] = useState<string>('');

  const DarkMode = IsDarkMode();
  const updateArray = () => {
    setCardArray(current => [...current, cardInput]);
    setCardInput('');
  };

  const CreateDeck = () => {
    if (titleInput !== '' && cardArray.length > 0) {
      const Id = Math.floor(Math.random() * 40);
      dispatch(newCustomCard({id: Id, title: titleInput, cards: cardArray}));
      navigate('CustomPage');
    }
  };
  return (
    <CustomKeyboardAvoidingWrapper>
      <SecondaryMenuPage>
        <Body>
          <TextInput
            placeholder="Enter Deck Name"
            value={titleInput}
            onChangeText={text => setTitleInput(text)}
          />
          <AddCards>
            <AddCardHeader>
              <TextInput
                placeholder="Add Cards"
                width={'70%'}
                onChangeText={text => setCardInput(text)}
                value={cardInput}
                border={false}
              />
              <StrippedButton label="Add" width={'25%'} onPress={updateArray} />
            </AddCardHeader>
            <Cards>
              {cardArray.map((card, index) => {
                return (
                  <CardItem darkMode={DarkMode} key={index}>
                    {card}
                  </CardItem>
                );
              })}
            </Cards>
          </AddCards>
          <StrippedButton label="Create Deck" onPress={CreateDeck} />
        </Body>
      </SecondaryMenuPage>
    </CustomKeyboardAvoidingWrapper>
  );
};

const Body = styled.View({
  width: '85%',
  height: '90%',
});

const AddCards = styled.View({
  marginTop: heightPixel(30),
  width: '100%',
  height: '80%',
  backgroundColor: 'rgba(254, 182, 10, 0.17)',
  paddingVertical: heightPixel(10),
  paddingHorizontal: widthPixel(10),
  marginBottom: heightPixel(40),
  borderRadius: widthPixel(15),
});

const AddCardHeader = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Cards = styled.View({
  width: '100%',
  alignItems: 'center',
  marginTop: heightPixel(30),
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
}));
