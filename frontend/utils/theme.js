import {heightPixel, widthPixel, fontPixel} from './pxToDpConvert';

// Brand palette — the Naija gold and the pink game screen are the identity.
export const palette = {
  gold: '#FEB60A',
  goldDeep: '#D99800',
  goldSoft: 'rgba(254, 182, 10, 0.14)',
  pink: '#F4839B',
  pinkDeep: '#E5607D',
  blue: '#3F83FE',
  sky: '#5BC1FF',
  green: '#13CA46',
  greenSoft: 'rgba(19, 202, 70, 0.14)',
  orange: '#FE450A',
  coral: '#FC5E5E',
  slate: '#9FA3A6',
  ink: '#1A1919',
  white: '#FFFFFF',
};

const light = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#F4F2EE',
  border: 'rgba(26, 25, 25, 0.08)',
  text: palette.ink,
  textMuted: '#6E6A64',
  overlay: 'rgba(0, 0, 0, 0.45)',
  shadow: '#000000',
};

const dark = {
  background: '#121212',
  surface: '#1E1E1E',
  surfaceAlt: '#2A2A2A',
  border: 'rgba(255, 255, 255, 0.10)',
  text: '#FFFFFF',
  textMuted: '#A7A39D',
  overlay: 'rgba(0, 0, 0, 0.6)',
  shadow: '#000000',
};

export const schemes = {light, dark};

// 4pt spacing scale, scaled to the device.
export const space = {
  xxs: widthPixel(4),
  xs: widthPixel(8),
  sm: widthPixel(12),
  md: widthPixel(16),
  lg: widthPixel(20),
  xl: widthPixel(24),
  xxl: widthPixel(32),
  xxxl: widthPixel(48),
};

export const radius = {
  sm: widthPixel(10),
  md: widthPixel(16),
  lg: widthPixel(24),
  xl: widthPixel(32),
  pill: 999,
};

export const fonts = {
  Gagalin: 'Gagalin-Regular',
  Monstserrat: 'Montserrat-Regular',
  MonstserratBold: 'Montserrat-Bold',
  MonstserratBlack: 'Montserrat-Black',
  MonstserratMedium: 'Montserrat-Medium',
  MonstserratSemibold: 'Montserrat-SemiBold',
  MonstserratExtraBold: 'Montserrat-ExtraBold',
};

// Type scale: Gagalin for display/brand, Montserrat for UI and body.
export const type = {
  display: {fontFamily: fonts.Gagalin, fontSize: fontPixel(40)},
  title: {fontFamily: fonts.Gagalin, fontSize: fontPixel(28)},
  heading: {fontFamily: fonts.MonstserratBold, fontSize: fontPixel(20)},
  subheading: {fontFamily: fonts.MonstserratSemibold, fontSize: fontPixel(17)},
  body: {fontFamily: fonts.MonstserratMedium, fontSize: fontPixel(15)},
  caption: {fontFamily: fonts.MonstserratSemibold, fontSize: fontPixel(12)},
  button: {fontFamily: fonts.Gagalin, fontSize: fontPixel(22)},
};

export const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 6,
  },
};

export const sizes = {
  iconButton: widthPixel(44),
  button: heightPixel(58),
};

// Legacy shape kept so existing screens keep working.
export const theme = {
  colors: {
    main: palette.gold,
    white: 'white',
    black: 'black',
    gray: 'rgba(230, 230, 230, 1)',
    gray100: 'rgba(217, 217, 217, 1)',
    darkbackground: dark.surface,
  },
  fonts,
};
