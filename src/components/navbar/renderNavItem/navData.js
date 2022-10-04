import HomeIcon from '../../../../assets/images/NavIcons/home.svg';
import HomeActiveIcon from '../../../../assets/images/NavIcons/home_active.svg';
import HeartIcon from '../../../../assets/images/NavIcons/heart.svg';
import HeartActiveIcon from '../../../../assets/images/NavIcons/heart_active.svg';
import MenuIcon from '../../../../assets/images/NavIcons/menu.svg';
import PlusIcon from '../../../../assets/images/NavIcons/plus.svg';
import PlusActiveIcon from '../../../../assets/images/NavIcons/plus_active.svg';
import SettingIcon from '../../../../assets/images/NavIcons/settings.svg';
import SettingActiveIcon from '../../../../assets/images/NavIcons/settings_active.svg';
import SpeakerIcon from '../../../../assets/images/NavIcons/speaker.svg';
import SpeakerActiveIcon from '../../../../assets/images/NavIcons/speaker_active.svg';
import MenuActiveIcon from '../../../../assets/images/NavIcons/menu_active.svg';
import React from 'react';

export const NAVDATA = [
  {
    id: '1',
    title: 'HOME',
    nav: 'Home',
    icon: <HomeIcon />,
    activeIcon: <HomeActiveIcon />,
  },
  {
    id: '2',
    title: 'Main Menu',
    nav: 'MainMenu',
    icon: <MenuIcon />,
    activeIcon: <MenuActiveIcon />,
  },
  {
    id: '3',
    title: 'Favourites',
    nav: 'Favourites',
    icon: <HeartIcon />,
    activeIcon: <HeartActiveIcon />,
  },
  {
    id: '4',
    title: 'New',
    nav: 'New',
    icon: <SpeakerIcon />,
    activeIcon: <SpeakerActiveIcon />,
  },
  {
    id: '5',
    title: 'Custom',
    nav: 'CustomPage',
    icon: <PlusIcon />,
    activeIcon: <PlusActiveIcon />,
  },
  {
    id: '6',
    title: 'Settings',
    nav: 'Settings',
    icon: <SettingIcon />,
    activeIcon: <SettingActiveIcon />,
  },
];
