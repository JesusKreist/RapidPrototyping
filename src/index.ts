// const basic1 = `Der @splitKölner Dom @splitist eines @splitder wichtigsten @splitBauwerke in @splitganz Deutschland.@punctuation @splitViele Menschen @splitreisen taglich @splitaus Deutschland,@punctuation @splitaber auch @splitaus der @splitganzen Welt,@punctuation @splitin die @splitrheinische Metropole,@punctuation @splitum sich @splitdas gigantische @splitGebäude von @splitNahem anzusehen.@punctuation @splitAber nicht @splitnur die @splitHöhe und @splitGroße dieses @splitBauwerkes ist @splitmonumental.@punctuation Auch @splitmit seiner @splitBauzeit übertrifft @splitder Kölner @splitDom die @splitmeisten anderen @splitGebäude dieser @splitWelt:@punctuation Erst 1880 @splitwurde er @splitnach insgesamt 632 @splitJahren endlich @spliteingeweiht.@punctuation Das @splitist unter @splitanderem ein @splitGrund dafür,@punctuation @splitdass der @splitKolner Dom @splitinzwischen zum @splitWeltkulturerbe erklärt @splitwurde.@punctuation Da @splitder Dom @splitdirekt vor @splitdem Kölner @splitHauptbahnhof liegt,@punctuation @splitist er @splitauch für @splitReisende leicht @spliterreichbar.@punctuation`;

const basic2 = `Sobald @splitdie Schüler @splitin Deutschland @splitihr letztes @splitSchuljahr erreicht @splithaben,@punctuation beginnt @splitfür sie @spliteine arbeitsreiche @splitZeit:@punctuation Wenn @splitder Jugendliche @spliteine Hauptschule @splitoder eine @splitRealschule besucht,@punctuation @splitmuss er @splitsich entscheiden,@punctuation @splitwelche Ausbildung @spliter nach @splitseinem Abschluss @splitmachen will.@punctuation @splitDie Schule @splithilft bei @splitdieser Entscheidung,@punctuation @splitindem sie @splitden Schuler @splitzu einem @splitPraktikum in @splitFirmen schickt,@punctuation @splitum einen @splitgeeigneten Beruf @splitzu finden.@punctuation @splitBevor das @splitSchuljahr vorbei @splitist,@punctuation mussen @splitsich die @splitSchüler dann @splitendgultig entscheiden.@punctuation @splitBesucht der @splitSchüler ein @splitGymnasium,@punctuation so @splitmuss er @splitsich nicht @splitnur zwischen @splitden einzelnen @splitBerufen entscheiden,@punctuation @splitsondern auch @splitherausfinden,@punctuation ob @spliter studieren @splitoder eine @splitAusbildung machen @splitwill.@punctuation`;

// const basic3 = `Das @splitFrühstück ist @spliteine Mahlzeit,@punctuation @splitdie in @splitfast jedem @splitLand der @splitErde anders @splitgegessen wird:@punctuation @splitDie Deutschen @splitlieben die @spliterste Mahlzeit @splitdes Tages @splitdeftig:@punctuation Sie @splitessen gerne @splitBrot mit @splitKäse und @splitWurst,@punctuation freuen @splitsich aber @splitauch,@punctuation wenn @splites Marmelade @splitund andere @splitsüße Aufstriche @splitgibt.@punctuation Am @splitWochenende und @splitan Feiertagen @splitgibt es @splitoft statt @splitdes Brots @splitBrötchen und @splitfranzösische Croissants @splitzum Frühstück.@punctuation @splitFür Menschen,@punctuation @splitdie auf @splitihre Gesundheit @splitachten,@punctuation gibt @splites eine @splitgroße Vielzahl @splitvon Müslis @splitund Getreideflocken @splitzur Auswahl.@punctuation @splitAls Getränke @splitwählen die @splitDeutschen zum @splitFrühstück am @splitliebsten Kaffee @splitoder Tee.@punctuation @splitDiejenigen,@punctuation die @spliteher kalte @splitGetränke bevorzugen,@punctuation @splitnehmen meist @splitOrangensaft.@punctuation`;

// console.log(`basic1`, basic1);
// console.log("===============================================");
// console.log(`basic2`, basic2);
// console.log("===============================================");
// console.log(`basic3`, basic3);

export interface IformattedWordObject {
  wordType: "whole" | "split";
  returnedWord: string;
  lineLength: number;
  indexOfWord: number;
  punctuation: string;
  fullWord: string;
  answers: string[];
}
// todo refactor long ass function
// todo do submit
//
export interface handleWordTypesProps {
  word: string;
  formattedWordObj: Partial<IformattedWordObject>;
  fullWord: string;
}

const setWordTypeInObject = (
  word: string,
  formattedWordObj: Partial<IformattedWordObject>
) => {
  if (word.startsWith("@split")) {
    formattedWordObj.wordType = "split";
  } else {
    formattedWordObj.wordType = "whole";
  }
};

const getFullWordWithoutPrefix = (word: string) => {
  if (word.startsWith("@split")) {
    return word.replace("@split", "");
  }
  return word;
};

const getFormattedObject = (splitParagraph: string[]) => {
  const formattedWords = splitParagraph.map((word) => {
    const formattedWordObj = {} as Partial<IformattedWordObject>;
    setWordTypeInObject(word, formattedWordObj);

    let fullWord = getFullWordWithoutPrefix(word);
    let returnedWord: string = "";

    // if (word.startsWith("@split")) {
    //   formattedWordObj.wordType = "split";
    //   fullWord = word.replace("@split", "");
    // } else {
    //   formattedWordObj.wordType = "whole";
    //   fullWord = word;
    // }

    if (fullWord.endsWith("@punctuation")) {
      fullWord = fullWord.replace("@punctuation", "");
      const lastIndex = fullWord.length - 1;
      const wordWithoutPunctuation = fullWord.substring(0, lastIndex);
      formattedWordObj.punctuation = fullWord.charAt(lastIndex);
      fullWord = wordWithoutPunctuation;
    } else {
      formattedWordObj.punctuation = "";
    }

    if (formattedWordObj.wordType === "split") {
      const lengthOfWord = fullWord.length;
      const halfOfWordLength = Math.floor(lengthOfWord / 2);
      const firstPartOfWord = fullWord.slice(0, halfOfWordLength);
      const secondPartOfWord = fullWord.slice(halfOfWordLength);
      // console.log("firstPartOfWord :>> ", firstPartOfWord);
      // console.log("secondPartOfWord :>> ", secondPartOfWord);
      formattedWordObj.returnedWord = firstPartOfWord;
      formattedWordObj.answers = [secondPartOfWord];
      formattedWordObj.lineLength = secondPartOfWord.length + 1;
    } else {
      returnedWord = fullWord;
      formattedWordObj.answers = [""];
      formattedWordObj.lineLength = 0;
      formattedWordObj.returnedWord = returnedWord;
    }

    formattedWordObj.fullWord = fullWord;

    // remember to do type casting
    return formattedWordObj;
  });

  return formattedWords;
};

const returnWordObject = (paragraph: string) => {
  const splitParagraph = paragraph.replace(/(\r\n|\n|\r)/gm, " ").split(" ");
  const formattedWords = getFormattedObject(splitParagraph);
  return formattedWords;
};

const testBasic = returnWordObject(basic2);
// const testBasic3 = returnWordObject(basic3);

console.table(testBasic);
// console.log("=".repeat(100));
// console.table(testBasic3);
