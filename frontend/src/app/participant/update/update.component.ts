import { Component, Input, OnInit } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { Participant } from '../participant';

@Component({
  selector: 'app-participant-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  @Input() pk: Number = 0;

  participant: Participant= {
    pk:0,
    event:0,
    member:0,
    participation:'',
  };
  
  constructor(private participantService: ParticipantService) {}
  ngOnInit(): void {
    this.getParticipant();
  }
  getParticipant(): void {
    this.participantService.getParticipant(this.pk)
      .subscribe(participant => this.participant = participant);
  }
}
