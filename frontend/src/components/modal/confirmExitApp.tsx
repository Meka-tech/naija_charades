import React, {FC} from 'react';
import styled from '@emotion/native';
import {fontPixel, heightPixel, widthPixel} from '../../utils/pxToDpConvert';
import {theme} from '../../utils/theme';
import Modal from 'react-native-modal';
import {IsDarkMode} from '../../utils/isDarkMode';
import {StrippedButton} from '../buttons';

interface IProps {
  active: boolean;
  onPress?: () => void;
  closeModal?: () => void;
}

export const ConfirmExitModal: FC<IProps> = ({active, onPress, closeModal}) => {
  const isDarkMode = IsDarkMode();
  return (
    <Body>
      <Modal
        isVisible={active}
        animationIn={'bounceInLeft'}
        animationOut={'bounceOutRight'}
        onBackdropPress={closeModal}>
        <ModalBody isDarkMode={isDarkMode}>
          <Description isDarkMode={isDarkMode}>
            Are You Sure you want to exit Naija Charades
          </Description>
          <ButtonView>
            <StrippedButton label="No" onPress={closeModal} width={'40%'} />
            <Button onPress={onPress}>
              <ButtonText>Yes</ButtonText>
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
  height: heightPixel(200),
  alignSelf: 'center',
  borderRadius: widthPixel(10),
  paddingVertical: heightPixel(10),
  paddingHorizontal: widthPixel(20),
  justifyContent: 'center',
}));

const Description = styled.Text<IuseDark>(({isDarkMode}) => ({
  color: isDarkMode ? theme.colors.white : theme.colors.black,
  fontSize: fontPixel(20),
  fontFamily: theme.fonts.Gagalin,
  marginBottom: heightPixel(50),
  textAlign: 'center',
}));

const ButtonView = styled.View({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: widthPixel(20),
});

const Button = styled.TouchableOpacity({
  width: '35%',
  alignItems: 'center',
  justifyContent: 'center',
});

const ButtonText = styled.Text({
  color: theme.colors.main,
  fontSize: fontPixel(20),
  fontFamily: theme.fonts.Monstserrat,
});
