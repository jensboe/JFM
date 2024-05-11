import { Component, Input, inject } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { Participant } from '../participant';
import { MatCard, MatCardActions, MatCardTitle } from '@angular/material/card';
import { UpdateComponent } from '../update/update.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-participant-details',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardActions,
    UpdateComponent,
    NgIf
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input() pk: number = 0;
  private participantService = inject(ParticipantService);

  participant?: Participant;

  ngOnInit(): void {
    this.participantService
      .getParticipant(this.pk)
      .subscribe(
        (participant) => (this.participant = participant)
      );
  }

}
