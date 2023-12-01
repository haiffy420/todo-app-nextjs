import { MdCheckCircle, MdDelete } from "react-icons/md";

const TodoDetailItem = ({
  todoDetail,
  index,
  handleCompleteTodoDetail,
  handleDeleteTodoDetail,
  handleTodoDetailInput,
}) => {
  return (
    <div key={todoDetail.id} className="flex flex-col gap-2 mb-4">
      <div className="flex flex-row gap-4 items-center">
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Task title"
          value={todoDetail.title}
          onChange={(e) => {
            handleTodoDetailInput(e, index, todoDetail);
          }}
        />
        <span
          className={
            todoDetail.completed
              ? "text-2xl text-green-500 cursor-pointer"
              : "text-2xl text-zinc-800 hover:text-green-500 cursor-pointer"
          }
        >
          <MdCheckCircle
            onClick={(e) => {
              e.preventDefault();
              handleCompleteTodoDetail(index, todoDetail);
            }}
            title="Completed?"
          />
        </span>
        <span className="text-2xl text-red-600 cursor-pointer">
          <MdDelete
            onClick={(e) => {
              e.preventDefault();
              handleDeleteTodoDetail(index);
            }}
            title="Delete"
          />
        </span>
      </div>
      {todoDetail.title.length < 2 && (
        <p className="text-sm font-medium text-destructive sm:max-w-[10px]">
          Task title must be at least 2 characters.
        </p>
      )}
    </div>
  );
};

export default TodoDetailItem;
