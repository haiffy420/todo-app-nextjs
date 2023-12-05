type Todo = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  todoDetail: TodoDetail[];
  completed: boolean;
};

type TodoDetail = {
  id?: string;
  title: string;
  completed: boolean;
};

export type { Todo, TodoDetail };
