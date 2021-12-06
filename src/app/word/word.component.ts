import { Component, OnInit, Input } from '@angular/core';
import {WordsService} from '../words.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  @Input() word;
  @Input() index: number;
  deletedWord = false;

  constructor(private wordsService: WordsService) { }

  deleteWord(): void {
    this.deletedWord = true;
    setTimeout(() => {
      this.wordsService.deleteWord(Number(this.index));
    }, 600);
  }



  ngOnInit(): void {
  }

}
