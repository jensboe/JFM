import { Component, inject, Input } from '@angular/core';
import { Event } from '../event';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-event-short',
  imports: [
    MatCardModule,
    NgIf,
    DatePipe,
    MatButtonModule,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './short.component.html',
  styleUrl: './short.component.css',
})
export class ShortComponent {
  @Input() event?: Event;
  @Input() showaction: boolean = false;

  private route = inject(ActivatedRoute);
}
