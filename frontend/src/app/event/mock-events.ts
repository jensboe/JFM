import { Event } from './event';

export const EVENTS: Event[] = [
  {
    pk: 1,
    title: 'Event 1',
    start_date: new Date(2024, 1, 1, 18),
    end_date: new Date(2024, 1, 1, 20),
    participants: [],
  },
  {
    pk: 2,
    title: 'Event 2',
    start_date: new Date(2024, 2, 1, 18),
    end_date: new Date(2024, 2, 1, 20),
    participants: [],
  },
  {
    pk: 3,
    title: 'Event 3',
    start_date: new Date(2024, 3, 1, 18),
    end_date: new Date(2024, 3, 1, 20),
    participants: [],
  },
  {
    pk: 4,
    title: 'Event 4 (vor 3)',
    start_date: new Date(2024, 2, 5, 18),
    end_date: new Date(2024, 2, 5, 20),
    participants: [],
  },
];
