"use client";
import { ModeToggle } from "@/components/ui/mode-toggle";
import SearchGuestMode from "./searchGuestMode";
import Search from "./search";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { GiHamburgerMenu } from "react-icons/gi";
import { ProfileToggle } from "../profile-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdLogout } from "react-icons/md";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { signOutServerAct } from "@/lib/utils/todoUtilsServer";

const Navbar = ({ user, search, setQuery, guestMode }) => {
  const { setTheme } = useTheme();

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const name = user?.name.split(" ")[0] || null;
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)"); // Adjust the screen width as needed
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <>
      <div className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-row items-center justify-between p-2 shadow-xl dark:shadow-none">
        <div className="px-4 min-w-max">
          <span className="font-bold text-xl sm:text-2xl">Todo App</span>
        </div>
        <div className="flex flex-row w-auto justify-between gap-2 mr-2">
          <div>
            {guestMode ? (
              <SearchGuestMode value={search} onChange={setQuery} />
            ) : (
              <Search placeholder="Search..." />
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            {isSmallScreen ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <GiHamburgerMenu />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Hi, {name}!</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col w-full items-center justify-center gap-4 mt-6">
                    <div className="flex flex-row gap-6">
                      <Button
                        onClick={() => setTheme("light")}
                        variant="outline"
                        size="icon"
                      >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90" />
                      </Button>
                      <Button
                        onClick={() => setTheme("dark")}
                        variant="outline"
                        size="icon"
                      >
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0 dark:scale-100" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => signOutServerAct()}
                    >
                      <span className="flex flex-row items-center justify-center gap-2">
                        <MdLogout />
                        Logout
                      </span>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <>
                <ModeToggle />
                <ProfileToggle>{name}</ProfileToggle>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
