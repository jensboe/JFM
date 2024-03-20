import { Component, OnInit } from '@angular/core';
import  {Event} from '../event'
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Time } from '@angular/common';


@Component({
  selector: 'event-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
  providers: [
    provideNativeDateAdapter()
  ]
})
export class NewComponent {
  event: Event = {
    pk: 1,
    title: '',
    start_date: new Date(),
    end_date: new Date(),
  };
  starttime: string = "18:00";
  endtime: string = "20:00";

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
  ) {
  }
  ngOnInit(): void {
    this.getEvent();
  }
  getEvent(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (id)
    {
      this.eventService.getEvent(id)
        .subscribe( event =>
          this.event = event
        );
    }
  }
  save(){
    if(this.event)
    {
      let splitstarttime = this.starttime.split(':');
      this.event.start_date.setHours(Number(splitstarttime[0]),Number(splitstarttime[1]),0,0);
      let splitendtime = this.endtime.split(':');
      this.event.end_date.setHours(Number(splitendtime[0]),Number(splitendtime[1]),0,0);
      console.log(this.event);
      //this.eventService.addEvent(this.event).subscribe()
    }
  }
  cancel() {
    console.log('cancel')
  }
}
