import { Component, OnInit, inject } from '@angular/core';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { Member } from '../member';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../member.service';
import { MatButton } from '@angular/material/button';
import {
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepicker,
} from '@angular/material/datepicker';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import {
  MatFormField,
  MatLabel,
  MatHint,
  MatSuffix,
} from '@angular/material/form-field';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-member-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers: [provideNativeDateAdapter()],
  standalone: true,
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
  ],
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
      if (this.member.pk)
        {
          this.memberService.updateMember(this.member).subscribe();
        }
        else {
          this.memberService.addMember(this.member).subscribe();
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
