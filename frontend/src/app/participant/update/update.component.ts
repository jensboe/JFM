import { Component, Input, OnDestroy, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { Participant } from '../participant';
import { takeWhile } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {
  MatButtonToggleGroup,
  MatButtonToggle,
} from '@angular/material/button-toggle';


@Component({
    selector: 'app-participant-update',
    templateUrl: './update.component.html',
    styleUrl: './update.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    MatButtonToggleGroup,
    FormsModule,
    MatButtonToggle
]
})
export class UpdateComponent implements OnInit, OnDestroy {

  private participantService = inject(ParticipantService);

  alive: boolean = true;

  @Input() participant?: Participant;

  ngOnInit(): void {
    this.alive = true;
    if(this.participant)
    {
    this.participantService
      .getParticipantWithRefresh(this.participant.pk, 5000)
      .pipe(takeWhile(() => this.alive))
      .subscribe((participant) => {
        this.participant = participant
      });
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  getParticipant(): void {}

  update() {
    if (this.participant) {
      this.participantService.updateParticipant(this.participant).subscribe();
    }
  }
}
