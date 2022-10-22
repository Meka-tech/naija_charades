import React, {useState} from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {updateSoundLevel} from '../../features/user_preference/userPreference';

export const SliderComponent = () => {
  const {soundLevel: SoundLevel} = useSelector(
    (state: RootState) => state.reducer.userPreference,
  );
  const dispatch = useDispatch();

  const [sliderValue, setSliderValue] = useState(SoundLevel);

  return (
    <Slider
      value={sliderValue}
      onValueChange={(value: object) => {
        const level: number = value[0];
        setSliderValue(level);
      }}
      thumbTintColor={'white'}
      minimumTrackTintColor={'rgba(254, 182, 10, 1)'}
      onSlidingComplete={() => dispatch(updateSoundLevel(sliderValue))}
    />
  );
};
