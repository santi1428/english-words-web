import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import {WordsService} from '../words.service';
import {MessageService} from '../message.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-body bg-dark text-light">
      <div class="row mb-2">
        <div class="col-auto text-center offset-3">
          <h4>Add multiple words</h4>
        </div>
        <div class="col">
          <button type="button" class="close w-auto" aria-label="Close" (click)="closeModal()">
            <span aria-hidden="true" class="text-light">&times;</span>
          </button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col">
          <textarea class="form-control" id="add-multiple-words" placeholder='Paste here all the new words separated by ","' ngbAutofocus [formControl]="wordsControl"></textarea>
          <button class="btn btn-block btn-light mt-3 mb-2" (click)="addWords()" title="Add Words">Add words</button>
        </div>
      </div>
    </div>
  `,
  styles: ['textarea {width: 100%; height: 30vh; }', 'textarea:focus {  border-color: #343A40;\n' +
  '  outline:none !important;\n' +
  '  outline-width: 0 !important;\n' +
  '  box-shadow: none;\n' +
  '  -moz-box-shadow: none;\n' +
  '  -webkit-box-shadow: none;}']
})
// tslint:disable-next-line:component-class-suffix
export class NgbdModalContent {
  @Input() name;
  wordsControl = new FormControl('');

  constructor(public activeModal: NgbActiveModal, private wordsService: WordsService, private messageService: MessageService) {}

  closeModal(): void {
    this.messageService.sendMessage(true);
    this.activeModal.dismiss('Cross click');
  }

  getWordsFromText(): Array<string> {
    return this.wordsControl.value.split(', ');
  }

  addWords(): void {
    const wordsFromText = this.getWordsFromText();
    if (wordsFromText.length > 1){
      this.getWordsFromText().forEach(word => {
        this.wordsService.addWord(word);
      });
    }
    this.wordsControl.setValue('');
    this.closeModal();
  }
}

@Component({
  selector: 'app-add-multiple-words-modal',
  templateUrl: './add-multiple-words-modal.component.html',
  styleUrls: ['./add-multiple-words-modal.component.css']
})
export class AddMultipleWordsModalComponent implements OnInit {


  ngOnInit(): void {
  }

  constructor(private modalService: NgbModal, private messageService: MessageService) {}

  open(): void {
    this.messageService.sendMessage(false);
    const modalRef = this.modalService.open(NgbdModalContent);
  }

}
