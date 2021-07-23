// @ts-ignore
import { database, createQuiz } from "./createQuiz";
import { checkForAnswer } from "./submit";

// const basic1 = database.find((quiz) => {
//   return quiz.id === "de153b5e-c63c-40ee-baa7-f4ce4d5da07a";
// })!;

// // console.log(basic1);

// console.log(basic1.id);
// console.log(basic1.rank);
// console.log(basic1.title);
// console.table(createQuiz(basic1.text));

const myAnswer = [
  { indexOfWord: 1, answer: "ner" },
  { indexOfWord: 3, answer: "sl" },
  { indexOfWord: 5, answer: "er" },
  { indexOfWord: 7, answer: "erke" },
  { indexOfWord: 9, answer: "ny" },
  { indexOfWord: 11, answer: "eile" },
];

checkForAnswer("de153b5e-c63c-40ee-baa7-f4ce4d5da07a", myAnswer);
