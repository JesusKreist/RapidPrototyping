export interface IformattedWordObject {
  wordType: "whole" | "split";
  returnedWord: string;
  lineLength: number;
  indexOfWord: number;
  punctuation: string;
  fullWord: string;
  answers: string[];
  hasPunctuation: boolean;
}

export interface handleWordTypesProps {
  word: string;
  formattedWordObj: Partial<IformattedWordObject>;
  fullWord: string;
}

const setWordType = (
  word: string,
  formattedWordObj: Partial<IformattedWordObject>
) => {
  if (word.startsWith("@split")) {
    formattedWordObj.wordType = "split";
  } else {
    formattedWordObj.wordType = "whole";
  }
};

const getWordWithoutPrefix = (word: string) => {
  if (word.startsWith("@split")) {
    return word.replace("@split", "");
  }
  return word;
};

const setHasPunctuationInWord = (
  word: string,
  formattedWordObj: Partial<IformattedWordObject>
) => {
  if (word.endsWith("@punctuation")) {
    formattedWordObj.hasPunctuation = true;
  } else {
    formattedWordObj.hasPunctuation = false;
  }
};

const getWordWithoutSuffix = (word: string) => {
  if (word.endsWith("@punctuation")) {
    return word.replace("@punctuation", "");
  }

  return word;
};

const getWordWithoutPunctuation = (
  word: string,
  formattedWordObj: Partial<IformattedWordObject>
) => {
  if (formattedWordObj.hasPunctuation) {
    const lastIndex = word.length - 1;
    const wordWithoutPunctuation = word.substring(0, lastIndex);
    return wordWithoutPunctuation;
  }
  return word;
};

const setPunctuationInObject = (
  word: string,
  formattedWordObj: Partial<IformattedWordObject>
) => {
  if (formattedWordObj.hasPunctuation) {
    const lastIndex = word.length - 1;
    formattedWordObj.punctuation = word.charAt(lastIndex);
  } else {
    formattedWordObj.punctuation = "";
  }
};

export const getFormattedObjects = (
  splitParagraph: string[]
): IformattedWordObject[] => {
  const createdQuiz = splitParagraph.map((word, indexOfWord) => {
    const formattedWordObj: Partial<IformattedWordObject> = {};

    setWordType(word, formattedWordObj);
    const wordWithoutPrefix = getWordWithoutPrefix(word);
    setHasPunctuationInWord(wordWithoutPrefix, formattedWordObj);

    const wordWithoutSuffix = getWordWithoutSuffix(wordWithoutPrefix);
    setPunctuationInObject(wordWithoutSuffix, formattedWordObj);

    const wordWithoutPunctuation = getWordWithoutPunctuation(
      wordWithoutSuffix,
      formattedWordObj
    );

    if (formattedWordObj.wordType === "split") {
      const lengthOfWord = wordWithoutPunctuation.length;
      const halfOfWordLength = Math.floor(lengthOfWord / 2);
      const firstPartOfWord = wordWithoutPunctuation.slice(0, halfOfWordLength);
      const secondPartOfWord = wordWithoutPunctuation.slice(halfOfWordLength);

      formattedWordObj.returnedWord = firstPartOfWord;
      formattedWordObj.answers = [secondPartOfWord];
      formattedWordObj.lineLength = secondPartOfWord.length + 1;
    } else {
      formattedWordObj.answers = [""];
      formattedWordObj.lineLength = 0;
      formattedWordObj.returnedWord = wordWithoutPunctuation;
    }

    formattedWordObj.indexOfWord = indexOfWord;
    formattedWordObj.fullWord = wordWithoutPunctuation;

    const quizObject = formattedWordObj as IformattedWordObject;
    return quizObject;
  });

  return createdQuiz;
};

export interface Idatabase {
  id: string;
  rank: string;
  title: string;
  text: string;
}

