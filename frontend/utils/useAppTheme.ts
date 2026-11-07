import {useSelector} from 'react-redux';
import {palette, schemes} from './theme';

/**
 * Returns the active colour scheme. Dark mode is still the manual toggle in
 * Settings (stored in Redux), so this simply maps that flag to a palette.
 */
export const useAppTheme = () => {
  const isDark: boolean = useSelector(
    (state: any) => state.reducer.userPreference.darkMode,
  );
  const c = isDark ? schemes.dark : schemes.light;
  return {isDark, c, palette};
};
