import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleWordsModalComponent } from './add-multiple-words-modal.component';

describe('AddMultipleWordsModalComponent', () => {
  let component: AddMultipleWordsModalComponent;
  let fixture: ComponentFixture<AddMultipleWordsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultipleWordsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultipleWordsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
