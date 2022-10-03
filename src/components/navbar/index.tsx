import React, {FC, useEffect} from 'react';
import styled from '@emotion/native';
import {theme} from '../../utils/theme';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {heightPixel, widthPixel} from '../../utils/pxToDpConvert';
import Icon from 'react-native-vector-icons/Entypo';
import {RenderNavItem} from './renderNavItem';
import {NAVDATA} from './renderNavItem/navData';
import {RootState} from '../../app/store';
import {useSelector} from 'react-redux';

interface IProps {
  activePage?: string;
  active: boolean;
  closeNav: () => void;
}

export const Navbar: FC<IProps> = ({active, activePage, closeNav}) => {
  const offset = useSharedValue(0);
  const {darkMode: isDarkMode} = useSelector(
    (state: RootState) => state.reducer.userPreference,
  );

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });
  useEffect(() => {
    active ? (offset.value = 1) : (offset.value = -1.5);
  }, [active, offset]);

  const Bar = styled.View({
    width: '60%',
    height: '100%',
    backgroundColor: isDarkMode
      ? theme.colors.darkbackground
      : theme.colors.white,
    elevation: 200,
    paddingTop: heightPixel(89),
  });

  const Cross = styled.TouchableOpacity({
    position: 'absolute',
    left: widthPixel(30),
    top: heightPixel(30),
  });

  return (
    <Animated.View
      style={[
        {height: '100%', width: '100%', zIndex: 10, position: 'absolute'},
        defaultSpringStyles,
      ]}>
      <Container>
        <Bar>
          <Cross onPress={closeNav}>
            <Icon
              name={'cross'}
              size={30}
              color={isDarkMode ? theme.colors.white : theme.colors.black}
            />
          </Cross>
          {NAVDATA.map(item => {
            return (
              <RenderNavItem
                active={activePage === item.title}
                text={item.title}
                key={item.id}
                nav={item.nav}
                Icon={
                  activePage === item.title
                    ? item.activeIcon
                    : isDarkMode
                    ? item.activeIcon
                    : item.icon
                }
              />
            );
          })}
        </Bar>
        <Shade onPress={closeNav} />
      </Container>
    </Animated.View>
  );
};

const Container = styled.View({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 10,
  left: '-60%',
});

const Shade = styled.TouchableOpacity({
  position: 'absolute',
  width: '40%',
  height: '100%',
  right: 0,
});
