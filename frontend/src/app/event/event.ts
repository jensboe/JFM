import { Participant } from '../participant/participant';

export interface Event {
  pk?: number;
  title: string;
  start_date: Date;
  end_date: Date;
  participants?: number[];
  requirement_type: string;
}
