import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event';
import { NgFor } from '@angular/common';
import { DetailsComponent } from '../../participant/details/details.component';
import { ShortComponent } from '../short/short.component';

@Component({
    selector: 'app-participation',
    templateUrl: './participation.component.html',
    styleUrl: './participation.component.css',
    imports: [
        NgFor,
        DetailsComponent,
        ShortComponent
    ]
})
export class ParticipationComponent implements OnInit {
  event: Event = {
    pk: 0,
    start_date: new Date(),
    end_date: new Date(),
    title: 'Loading',
    requirement_type: 'MANDATORY'
  };
  
  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.eventService.getEvent(id).subscribe((event) => (this.event = event));
  }
}
