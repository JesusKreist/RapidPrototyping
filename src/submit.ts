// import { Idatabase } from "./createQuiz";

import { createQuiz, database, IformattedWordObject } from "./createQuiz";

export interface ServerAnswer {
  indexOfWord: number;
  isCorrect: boolean;
  correctAnswer: string;
  fullWord: string;
  userAnswer: string;
}

export interface UserAnswer {
  indexOfWord: number;
  answer: string;
}

const findSolvedWord = (
  solvedQuiz: IformattedWordObject[],
  userAnswer: UserAnswer
) => {
  return solvedQuiz.find((word) => word.indexOfWord === userAnswer.indexOfWord);
};

export const checkForAnswer = (quizId: string, userAnswers: UserAnswer[]) => {
  // do mongoose find logic here, throw error if not found
  const quizObject = database.find((items) => {
    return items.id === quizId;
  })!;

  const solvedQuiz = createQuiz(quizObject.text);

  const markedAnswers: ServerAnswer[] = userAnswers.map((userAnswer) => {
    const foundSplitWord = findSolvedWord(solvedQuiz, userAnswer);

    if (!foundSplitWord) {
      console.log(userAnswer);
      throw new Error("Couldn't find a matching quiz");
    }

    if (
      !Array.isArray(foundSplitWord.answers) ||
      !foundSplitWord.answers.length ||
      !foundSplitWord.answers[0]
    ) {
      console.log(foundSplitWord);
      throw new Error("Couldn't find an answer in the quiz array!");
    }

    return {
      indexOfWord: foundSplitWord.indexOfWord,
      isCorrect: foundSplitWord.answers.includes(userAnswer.answer),
      correctAnswer: foundSplitWord.answers[0],
      fullWord: foundSplitWord.fullWord,
      userAnswer: userAnswer.answer,
    };
  });

  console.table(markedAnswers);
};
