export interface Member {
  pk?: number;
  firstname: string;
  lastname: string;
  entry_date?: Date;
  exit_date?: Date;
  is_instructor: boolean;
}
