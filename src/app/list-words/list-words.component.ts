import { Component, OnInit } from '@angular/core';
import {WordsService} from '../words.service';


@Component({
  selector: 'app-list-words',
  templateUrl: './list-words.component.html',
  styleUrls: ['./list-words.component.css'],
})
export class ListWordsComponent implements OnInit {
  words = [];
  wordsCount = 0;

  deletedWordIndex = -1;

  constructor(private wordsService: WordsService) {
    this.words = wordsService.getWords();
    this.wordsService.getWordsCount().subscribe(wordsCount => {
      this.wordsCount = wordsCount;
    });
  }

  ngOnInit(): void {
  }

}
