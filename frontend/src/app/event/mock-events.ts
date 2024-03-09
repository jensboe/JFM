import { Event } from './event';

export const EVENTS: Event[] = [
    {id: 1, title:'Event 1', start: new Date(2024,1,1,18), end: new Date(2024,1,1,20)},
    {id: 2, title:'Event 2', start: new Date(2024,2,1,18), end: new Date(2024,2,1,20)},
    {id: 3, title:'Event 3', start: new Date(2024,3,1,18), end: new Date(2024,3,1,20)},
    {id: 4, title:'Event 4 (vor 3)', start: new Date(2024,2,5,18), end: new Date(2024,2,5,20)}
]