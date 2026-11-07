import {useEffect} from 'react';
import * as SystemUI from 'expo-system-ui';
import {useAppTheme} from 'utils/useAppTheme';

/**
 * Keeps the native root view colour in step with the in-app theme, so screen
 * transitions, keyboard reveals and Android edge-to-edge gaps never flash white
 * in dark mode (or black in light mode).
 */
export const ThemeSystemUI = () => {
  const {c} = useAppTheme();
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(c.background).catch(() => {});
  }, [c.background]);
  return null;
};
