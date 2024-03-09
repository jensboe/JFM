import { Component } from '@angular/core';
import {EVENTS} from '../mock-events';


@Component({
  selector: 'event-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  events = EVENTS;
}
