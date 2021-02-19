interface TopicData {
  code: number;
  prerequisite: number | null;
}

const TopicDataPrerquisites: TopicData[] = [
  { code: 1, prerequisite: null },
  { code: 2, prerequisite: null },
  { code: 3, prerequisite: 2 },
  { code: 4, prerequisite: 3 },
  { code: 5, prerequisite: 4 },
  { code: 6, prerequisite: 5 },
  { code: 7, prerequisite: 5 },
  { code: 8, prerequisite: 7 },
  { code: 9, prerequisite: null },
  { code: 10, prerequisite: null },
  { code: 11, prerequisite: 10 },
  { code: 12, prerequisite: 11 },
  { code: 13, prerequisite: 12 },
  { code: 14, prerequisite: 12 },
  { code: 15, prerequisite: 14 },
  { code: 16, prerequisite: 12 },
  { code: 17, prerequisite: 11 },
  { code: 18, prerequisite: null },
  { code: 19, prerequisite: 18 },
  { code: 20, prerequisite: 19 },
  { code: 21, prerequisite: 6 },
  { code: 22, prerequisite: null },
  { code: 23, prerequisite: 22 },
  { code: 24, prerequisite: 23 },
  { code: 25, prerequisite: 6 },
  { code: 26, prerequisite: 25 },
  { code: 27, prerequisite: 26 },
  { code: 28, prerequisite: 7 },
  { code: 29, prerequisite: 28 },
  { code: 30, prerequisite: 28 },
  { code: 31, prerequisite: 30 },
  { code: 32, prerequisite: 31 },
  { code: 33, prerequisite: 30 },
  { code: 34, prerequisite: 33 },
  { code: 35, prerequisite: 34 },
  { code: 36, prerequisite: 35 },
  { code: 37, prerequisite: null },
  { code: 38, prerequisite: 3 },
  { code: 39, prerequisite: 8 },
  { code: 40, prerequisite: 7 },
  { code: 41, prerequisite: 40 },
  { code: 42, prerequisite: 41 },
  { code: 43, prerequisite: 25 },
  { code: 44, prerequisite: 6 },
  { code: 45, prerequisite: 44 },
  { code: 46, prerequisite: 45 },
  { code: 47, prerequisite: 46 },
  { code: 48, prerequisite: 47 },
  { code: 49, prerequisite: 48 }
];

export function getPrerequisite(code: number): number | null {
  const data = TopicDataPrerquisites.find((data) => data.code === code);
  if (data) {
    return data.prerequisite;
  }
  return null;
}

export function getNewTheme(aprovedTopics: number[]): number {
  const availableThemes = TopicDataPrerquisites.filter((data) => {
    if (!aprovedTopics.includes(data.code)) {
      return data.prerequisite === null ? true : aprovedTopics.includes(data.prerequisite);
    }
    return false;
  });
  const randomTheme = Math.floor(Math.random() * availableThemes.length);
  return availableThemes[randomTheme].code;
}

export function getRepeatThemes(aprovedTopics: number[], currentTopic: number): number[] {
  const availableThemes = TopicDataPrerquisites.filter((data) => {
    if (!aprovedTopics.includes(data.code) && data.code !== currentTopic) {
      return data.prerequisite === null ? true : aprovedTopics.includes(data.prerequisite);
    }
    return false;
  });
  const array = [];
  const possibilities = availableThemes.map((topic) => topic.code);
  for (let i = 0; i < 3; i++) {
    const randomTheme = Math.floor(Math.random() * possibilities.length);
    array.push(possibilities[randomTheme]);
    possibilities.splice(randomTheme, 1);
    console.log(possibilities);
  }
  return array;
}
