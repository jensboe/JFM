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
    member: {
      pk: 0,
      firstname: '',
      lastname:''
    },
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
  update() {
    if(this.participant) {
      this.participantService.updateParticipant(this.participant).subscribe()
    }
  }
}
