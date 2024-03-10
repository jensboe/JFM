import { Component } from '@angular/core';
import { MEMBERS } from '../mock-members';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  members = MEMBERS;
}
