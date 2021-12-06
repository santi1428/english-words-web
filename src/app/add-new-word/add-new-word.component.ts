import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {WordsService} from '../words.service';
import {MessageService} from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new-word',
  templateUrl: './add-new-word.component.html',
  styleUrls: ['./add-new-word.component.css']
})
export class AddNewWordComponent implements OnInit {
  @ViewChild('newWordField') newWordField;
  wordControl = new FormControl('');
  subscription: Subscription;

  constructor(private wordsService: WordsService, private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(isModalClosed => {
      if (isModalClosed) {
        this.newWordField.nativeElement.focus();
      }
    });
  }

  ngOnInit(): void {
  }

  addWord(): void {
    if (this.wordControl.value.trim() !== ''){
      this.wordsService.addWord(this.wordControl.value);
    }
    this.wordControl.setValue('');
    this.newWordField.nativeElement.focus();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
