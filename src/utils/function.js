export const SecondsToMinutes = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  if ((time = 0)) {
    return '00:00';
  }
  return `0${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
};
