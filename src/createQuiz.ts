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
    title: "Kölner Dom",
    text: `Der @splitKölner Dom @splitist eines @splitder wichtigsten @splitBauwerke in @splitganz Deutschland.@punctuation @splitViele Menschen @splitreisen taglich @splitaus Deutschland,@punctuation @splitaber auch @splitaus der @splitganzen Welt,@punctuation @splitin die @splitrheinische Metropole,@punctuation @splitum sich @splitdas gigantische @splitGebäude von @splitNahem anzusehen.@punctuation @splitAber nicht @splitnur die @splitHöhe und @splitGroße dieses @splitBauwerkes ist @splitmonumental.@punctuation Auch @splitmit seiner @splitBauzeit übertrifft @splitder Kölner @splitDom die @splitmeisten anderen @splitGebäude dieser @splitWelt:@punctuation Erst 1880 @splitwurde er @splitnach insgesamt 632 @splitJahren endlich @spliteingeweiht.@punctuation Das @splitist unter @splitanderem ein @splitGrund dafür,@punctuation @splitdass der @splitKölner Dom @splitinzwischen zum @splitWeltkulturerbe erklärt @splitwurde.@punctuation Da @splitder Dom @splitdirekt vor @splitdem Kölner @splitHauptbahnhof liegt,@punctuation @splitist er @splitauch für @splitReisende leicht @spliterreichbar.@punctuation`,
  },
  {
    id: "08511ce4-6b86-4676-9c24-2b094dcd6161",
    rank: "basic",
    title: "Schulabschluss",
    text: `Sobald @splitdie Schüler @splitin Deutschland @splitihr letztes @splitSchuljahr erreicht @splithaben,@punctuation beginnt @splitfür sie @spliteine arbeitsreiche @splitZeit:@punctuation Wenn @splitder Jugendliche @spliteine Hauptschule @splitoder eine @splitRealschule besucht,@punctuation @splitmuss er @splitsich entscheiden,@punctuation @splitwelche Ausbildung @spliter nach @splitseinem Abschluss @splitmachen will.@punctuation @splitDie Schule @splithilft bei @splitdieser Entscheidung,@punctuation @splitindem sie @splitden Schuler @splitzu einem @splitPraktikum in @splitFirmen schickt,@punctuation @splitum einen @splitgeeigneten Beruf @splitzu finden.@punctuation @splitBevor das @splitSchuljahr vorbei @splitist,@punctuation mussen @splitsich die @splitSchüler dann @splitendgultig entscheiden.@punctuation @splitBesucht der @splitSchüler ein @splitGymnasium,@punctuation so @splitmuss er @splitsich nicht @splitnur zwischen @splitden einzelnen @splitBerufen entscheiden,@punctuation @splitsondern auch @splitherausfinden,@punctuation ob @spliter studieren @splitoder eine @splitAusbildung machen @splitwill.@punctuation`,
  },
  {
    id: "9b7cf6e6-9269-4fa6-ac91-4a9fd8567f7d",
    rank: "basic",
    title: "Frühstück internationale",
    text: `Das @splitFrühstück ist @spliteine Mahlzeit,@punctuation @splitdie in @splitfast jedem @splitLand der @splitErde anders @splitgegessen wird:@punctuation @splitDie Deutschen @splitlieben die @spliterste Mahlzeit @splitdes Tages @splitdeftig:@punctuation Sie @splitessen gerne @splitBrot mit @splitKäse und @splitWurst,@punctuation freuen @splitsich aber @splitauch,@punctuation wenn @splites Marmelade @splitund andere @splitsüße Aufstriche @splitgibt.@punctuation Am @splitWochenende und @splitan Feiertagen @splitgibt es @splitoft statt @splitdes Brots @splitBrötchen und @splitfranzösische Croissants @splitzum Frühstück.@punctuation @splitFür Menschen,@punctuation @splitdie auf @splitihre Gesundheit @splitachten,@punctuation gibt @splites eine @splitgroße Vielzahl @splitvon Müslis @splitund Getreideflocken @splitzur Auswahl.@punctuation @splitAls Getränke @splitwählen die @splitDeutschen zum @splitFrühstück am @splitliebsten Kaffee @splitoder Tee.@punctuation @splitDiejenigen,@punctuation die @spliteher kalte @splitGetränke bevorzugen,@punctuation @splitnehmen meist @splitOrangensaft.@punctuation`,
  },
];

export const createQuiz = (text: string) => {
  const splitParagraph = text.replace(/(\r\n|\n|\r)/gm, " ").split(" ");
  const formattedWords = getFormattedObjects(splitParagraph);
  return formattedWords;
};

// const testBasic = returnWordObject(basic2);
// const testBasic3 = returnWordObject(basic3);
