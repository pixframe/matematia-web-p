import { ExerciseTypeNames, Question, Answer } from './types';
import get from 'lodash/get';

export default function checkExerciseAnswers(
  type: ExerciseTypeNames,
  answers: [Question, Answer][]
) {
  if (type === 'multipleChoice') {
    //multipleChoice have one or more correct answers. just check if selected answer is correct.
    return get(answers, '0.1.isCorrect', false);
  }
  if (type === 'closedAnswer') {
    // closedAnswer have one or more answers (all are correct answers). check user answer to match with one.
    const options: Answer[] = get(answers, '0.0.answers', []);
    const answerText: string = get(answers, '0.1.text', '');
    const match = options.find((e) => e.text === answerText);

    return !!match;
  }
  if (type === 'columns') {
    // columns have multiple questions and every question have just one correct answer. check all quesion-answer pairs to match.
    let isCorrect = true;
    answers.forEach((answer) => {
      if (!answer[1].isCorrect) {
        isCorrect = false;
      }
    });
    return isCorrect;
  }
  if (type === 'trueFalse') {
    // trueFalse only have one question and one correct answer. Just check if the selected answer is correct.
    return get(answers, '0.1.isCorrect', false);
  }
  if (type === 'sequence') {
    const array = Array(answers[0][0].answers.length)
      .fill(0)
      .map((_, index) => index);
    console.log(array);
    return array.toString() === answers[0][1].text;
  }
  if (type === 'classification') {
    return get(answers, '0.1.isCorrect', false);
  }
  if (type === 'multipleQuestions') {
    let isCorrect = true;
    answers.forEach((answer) => {
      const options: Answer[] = get(answer, '0.answers', []);
      const answerText: string = get(answer, '1.text', '');
      if (!options.find((e) => e.text.toLocaleLowerCase() === answerText.toLocaleLowerCase())) {
        isCorrect = false;
      }
    });
    return isCorrect;
  }
  if (type === 'draganddrop') {
    let isCorrect = true;
    answers.forEach((answer) => {
      const options: Answer[] = get(answer, '0.answers', []);
      const answerText: string = get(answer, '1.text', '');
      if (!options.find((e) => e.text.toLocaleLowerCase() === answerText.toLocaleLowerCase())) {
        isCorrect = false;
      }
    });
    return isCorrect;
  }
}
