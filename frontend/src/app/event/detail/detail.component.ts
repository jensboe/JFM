import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{
  event: Event  = {pk:0,start_date: new Date(), end_date: new Date(), title: 'Loading'};

  constructor(private route: ActivatedRoute, private eventService: EventService) {}
  
  ngOnInit(): void {
    this.getEvent();
  }

  getEvent(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.eventService.getEvent(id)
      .subscribe(event => this.event = event);
  }
}
