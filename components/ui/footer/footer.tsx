import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="sticky bottom-0 z-50 w-full border-t bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-row items-center justify-between px-2 shadow-xl">
      <div className="w-full flex font-medium flex-row items-center justify-between p-4 gap-2">
        <div className="flex flex-row gap-4">
          <Link href={"https://github.com/haiffy420/"}>
            <FaGithubSquare className="text-4xl" />
          </Link>
          <Link href={"https://linkedin.com/in/haifan"}>
            <FaLinkedin className="text-4xl" />
          </Link>
        </div>
        <p>Next.js Todo App || Made by Haifan with ❤️ and ☕</p>
      </div>
    </div>
  );
};

export default Footer;
