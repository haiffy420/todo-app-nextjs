import { Input } from "@/components/ui/input";

const SearchGuestMode = (attributes) => {
  const onSearchEventHandler = (event) => {
    attributes.onChange(event.target.value);
  };

  return (
    <Input
      {...attributes}
      placeholder="Search..."
      value={attributes.value}
      spellCheck={false}
      onChange={onSearchEventHandler}
    />
  );
};

export default SearchGuestMode;
