import { Input } from "@/components/ui/input";

const TodoSearch = (attributes) => {
  const onSearchEventHandler = (event) => {
    attributes.onChange(event.target.value);
  };

  return (
    <Input
      {...attributes}
      className=""
      placeholder="Search..."
      value={attributes.value}
      spellCheck={false}
      onChange={onSearchEventHandler}
    />
  );
};

export default TodoSearch;
