export interface Item {
  id: string;
  priority: Priority;
  title: string;
  list: List;
}
export type List = 'todo' | 'progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';
