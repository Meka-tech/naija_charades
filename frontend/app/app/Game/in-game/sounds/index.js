// import Sound from 'react-native-sound';
import {Audio} from 'expo-av';
// Sound.setCategory('Playback');

// export const StartGameSound = new Sound(
//   'start_game.mp3',
//   Sound.MAIN_BUNDLE,
//   error => {
//     if (error) {
//       console.log('failed to load the sound', error);
//       return;
//     }
//   },
// );

// export const CorrectCardSound = new Sound(
//   'correct_answer.mp3',
//   Sound.MAIN_BUNDLE,
//   error => {
//     if (error) {
//       console.log('failed to load the sound', error);
//       return;
//     }
//   },
// );

// export const WrongCardSound = new Sound(
//   'wrong_answer.mp3',
//   Sound.MAIN_BUNDLE,
//   error => {
//     if (error) {
//       console.log('failed to load the sound', error);
//       return;
//     }
//   },
// );
// export const EndGameSound = new Sound(
//   'end_game.mp3',
//   Sound.MAIN_BUNDLE,
//   error => {
//     if (error) {
//       console.log('failed to load the sound', error);
//       return;
//     }
//   },
// );
// export const TimerSound = new Sound(
//   'ticking_timer.mp3',
//   Sound.MAIN_BUNDLE,
//   error => {
//     if (error) {
//       console.log('failed to load the sound', error);
//       return;
//     }
//   },
// );

/**
 * @param {any} fileName
 * @returns {Promise<import('expo-av').Audio.Sound>}
 */
async function loadSound(fileName) {
  const {sound} = await Audio.Sound.createAsync(fileName);
  return sound;
}

/**
 * @typedef {Object} GameSounds
 * @property {import('expo-av').Audio.Sound} startGame
 * @property {import('expo-av').Audio.Sound} correct
 * @property {import('expo-av').Audio.Sound} wrong
 * @property {import('expo-av').Audio.Sound} endGame
 * @property {import('expo-av').Audio.Sound} timer
 */

/**
 * @returns {Promise<GameSounds>}
 */
export const loadGameSounds = async () => {
  const [startGame, correct, wrong, endGame, timer] = await Promise.all([
    loadSound(require('assets/sounds/start_game.mp3')),
    loadSound(require('assets/sounds/correct_answer.mp3')),
    loadSound(require('assets/sounds/wrong_answer.mp3')),
    loadSound(require('assets/sounds/end_game.mp3')),
    loadSound(require('assets/sounds/ticking_timer.mp3')),
  ]);

  return {
    startGame,
    correct,
    wrong,
    endGame,
    timer,
  };
};
