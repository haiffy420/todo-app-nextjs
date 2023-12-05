import { usePathname } from "next/navigation";

export const useGuestUser = () => {
  const pathname = usePathname();
  return pathname !== "/todo";
};
