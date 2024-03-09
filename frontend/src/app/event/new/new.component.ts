import { Component } from '@angular/core';
import  {Event} from '../event'
@Component({
  selector: 'event-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {
  event: Event = {
    id: 1,
    title: 'Test',
    start: new Date(),
    end: new Date(Date.now()+2*60*60*1000),
  }
}
