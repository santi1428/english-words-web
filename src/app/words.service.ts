import {BehaviorSubject, Observable } from 'rxjs';

export class WordsService {
  words: Array<Word> = [];
  private wordsCount = new BehaviorSubject<number>(0);


  constructor() {
    this.words = JSON.parse(localStorage.getItem('words')) || [];
    this.wordsCount.next(JSON.parse(localStorage.getItem('wordsCount')) || 0);
  }

  addWord(word: string): void {
    const wordToAdd = word.trim().toLowerCase();
    const extractedWord = this.getExtractedWord(wordToAdd);
    if (!this.doesWordAlreadyExist(wordToAdd)){
      this.words.push({
        word: wordToAdd,
        cambridgeDefinitionLink: `https://dictionary.cambridge.org/es/diccionario/ingles/${extractedWord.replace('to', '').trim()}`,
        oxfordDefinitionLink: `https://www.oxfordlearnersdictionaries.com/definition/english/${extractedWord.replace('to', '').trim()}?q=${extractedWord.replace('to', '').trim()}`,
        forvoPronunciationLink: `https://forvo.com/word/${extractedWord.replace('to', '').trim()}/#en`,
        type: this.getTypeOfWord(wordToAdd)
      });
      this.updateWordsCount('add');
      this.updateLocalStorage();
    }
  }

  doesWordAlreadyExist(wordToSearch: string): boolean {
    let c = 0;
    this.words.forEach(word => {
      if (wordToSearch === word.word){
        c++;
      }
    });
    return c > 0;
  }

  updateWordsCount(operation: string): void {
    if (operation === 'add') {
      this.wordsCount.next(this.wordsCount.getValue() + 1);
    }

    if (operation === 'rest') {
      this.wordsCount.next(this.wordsCount.getValue() - 1);
    }
  }

  updateLocalStorage(): void{
    localStorage.setItem('words', JSON.stringify(this.words));
    localStorage.setItem('wordsCount', JSON.stringify(this.wordsCount.getValue()));
  }

  getWords(): Array<Word> {
    return this.words;
  }

  getWordsCount(): Observable<number> {
    return this.wordsCount.asObservable();
  }

  deleteWord(index: number): void {
    this.words.splice(index, 1);
    this.updateWordsCount('rest');
    this.updateLocalStorage();
  }

  getTypeOfWord(word: string): string{
    if (word.includes('to ')){
      return 'verb';
    }

    if (word.includes('noun.') || word.includes('noun ')){
      return 'noun';
    }

    if (word.includes('adj.')  || word.includes('adj ')){
      return 'adjective';
    }

    if (word.includes('adv.')  || word.includes('adv ')){
      return 'adverb';
    }

    return '';
  }

  getExtractedWord(word: string): string {
    if (word.includes('noun.') || word.includes('noun ')){
      return word.replace('noun', '').replace('.', '').trim();
    }

    if (word.includes('adj.')  || word.includes('adj ')){
      return word.replace('adj', '').replace('.', '').trim();
    }

    if (word.includes('adv.')  || word.includes('adv ')){
      return word.replace('adv', '').replace('.', '').trim();
    }

    return word.trim();

  }

}

class Word {
  word: string;
  cambridgeDefinitionLink: string;
  oxfordDefinitionLink: string;
  forvoPronunciationLink: string;
  type: string;
}
