import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from './add/add.component';
import { HeaderComponent } from './header/header.component';
import {AddMultipleWordsModalComponent, NgbdModalContent} from './add-multiple-words-modal/add-multiple-words-modal.component';
import { AddNewWordComponent } from './add-new-word/add-new-word.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ListWordsComponent } from './list-words/list-words.component';
import {WordsService} from './words.service';
import { FilterWordsComponent } from './filter-words/filter-words.component';
import { WordComponent } from './word/word.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    AddMultipleWordsModalComponent,
    NgbdModalContent,
    HeaderComponent,
    AddNewWordComponent,
    ListWordsComponent,
    FilterWordsComponent,
    WordComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [WordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
