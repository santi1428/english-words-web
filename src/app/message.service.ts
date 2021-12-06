import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();

  constructor() { }

  sendMessage(isModalClosed): void {
    this.subject.next({isModalClosed});
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
