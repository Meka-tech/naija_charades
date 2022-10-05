import React, {FC} from 'react';
import styled from '@emotion/native';
import {fontPixel, heightPixel, widthPixel} from '../../utils/pxToDpConvert';
import {theme} from '../../utils/theme';
import Modal from 'react-native-modal';
import {Text, View} from 'react-native';
import {IsDarkMode} from '../../utils/isDarkMode';

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
  const isDarkMode = IsDarkMode();
  return (
    <Body>
      <Modal isVisible={active}>
        <ModalBody isDarkMode={isDarkMode}>
          <Title isDarkMode={isDarkMode}>Are you sure</Title>
          <Description isDarkMode={isDarkMode}>{bodyText}</Description>
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

interface IuseDark {
  isDarkMode: boolean;
}
const Body = styled.View({});

const ModalBody = styled.View<IuseDark>(({isDarkMode}) => ({
  position: 'absolute',
  width: widthPixel(310),
  backgroundColor: isDarkMode
    ? theme.colors.darkbackground
    : theme.colors.white,
  height: heightPixel(160),
  alignSelf: 'center',
  borderRadius: widthPixel(10),
  paddingVertical: heightPixel(10),
  paddingHorizontal: widthPixel(20),
  justifyContent: 'center',
}));

const Title = styled.Text<IuseDark>(({isDarkMode}) => ({
  color: isDarkMode ? theme.colors.white : theme.colors.black,
  fontSize: fontPixel(18),
  fontFamily: theme.fonts.Monstserrat,
  marginBottom: heightPixel(5),
}));

const Description = styled.Text<IuseDark>(({isDarkMode}) => ({
  color: isDarkMode ? theme.colors.white : theme.colors.black,
  fontSize: fontPixel(14),
  fontFamily: theme.fonts.Monstserrat,
  marginBottom: heightPixel(10),
}));

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
