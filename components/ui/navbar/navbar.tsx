import { ModeToggle } from "@/components/ui/modeToggle";
import TodoSearch from "./todoSearch";

const Navbar = ({ search, setQuery }) => {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-row items-center justify-between p-2 shadow-xl">
      <div className="px-4 min-w-max">
        <span className="font-bold text-2xl">Todo App</span>
      </div>
      <div className="flex flex-row w-auto justify-between gap-2">
        <div>
          <TodoSearch value={search} onChange={setQuery} />
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
