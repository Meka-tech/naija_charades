import Sound from 'react-native-sound';
Sound.setCategory('Playback');

export const StartGameSound = new Sound(
  'start_game.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  },
);

export const CorrectCardSound = new Sound(
  'correct_answer.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  },
);

export const WrongCardSound = new Sound(
  'wrong_answer.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  },
);
export const EndGameSound = new Sound(
  'end_game.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  },
);
export const TimerSound = new Sound(
  'ticking_timer.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  },
);
