"use client";

import TodoItem from "../todoItem/todoItem";

const TodoList = ({ todos, label, setTodos }) => {
  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      <h1 className="text-xl font-bold">{label}</h1>
      {todos.length === 0 ? (
        <p className="text-sm">No todos to show.</p>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {todos.map((todo) => (
            <TodoItem setTodos={setTodos} key={todo.id} {...todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
