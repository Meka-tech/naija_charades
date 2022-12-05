export const SecondsToMinutes = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  if ((time = 0)) {
    return '00:00';
  }
  return `0${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
};

export const CreateTeamData = number => {
  const TeamData = [];

  for (let i = 0; i <= number - 1; i++) {
    TeamData.push({
      id: i + 1,
      team: `team ${i + 1}`,
      score: 0,
      cards: {correct: [], skip: []},
    });
  }
  return TeamData;
};

export const CreateStringArray = string => {
  return string.replaceAll(',', `","`);
};
