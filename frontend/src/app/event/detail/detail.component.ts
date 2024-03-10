import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event'
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent{
  event: Event = {
    pk: 1,
    title: 'Test',
    start_date: new Date(),
    end_date: new Date(Date.now()+2*60*60*1000),
    participants: [1, 2, 3]
  }

  constructor(private eventService: EventService) {}
}
