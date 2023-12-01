import { fetchTodos } from "@/lib/utils/actions";

const LoginPage = async () => {
  const todos = await fetchTodos();
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h1>Title: {todo.title}</h1>
          <h1>{todo.description}</h1>
          <h1>{todo.completed ? "Completed" : "Not Completed"}</h1>
          <h1>{todo.user ? typeof todo.id : ""}</h1>
        </div>
      ))}
    </div>
  );
};

export default LoginPage;
