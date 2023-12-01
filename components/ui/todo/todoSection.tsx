import TodoAddForm from "./todoForm/todoAddForm";
import TodoList from "./todoList/todoList";

const TodoSection = ({ activeTodos, completedTodos, setTodos }) => {
  return (
    <>
      <TodoAddForm setTodos={setTodos} />
      <TodoList label="My Todos" setTodos={setTodos} todos={activeTodos} />
      <TodoList label="Completed" setTodos={setTodos} todos={completedTodos} />
    </>
  );
};

export default TodoSection;
