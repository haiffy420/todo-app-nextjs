import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutServerAct } from "@/lib/utils/todoUtilsServer";
import Link from "next/link";
import { MdLogin, MdLogout } from "react-icons/md";

export function ProfileToggle({ children }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-32">
          Hi, {children || "Guest"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {children ? (
          <DropdownMenuItem onClick={() => signOutServerAct()}>
            <div className="flex flex-row gap-4 items-center">
              <MdLogout />
              Logout
            </div>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href="/login">
              <div className="flex flex-row gap-4 items-center">
                <MdLogin />
                Login
              </div>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
