import styled from '@emotion/native';
import React, {FC, useState} from 'react';
import {fontPixel, heightPixel, widthPixel} from '../../../utils/pxToDpConvert';
import Icon from 'react-native-vector-icons/FontAwesome';
import {theme} from '../../../utils/theme';
import customImage from '../../../../assets/images/CardIcon/custom_image.png';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import {deleteCustomCard} from '../../../features/custom_category/customCategory';
import {DeleteModal} from '../../modal';
import {useNavigation} from '@react-navigation/native';
import {IRootNavgation} from '../../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface IProps {
  title?: string;
  id?: number;
  uniqueId?: number;
}

export const CustomMadeCard: FC<IProps> = ({title, id, uniqueId}) => {
  const {navigate} = useNavigation<NativeStackNavigationProp<IRootNavgation>>();
  const dispatch = useDispatch();
  const {customCategoryArray} = useSelector(
    (state: RootState) => state.reducer.customCategories,
  );
  const [modalActive, setModalActive] = useState(false);
  const OnDeleteDeck = () => {
    const NewArray = customCategoryArray.filter(deck => deck.id !== uniqueId);
    dispatch(deleteCustomCard(NewArray));
  };

  const CloseModal = () => {
    setModalActive(false);
  };

  return (
    <Container
      onPress={() =>
        navigate('WhoseGuess', {
          title: title,
          custom: true,
          id: id,
        })
      }>
      <DeleteModal
        active={modalActive}
        bodyText={`Deleting  the category “${title}” will remove it and all of its contents. This cannot be undone.`}
        onPress={OnDeleteDeck}
        closeModal={CloseModal}
      />
      <Title>{title}</Title>
      <Image source={customImage} />
      <Trash onPress={() => setModalActive(true)}>
        <Icon name={'trash-o'} color="white" size={22} />
      </Trash>
    </Container>
  );
};

const Container = styled.TouchableOpacity({
  width: widthPixel(319),
  height: heightPixel(164),
  marginBottom: heightPixel(20),
  borderRadius: widthPixel(15),
  backgroundColor: 'rgba(254, 72, 10, 1)',
  position: 'relative',
  alignItems: 'center',
  paddingVertical: heightPixel(18),
});
const Title = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(24),
  fontFamily: theme.fonts.MonstserratBold,
  marginBottom: heightPixel(5),
});
const Image = styled.Image({});
const Trash = styled.TouchableOpacity({
  position: 'absolute',
  right: 15,
  top: 15,
});
