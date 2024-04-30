import { Member } from '../member/member';

export interface Participant {
  pk: Number;
  member: Member;
  event: Number;
  participation: String;
}
