export interface Item {
  id: string;
  priority: 'low' | 'medium' | 'high';
  title: string;
  list: 'todo' | 'progress' | 'done';
}
