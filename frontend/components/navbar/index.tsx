import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Logo from 'assets/images/logo.svg';
import {RenderNavItem} from './renderNavItem';
import {NAVDATA} from './renderNavItem/navData';
import {useAppTheme} from 'utils/useAppTheme';
import {palette, radius, space} from 'utils/theme';
import {heightPixel, widthPixel} from 'utils/pxToDpConvert';
import SafeAreaViewWrapper from 'components/safeAreaViewWrapper';

interface IProps {
  activePage?: string;
}

export const Navbar: FC<IProps> = ({activePage}) => {
  const {isDark, c} = useAppTheme();

  return (
    <SafeAreaViewWrapper
      darkmode={isDark}
      style={[styles.container, {backgroundColor: c.surface}]}>
      <View style={styles.logo}>
        <Logo width={widthPixel(200)} height={heightPixel(70)} />
      </View>
      <View style={[styles.divider, {backgroundColor: c.border}]} />
      <FlatList
        data={NAVDATA}
        renderItem={({item}) => (
          <RenderNavItem
            active={activePage === item.title}
            text={item.title}
            nav={item.nav}
            icon={
              (activePage === item.title ? item.activeIcon : item.icon) as any
            }
            isPremium={item.isPremium}
          />
        )}
        ItemSeparatorComponent={() => <View style={{height: space.xs}} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaViewWrapper>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, width: '100%'},
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.gold,
    borderRadius: radius.lg,
    marginHorizontal: space.md,
    marginTop: space.xs,
    marginBottom: space.lg,
    paddingVertical: space.xs,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: space.lg,
    marginBottom: space.md,
  },
});
