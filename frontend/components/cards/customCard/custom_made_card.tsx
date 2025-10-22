import styled from '@emotion/native';
import React, {FC, useState} from 'react';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {theme} from 'utils/theme';
import customImage from 'assets/images/CardIcon/custom_image.png';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/app/store';
import {deleteCustomCard} from 'redux/features/custom_category/customCategory';
import {DeleteModal} from 'components/modal';

import {useRouter} from 'expo-router';

interface IProps {
  title?: string;
  id?: number;
  uniqueId?: number;
}

export const CustomMadeCard: FC<IProps> = ({title, id, uniqueId}) => {
  const router = useRouter();
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
        router.push({
          pathname: '/game/gameDescription',
          params: {
            title: title,
            custom: 'true',
            id: id,
          },
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
        <FontAwesome name={'trash-o'} color="white" size={22} />
      </Trash>
    </Container>
  );
};

const Container = styled.TouchableOpacity({
  width: '100%',
  marginBottom: heightPixel(20),
  paddingVertical: heightPixel(24),
  borderRadius: widthPixel(30),
  backgroundColor: 'rgba(254, 72, 10, 1)',
  position: 'relative',
  alignItems: 'center',
  elevation: 5,
});
const Title = styled.Text({
  color: theme.colors.white,
  fontSize: fontPixel(24),
  fontFamily: theme.fonts.MonstserratBold,
  marginBottom: heightPixel(10),
});
const Image = styled.Image({});
const Trash = styled.TouchableOpacity({
  position: 'absolute',
  right: 15,
  top: 15,
});
