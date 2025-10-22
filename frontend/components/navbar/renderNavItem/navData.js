import HomeIcon from 'assets/images/NavIcons/home.svg';
import HomeActiveIcon from 'assets/images/NavIcons/home_active.svg';
import HeartIcon from 'assets/images/NavIcons/heart.svg';
import HeartActiveIcon from 'assets/images/NavIcons/heart_active.svg';
import MenuIcon from 'assets/images/NavIcons/menu.svg';
import PlusIcon from 'assets/images/NavIcons/plus.svg';
import PlusActiveIcon from 'assets/images/NavIcons/plus_active.svg';
import SettingIcon from 'assets/images/NavIcons/settings.svg';
import SettingActiveIcon from 'assets/images/NavIcons/settings_active.svg';
import SpeakerIcon from 'assets/images/NavIcons/speaker.svg';
import SpeakerActiveIcon from 'assets/images/NavIcons/speaker_active.svg';
import MenuActiveIcon from 'assets/images/NavIcons/menu_active.svg';
import React from 'react';

export const NAVDATA = [
  {
    id: '1',
    title: 'HOME',
    nav: '/home',
    icon: <HomeIcon />,
    activeIcon: <HomeActiveIcon />,
    isPremium: false,
  },
  {
    id: '2',
    title: 'Main Menu',
    nav: '/',
    icon: <MenuIcon />,
    activeIcon: <MenuActiveIcon />,
    isPremium: false,
  },
  {
    id: '3',
    title: 'Favourites',
    nav: '/favourites',
    icon: <HeartIcon />,
    activeIcon: <HeartActiveIcon />,
    isPremium: false,
  },
  {
    id: '4',
    title: 'New',
    nav: '/new',
    icon: <SpeakerIcon />,
    activeIcon: <SpeakerActiveIcon />,
    isPremium: false,
  },
  {
    id: '5',
    title: 'Custom',
    nav: '/custom',
    icon: <PlusIcon />,
    activeIcon: <PlusActiveIcon />,
    isPremium: false,
  },
  {
    id: '6',
    title: 'Settings',
    nav: '/settings',
    icon: <SettingIcon />,
    activeIcon: <SettingActiveIcon />,
    isPremium: false,
  },
];
