import {useSelector} from 'react-redux';
export const IsDarkMode = () => {
  const {darkMode} = useSelector(state => state.reducer.userPreference);

  return darkMode;
};
