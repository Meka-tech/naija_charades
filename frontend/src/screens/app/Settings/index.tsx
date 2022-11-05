import {MenuPage, SliderComponent, Switch} from '../../../components';
import React, {useEffect, useState} from 'react';
import styled from '@emotion/native';
import {theme} from '../../../utils/theme';
import {fontPixel, heightPixel, widthPixel} from '../../../utils/pxToDpConvert';
import TimerIcon from '../../../../assets/images/SettingsIcon/timer.svg';
import SoundIcon from '../../../../assets/images/SettingsIcon/sound.svg';
import MoonIcon from '../../../../assets/images/SettingsIcon/crecent.svg';
import {useSelector, useDispatch} from 'react-redux';
import {updateTimer} from '../../../features/game_rules/gameRulesSlice';
import {RootState} from '../../../app/store';
import {
  updateDarkMode,
  updateSound,
} from '../../../features/user_preference/userPreference';
import TimerIconDark from '../../../../assets/images/DarkMode/timer_light.svg';
import CrescentIconDark from '../../../../assets/images/DarkMode/crecent_light.svg';
import SoundIconDark from '../../../../assets/images/DarkMode/sound_light.svg';

export const Settings = () => {
  const Timer = useSelector(
    (state: RootState) => state.reducer.gameRules.timer,
  );
  const {
    darkMode: DarkMode,
    sound: Sound,
    soundLevel: SoundLevel,
  } = useSelector((state: RootState) => state.reducer.userPreference);
  const [darkMode, setDarkMode] = useState(DarkMode);
  const [sound, setSound] = useState(Sound);
  const [soundLevel, setSoundLevel] = useState(SoundLevel);
  const [timer, setTimer] = useState(Timer);
  const dispatch = useDispatch();
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  const toggleSound = () => {
    setSound(!sound);
    if (sound) {
      setSoundLevel(SoundLevel);
    } else {
      setSoundLevel(0);
    }
  };

  const ChangeTimer = () => {
    if (timer < 120) {
      setTimer(timer + 30);
    } else {
      setTimer(60);
    }
  };

  useEffect(() => {
    dispatch(updateTimer(timer));
    dispatch(updateDarkMode(darkMode));
    dispatch(updateSound(sound));
  }, [timer, dispatch, darkMode, sound, soundLevel]);

  const ToggleTimerView = styled.TouchableOpacity({
    backgroundColor: darkMode ? 'rgba(30, 30, 30, 1)' : theme.colors.white,
    width: widthPixel(109),
    height: heightPixel(38),
    borderColor: theme.colors.main,
    borderWidth: widthPixel(2),
    borderRadius: widthPixel(5),
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <MenuPage title="SETTINGS" activePage={'Settings'}>
      <Body>
        <Setting>
          <Left>
            {darkMode ? <TimerIconDark /> : <TimerIcon />}
            <SettingName darkMode={darkMode}>Timer</SettingName>
          </Left>
          <ToggleTimerView onPress={ChangeTimer}>
            <TimerText darkMode={darkMode}>{timer} Secs</TimerText>
          </ToggleTimerView>
        </Setting>
        <Setting>
          <Left>
            {darkMode ? <CrescentIconDark /> : <MoonIcon />}
            <SettingName darkMode={darkMode}>Dark Mode</SettingName>
          </Left>
          <ToggleView>
            <Switch active={darkMode} toggle={toggleMode} />
          </ToggleView>
        </Setting>
        <Setting>
          <Left>
            {darkMode ? <SoundIconDark /> : <SoundIcon />}
            <SettingName darkMode={darkMode}>Sound</SettingName>
          </Left>
          <ToggleView>
            <Switch
              active={SoundLevel === 0 ? false : sound}
              toggle={toggleSound}
            />
          </ToggleView>
        </Setting>
        <SliderDiv>
          <SliderComponent />
        </SliderDiv>
      </Body>
    </MenuPage>
  );
};

interface useDark {
  darkMode: boolean;
}

const TimerText = styled.Text<useDark>(({darkMode}) => ({
  fontWeight: '600',
  color: darkMode ? theme.colors.white : theme.colors.black,
  fontSize: fontPixel(15),
  fontFamily: theme.fonts.MonstserratSemibold,
}));
const SettingName = styled.Text<useDark>(({darkMode}) => ({
  marginLeft: widthPixel(12),
  fontWeight: '600',
  fontSize: fontPixel(18),
  color: darkMode ? theme.colors.white : theme.colors.black,
  fontFamily: theme.fonts.MonstserratSemibold,
}));

const Body = styled.View({
  width: '80%',
  marginTop: heightPixel(50),
});

const Setting = styled.View({
  width: '100%',
  marginBottom: heightPixel(53),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});
const Left = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const ToggleView = styled.View({
  width: widthPixel(109),
  alignItems: 'center',
});
const SliderDiv = styled.View({
  width: '80%',
  marginLeft: 'auto',
  marginRight: 'auto',
});
