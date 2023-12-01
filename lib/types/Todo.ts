type Todo = {
  id: string;
  title: string;
  description: string;
  todoDetail: TodoDetail[];
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

type TodoDetail = {
  id?: string;
  title: string;
  completed: boolean;
};

export type { Todo, TodoDetail };
