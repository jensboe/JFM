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

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
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
  ],
})
export class NewComponent implements OnInit {
  member: Member = {
    pk: 0,
    firstname: '',
    lastname: '',
  };
  private dateAdapter = inject(DateAdapter<Date>);
  private route = inject(ActivatedRoute);
  private memberService = inject(MemberService);
  private router: Router = inject(Router);
  
  ngOnInit(): void {
    this.dateAdapter.getFirstDayOfWeek = () => 1;
    this.getMember();
  }

  getMember(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (id) {
      this.memberService
        .getMember(id)
        .subscribe((member) => (this.member = member));
    }
  }
  
  save() {
    if (this.member) {
      this.memberService.addMember(this.member).subscribe();
    }
  }
  cancel() {
    console.log('cancel');
  }

  backToMemberList() {
    this.router.navigate(['member/list'])
  }
}
