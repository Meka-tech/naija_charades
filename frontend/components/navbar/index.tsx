import React, {FC} from 'react';
import styled from '@emotion/native';
import {theme} from 'utils/theme';
import {RenderNavItem} from './renderNavItem';
import {NAVDATA} from './renderNavItem/navData';
import {IsDarkMode} from 'utils/isDarkMode';
import {FlatList} from 'react-native';

import SafeAreaViewWrapper from 'components/safeAreaViewWrapper';
import {heightPixel} from 'utils/pxToDpConvert';

interface IProps {
  activePage?: string;
}

export const Navbar: FC<IProps> = ({activePage}) => {
  const isDarkMode = IsDarkMode();

  return (
    <SafeAreaViewWrapper
      darkmode={isDarkMode}
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? theme.colors.darkbackground
          : theme.colors.white,
        width: '100%',
      }}>
      <Container isDarkMode={isDarkMode}>
        <FlatList
          data={NAVDATA}
          renderItem={({item}) => (
            <RenderNavItem
              active={activePage === item.title}
              text={item.title}
              nav={item.nav}
              Icon={
                activePage === item.title
                  ? item.activeIcon
                  : isDarkMode
                  ? item.activeIcon
                  : item.icon
              }
              isPremium={item.isPremium}
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    </SafeAreaViewWrapper>
  );
};

interface useDark {
  isDarkMode: boolean;
}

const Container = styled.View<useDark>(({isDarkMode}) => ({
  paddingVertical: heightPixel(12),
  width: '100%',
  height: '100%',
  backgroundColor: isDarkMode
    ? theme.colors.darkbackground
    : theme.colors.white,
}));

const Separator = styled.View({
  height: heightPixel(10),
});
