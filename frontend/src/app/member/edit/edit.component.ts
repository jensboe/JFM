import { NgIf, formatDate } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  MatFormField,
  MatHint,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
    selector: 'app-member-edit',
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.css',
    providers: [provideNativeDateAdapter()],
    imports: [
        MatFormField,
        MatLabel,
        MatInput,
        FormsModule,
        MatSlideToggle,
        MatDatepickerInput,
        MatHint,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatButton,
        NgIf
    ]
})
export class NewComponent implements OnInit {
  member: Member = {
    pk: 0,
    firstname: '',
    lastname: '',
    is_instructor: false
  };
  title = $localize`Add member`

  private dateAdapter = inject(DateAdapter<Date>);
  private route = inject(ActivatedRoute);
  private memberService = inject(MemberService);
  private router: Router = inject(Router);
  
  ngOnInit(): void {
    this.dateAdapter.getFirstDayOfWeek = () => 1;
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (id) {
      this.getMember(id);
      this.title = $localize`Edit member`
    }
  }

  getMember(id:number): void {
      this.memberService
        .getMember(id)
        .subscribe((member) => {
          this.member = member
        });
  }
  
  save() {
    if (this.member) {
      let data = JSON.parse(JSON.stringify(this.member))
      if (this.member.entry_date)
      {
        data.entry_date = formatDate(this.member.entry_date, 'yyyy-MM-dd','en')
      }
      if (this.member.exit_date)
      {
        data.exit_date = formatDate(this.member.exit_date, 'yyyy-MM-dd','en')
      }
      if (this.member.pk)
      {
        this.memberService.updateMember(data).subscribe();
      }
      else {
        this.memberService.addMember(data).subscribe();
      }
    }
  }
  cancel() {
    console.log('cancel');
  }

  backToMemberList() {
    this.router.navigate(['member/list'])
  }
}
