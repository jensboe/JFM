import { Component, Input, inject } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { Participant } from '../participant';
import { MatCard, MatCardActions, MatCardTitle } from '@angular/material/card';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-participant-details',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardActions,
    UpdateComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input() pk: number = 0;
  private participantService = inject(ParticipantService);

  participant: Participant = {
    pk: 0,
    event: 0,
    member: {
      pk: 0,
      firstname: 'S',
      lastname: '',
      is_instructor: false
    },
    participation: '',
  };

  ngOnInit(): void {
    this.participantService
      .getParticipant(this.pk)
      .subscribe(
        (participant) => (this.participant = participant)
      );
  }

}
