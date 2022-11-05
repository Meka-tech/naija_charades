const createHex = () => {
  let hexCode1 = '';
  let hexValues1 = '0123456789abcdef';

  for (var i = 0; i < 6; i++) {
    hexCode1 += hexValues1.charAt(
      Math.floor(Math.random() * hexValues1.length),
    );
  }
  return hexCode1;
};

export const GenerateGradient = () => {
  const deg = Math.floor(Math.random() * 360);

  let gradient =
    'linear-gradient(' +
    deg +
    'deg, ' +
    '#' +
    createHex() +
    ', ' +
    '#' +
    createHex() +
    ')';

  return gradient;
};
