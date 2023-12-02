import TodoAdd from "./todoForm/todoAdd";
import TodoList from "./todoList/todoList";

const TodoSection = ({ activeTodos, completedTodos, setTodos }) => {
  return (
    <>
      <TodoAdd setTodos={setTodos} />
      <TodoList label="My Todos" setTodos={setTodos} todos={activeTodos} />
      <TodoList label="Completed" setTodos={setTodos} todos={completedTodos} />
    </>
  );
};

export default TodoSection;
