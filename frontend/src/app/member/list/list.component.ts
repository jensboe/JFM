import { Component, OnInit } from '@angular/core';
import { MEMBERS } from '../mock-members';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent implements OnInit {
  members: Member[] = [];

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.memberService.getMembers()
    .subscribe(
      
      members => {
        this.members = members;
      }
    );
  }
}