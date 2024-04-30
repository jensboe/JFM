import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { Participant } from '../participant';
import { takeWhile } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';

@Component({
    selector: 'app-participant-update',
    templateUrl: './update.component.html',
    styleUrl: './update.component.css',
    standalone: true,
    imports: [MatButtonToggleGroup, FormsModule, MatButtonToggle]
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() pk: Number = 0;

  alive: boolean = true

  participant: Participant= {
    pk:0,
    event:0,
    member: {
      pk: 0,
      firstname: '',
      lastname:''
    },
    participation:'',
  };

  
  constructor(private participantService: ParticipantService) {}
  
  ngOnInit(): void {
    this.alive = true
      this.participantService.getParticipant(this.pk).
      pipe(takeWhile(() => this.alive))
      .subscribe(participant => this.participant = participant);
  }

  ngOnDestroy(): void {
    this.alive = false
  }

  getParticipant(): void {

  }

  update() {
    if(this.participant) {
      this.participantService.updateParticipant(this.participant).subscribe()
    }
  }
}
