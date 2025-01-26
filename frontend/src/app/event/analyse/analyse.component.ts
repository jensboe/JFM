import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event';
import { Participant } from '../../participant/participant';
import { ParticipantService } from '../../participant/participant.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatList, MatListItem } from '@angular/material/list';
import { ShortComponent } from '../short/short.component';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-event-edit',
  imports: [NgFor, MatListItem, MatList, MatExpansionModule, ShortComponent],
  templateUrl: './analyse.component.html',
  styleUrl: './analyse.component.css',
})
export class AnalyseComponent implements OnInit {
  private eventService = inject(EventService);
  private participantService = inject(ParticipantService);
  private route = inject(ActivatedRoute);
  private router: Router = inject(Router);
  event: Event = {
    title: '',
    start_date: new Date(),
    end_date: new Date(),
    requirement_type: 'MANDATORY',
  };
  participations: Participant[] = [];

  title = $localize`Add event`;

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (id) {
      this.getEvent(id);
      this.title = $localize`Edit event`;
    }
  }

  getEvent(id: number): void {
    this.eventService.getEvent(id).subscribe((event) => {
      this.event = event;
      if (event.pk) {
        this.participantService
          .getParticipantsofEvent(event.pk)
          .subscribe(
            (participations) => (this.participations = participations)
          );
      }
    });
  }
  getAbsent(partipants: Participant[]): Participant[] {
    return partipants.filter((o) => o.participation === 'ABS');
  }

  getExcused(partipants: Participant[]): Participant[] {
    return partipants.filter((o) => o.participation === 'EXC');
  }

  getPresent(partipants: Participant[]): Participant[] {
    return partipants.filter((o) => o.participation === 'PRE');
  }
}
