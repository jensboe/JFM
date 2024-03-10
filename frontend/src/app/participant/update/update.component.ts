import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-participant-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  @Input() pk: Number = 0;
}
