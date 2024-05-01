import { Member } from '../member/member';

export interface Participant {
  pk: number;
  member: Member;
  event: number;
  participation: string;
}
