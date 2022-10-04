import React, {FC} from 'react';
import styled from '@emotion/native';
import {fontPixel, heightPixel, widthPixel} from '../../utils/pxToDpConvert';
import {theme} from '../../utils/theme';
import Modal from 'react-native-modal';
import {Text, View} from 'react-native';

interface IProps {
  active: boolean;
  onPress?: () => void;
  closeModal?: () => void;
  bodyText?: string;
}

export const DeleteModal: FC<IProps> = ({
  active,
  onPress,
  closeModal,
  bodyText,
}) => {
  return (
    <Body>
      <Modal isVisible={active}>
        <ModalBody>
          <Title>Are you sure</Title>
          <Description>{bodyText}</Description>
          <ButtonView>
            <Button onPress={onPress}>
              <ButtonText>DELETE</ButtonText>
            </Button>
            <Button onPress={closeModal}>
              <ButtonText>CANCEL</ButtonText>
            </Button>
          </ButtonView>
        </ModalBody>
      </Modal>
    </Body>
  );
};

const Body = styled.View({});

const ModalBody = styled.View({
  position: 'absolute',
  width: widthPixel(310),
  backgroundColor: theme.colors.white,
  height: heightPixel(160),
  alignSelf: 'center',
  borderRadius: widthPixel(10),
  paddingVertical: heightPixel(10),
  paddingHorizontal: widthPixel(20),
  justifyContent: 'center',
});

const Title = styled.Text({
  color: theme.colors.black,
  fontSize: fontPixel(18),
  fontFamily: theme.fonts.Monstserrat,
  marginBottom: heightPixel(5),
});

const Description = styled.Text({
  color: theme.colors.black,
  fontSize: fontPixel(14),
  fontFamily: theme.fonts.Monstserrat,
  marginBottom: heightPixel(10),
});

const ButtonView = styled.View({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Button = styled.TouchableOpacity({});

const ButtonText = styled.Text({
  color: theme.colors.main,
  fontSize: fontPixel(15),
  fontFamily: theme.fonts.Monstserrat,
});
