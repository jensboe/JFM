import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { Participant } from '../participant';
import { MatCard, MatCardActions, MatCardTitle } from '@angular/material/card';
import { UpdateComponent } from '../update/update.component';


@Component({
    selector: 'app-participant-details',
    imports: [
    MatCard,
    MatCardTitle,
    MatCardActions,
    UpdateComponent
],
    templateUrl: './details.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
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
