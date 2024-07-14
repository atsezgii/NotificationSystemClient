export interface Notification {
  id: number;
  userId: number;
  contents: string;
  postedDate: Date;
  readStatus: boolean;
}