export const database: Idatabase[] = [
  {
    id: "de153b5e-c63c-40ee-baa7-f4ce4d5da07a",
    rank: "basic",
    title: "K??lner Dom",
    text: `Der @splitK??lner Dom @splitist eines @splitder wichtigsten @splitBauwerke in @splitganz Deutschland.@punctuation @splitViele Menschen @splitreisen taglich @splitaus Deutschland,@punctuation @splitaber auch @splitaus der @splitganzen Welt,@punctuation @splitin die @splitrheinische Metropole,@punctuation @splitum sich @splitdas gigantische @splitGeb??ude von @splitNahem anzusehen.@punctuation @splitAber nicht @splitnur die @splitH??he und @splitGro??e dieses @splitBauwerkes ist @splitmonumental.@punctuation Auch @splitmit seiner @splitBauzeit ??bertrifft @splitder K??lner @splitDom die @splitmeisten anderen @splitGeb??ude dieser @splitWelt:@punctuation Erst 1880 @splitwurde er @splitnach insgesamt 632 @splitJahren endlich @spliteingeweiht.@punctuation Das @splitist unter @splitanderem ein @splitGrund daf??r,@punctuation @splitdass der @splitK??lner Dom @splitinzwischen zum @splitWeltkulturerbe erkl??rt @splitwurde.@punctuation Da @splitder Dom @splitdirekt vor @splitdem K??lner @splitHauptbahnhof liegt,@punctuation @splitist er @splitauch f??r @splitReisende leicht @spliterreichbar.@punctuation`,
  },
  {
    id: "08511ce4-6b86-4676-9c24-2b094dcd6161",
    rank: "basic",
    title: "Schulabschluss",
    text: `Sobald @splitdie Sch??ler @splitin Deutschland @splitihr letztes @splitSchuljahr erreicht @splithaben,@punctuation beginnt @splitf??r sie @spliteine arbeitsreiche @splitZeit:@punctuation Wenn @splitder Jugendliche @spliteine Hauptschule @splitoder eine @splitRealschule besucht,@punctuation @splitmuss er @splitsich entscheiden,@punctuation @splitwelche Ausbildung @spliter nach @splitseinem Abschluss @splitmachen will.@punctuation @splitDie Schule @splithilft bei @splitdieser Entscheidung,@punctuation @splitindem sie @splitden Schuler @splitzu einem @splitPraktikum in @splitFirmen schickt,@punctuation @splitum einen @splitgeeigneten Beruf @splitzu finden.@punctuation @splitBevor das @splitSchuljahr vorbei @splitist,@punctuation mussen @splitsich die @splitSch??ler dann @splitendgultig entscheiden.@punctuation @splitBesucht der @splitSch??ler ein @splitGymnasium,@punctuation so @splitmuss er @splitsich nicht @splitnur zwischen @splitden einzelnen @splitBerufen entscheiden,@punctuation @splitsondern auch @splitherausfinden,@punctuation ob @spliter studieren @splitoder eine @splitAusbildung machen @splitwill.@punctuation`,
  },
  {
    id: "9b7cf6e6-9269-4fa6-ac91-4a9fd8567f7d",
    rank: "basic",
    title: "Fr??hst??ck internationale",
    text: `Das @splitFr??hst??ck ist @spliteine Mahlzeit,@punctuation @splitdie in @splitfast jedem @splitLand der @splitErde anders @splitgegessen wird:@punctuation @splitDie Deutschen @splitlieben die @spliterste Mahlzeit @splitdes Tages @splitdeftig:@punctuation Sie @splitessen gerne @splitBrot mit @splitK??se und @splitWurst,@punctuation freuen @splitsich aber @splitauch,@punctuation wenn @splites Marmelade @splitund andere @splits????e Aufstriche @splitgibt.@punctuation Am @splitWochenende und @splitan Feiertagen @splitgibt es @splitoft statt @splitdes Brots @splitBr??tchen und @splitfranz??sische Croissants @splitzum Fr??hst??ck.@punctuation @splitF??r Menschen,@punctuation @splitdie auf @splitihre Gesundheit @splitachten,@punctuation gibt @splites eine @splitgro??e Vielzahl @splitvon M??slis @splitund Getreideflocken @splitzur Auswahl.@punctuation @splitAls Getr??nke @splitw??hlen die @splitDeutschen zum @splitFr??hst??ck am @splitliebsten Kaffee @splitoder Tee.@punctuation @splitDiejenigen,@punctuation die @spliteher kalte @splitGetr??nke bevorzugen,@punctuation @splitnehmen meist @splitOrangensaft.@punctuation`,
  },
];

export const createQuiz = (text: string) => {
  const splitParagraph = text.replace(/(\r\n|\n|\r)/gm, " ").split(" ");
  const formattedWords = getFormattedObjects(splitParagraph);
  return formattedWords;
};

// const testBasic = returnWordObject(basic2);
// const testBasic3 = returnWordObject(basic3);
