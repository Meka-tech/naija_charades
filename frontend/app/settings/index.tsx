import {MenuPage, SecondaryMenuPage, SliderComponent, Switch} from 'components';
import React, {useEffect, useState} from 'react';
import styled from '@emotion/native';
import {theme, palette, radius, shadow, space} from 'utils/theme';
import {PressableScale} from 'components/ui';
import {schemes} from 'utils/theme';
import {fontPixel, heightPixel, widthPixel} from 'utils/pxToDpConvert';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {updateTimer} from 'redux/features/game_rules/gameRulesSlice';
import {RootState} from 'redux/app/store';
import {
  updateDarkMode,
  updateSound,
} from 'redux/features/user_preference/userPreference';

export default function Settings() {
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
    // Only an explicit toggle saves the theme (marks it as the user's choice).
    setDarkMode(!darkMode);
    dispatch(updateDarkMode(!darkMode));
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
    dispatch(updateSound(sound));
  }, [timer, dispatch, sound, soundLevel]);

  const c = darkMode ? schemes.dark : schemes.light;
  const ToggleTimerView = PressableScale;
  const timerPill = {
    backgroundColor: palette.gold,
    paddingHorizontal: space.md,
    height: heightPixel(36),
    borderRadius: radius.pill,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };
  const card = [
    {
      backgroundColor: c.surface,
      borderRadius: radius.lg,
      paddingHorizontal: space.lg,
      paddingVertical: space.xs,
    },
    !darkMode && shadow.sm,
  ];
  const divider = {height: 1, backgroundColor: c.border};

  return (
    <SecondaryMenuPage title="SETTINGS">
      <Body style={card}>
        <Setting>
          <Left>
            <SettingIcon name="timer-outline" />
            <SettingName darkMode={darkMode}>Timer</SettingName>
          </Left>
          <ToggleTimerView
            haptic="select"
            onPress={ChangeTimer}
            style={timerPill}>
            <TimerText darkMode={darkMode} style={{color: palette.ink}}>
              {timer} Secs
            </TimerText>
          </ToggleTimerView>
        </Setting>
        <Divider style={divider} />
        <Setting>
          <Left>
            <SettingIcon name={darkMode ? 'moon' : 'moon-outline'} />
            <SettingName darkMode={darkMode}>Dark Mode</SettingName>
          </Left>
          <ToggleView>
            <Switch active={darkMode} toggle={toggleMode} />
          </ToggleView>
        </Setting>
        <Divider style={divider} />
        <Setting>
          <Left>
            <SettingIcon
              name={
                sound && SoundLevel !== 0
                  ? 'volume-high-outline'
                  : 'volume-mute-outline'
              }
            />
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
    </SecondaryMenuPage>
  );
}

/** Gold-tinted rounded tile, matching the icon tiles on the selection screens. */
const SettingIcon = ({
  name,
}: {
  name: React.ComponentProps<typeof Ionicons>['name'];
}) => (
  <SettingIconWrap>
    <Ionicons name={name} size={widthPixel(22)} color={palette.gold} />
  </SettingIconWrap>
);

const SettingIconWrap = styled.View({
  width: widthPixel(40),
  height: widthPixel(40),
  borderRadius: radius.sm,
  backgroundColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'center',
});

interface useDark {
  darkMode: boolean;
}

const TimerText = styled.Text<useDark>(({darkMode}) => ({
  color: darkMode ? theme.colors.white : theme.colors.black,
  fontSize: fontPixel(15),
  fontFamily: theme.fonts.MonstserratSemibold,
}));
const SettingName = styled.Text<useDark>(({darkMode}) => ({
  marginLeft: widthPixel(12),
  fontSize: fontPixel(18),
  color: darkMode ? theme.colors.white : theme.colors.black,
  fontFamily: theme.fonts.MonstserratSemibold,
}));

const Body = styled.View({
  width: '100%',
  marginTop: space.md,
});

const Divider = styled.View({});

const Setting = styled.View({
  width: '100%',
  paddingVertical: space.md,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});
const Left = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const ToggleView = styled.View({
  alignItems: 'flex-end',
});
const SliderDiv = styled.View({
  width: '100%',
  paddingBottom: space.sm,
});
