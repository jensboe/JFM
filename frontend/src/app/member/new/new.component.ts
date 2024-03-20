import { Component, OnInit } from '@angular/core';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { Member } from '../member';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
  providers: [provideNativeDateAdapter()]
})
export class NewComponent implements OnInit{
  member: Member = {
    pk:0,
    firstname:'',
    lastname:'',
  }

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private route: ActivatedRoute,
    private memberService: MemberService,
  ) {
    this.dateAdapter.getFirstDayOfWeek = () => 1;
  }
  ngOnInit(): void {
    this.getMember();
  }
  getMember(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (id)
    {
      this.memberService.getMember(id)
        .subscribe(member => this.member = member);
    }
  }
  save(){
    if(this.member)
    {
      this.memberService.addMember(this.member).subscribe()
    }
  }
  cancel() {
  console.log('cancel')
  }
}
