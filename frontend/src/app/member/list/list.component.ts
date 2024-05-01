import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { NgFor } from '@angular/common';
import { MatActionList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  standalone: true,
  imports: [MatActionList, NgFor, MatListItem],
})
export class ListComponent implements OnInit {
  members: Member[] = [];
  private memberService = inject(MemberService);


  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.memberService.getMembers().subscribe((members) => {
      this.members = members;
    });
  }
}
