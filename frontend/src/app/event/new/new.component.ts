import { Component } from '@angular/core';
import  {Event} from '../event'
@Component({
  selector: 'event-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {
  event: Event = {
    pk: 1,
    title: 'Test',
    start_date: new Date(),
    end_date: new Date(Date.now()+2*60*60*1000),
  }
}
