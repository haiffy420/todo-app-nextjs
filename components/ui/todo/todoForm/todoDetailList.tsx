import TodoDetailItem from "./todoDetailItem";

const TodoDetailList = ({
  tempTodoDetails,
  handleCompleteTodoDetail,
  handleDeleteTodoDetail,
  handleTodoDetailInput,
}) => {
  return (
    <div>
      {tempTodoDetails.map((todoDetail, index) => (
        <TodoDetailItem
          key={todoDetail.id}
          todoDetail={todoDetail}
          index={index}
          handleCompleteTodoDetail={handleCompleteTodoDetail}
          handleDeleteTodoDetail={handleDeleteTodoDetail}
          handleTodoDetailInput={handleTodoDetailInput}
        />
      ))}
    </div>
  );
};

export default TodoDetailList;
